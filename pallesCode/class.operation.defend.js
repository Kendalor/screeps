var WHITELIST = {'Cade' : true,'Kendalor' : true,'Palle' : true};

module.exports = class{

        constructor(){

        }
        static run(id){
            if(!this.checkForDelete(id)){ // RUN ONLY IF APPLICABLE
            // BUILD CREEPS UNTIL SQUAD SIZE REACHED
            switch (Memory.operations[id].status){
                case 'assembling':
                    this.assembling(id);
                    break;
                case 'traveling':
                    break;
                case 'combat':
                    break;
                default:
                    break;
            }





            }
        }
        static assembling(id){
            this.buildCreeps(id);
            this.checkForCreeps(id);
            if(this.checkAssembled_ByRallyPoint(id)){
                Memory.operations[id].status='traveling';
            }
            for(var sLeader in Memory.operations[id].squads){
                for(var cr in Memory.operations[id].squads[sLeader]){

                    if(!Game.creeps[cr].spawning){
                        Game.creeps[cr].moveTo(Game.creeps[sLeader]);
                        Game.creeps[cr].heal(sLeader);
                    }
                }
                if(!Game.creeps[sLeader].spawning){

                        Game.creeps[sLeader].moveTo(Game.getObjectById(Memory.operations[id].rallyPoint));
                }
            }
        }

        static traveling(id){
            var wait=false;
            var err;
            for(var sLeader in Memory.operations[id].squads){
                for(var cr in Memory.operations[id].squads[sLeader]){
                    Game.creeps[cr].moveTo(sLeader);
                    err=Game.creeps[cr].heal(sLeader);
                    if(err == ERR_NOT_IN_RANGE){
                        wait=true;
                    }
                }
                if(!wait && (Game.creeps[sLeader].pos.x > 47 || Game.creeps[sLeader].pos.x < 2 || Game.creeps[sLeader].pos.y > 47 || Game.creeps[sLeader].pos.y < 2)){
                    Game.creeps[sLeader].moveTo(Game.flags[Memory.operations[id].flagName]);
                }
                if(Game.creeps[sLeader].pos.roomName == Memory.operations[id].roomName){
                    Memory.operations[id].status='attack';
                }
            }
        }
        static checkForCreeps(id){
            for(var sLeader in Memory.operations[id].squads){
                for(var cr in Memory.operations[id].squads[sLeader]){
                    if(!Game.creeps[cr]) {
                        console.log('Deleted '+cr +'from memory')
                        delete Memory.creeps[cr];
                        Memory.operations[id].squads[sLeader].pop(cr);
                    }

                }
                if(!Game.creeps[sLeader]) {
                        console.log('Deleted '+cr +'from memory')
                        delete Memory.creeps[sLeader];
                        Memory.operations[id].squads[sLeader].pop(cr);
                        for(var cr in Memory.operations[id].squads[sLeader]){
                                console.log('Deleted '+cr +'from memory')
                                Game.creeps[cr].suicide();
                                delete Memory.creeps[cr];
                        }
                }
            }
        }


        static buildCreeps(id){
            if(Object.keys(Memory.operations[id].squads).length < Memory.operations[id].size){
                var creep_body=Memory.operations[id].default_Abody;
                //console.log('Spawning');
                //console.log(Game.spawns['Spawn1'].canCreateCreep(creep_body, undefined, {role: 'attacker', operation: id, target: Memory.operations[id].flagName}) == OK);
                if(Game.getObjectById(Memory.operations[id].nearest_spawnId).canCreateCreep(creep_body, undefined, {role: 'attacker', operation: id, target: Memory.operations[id].flagName}) == OK){
                    var name=Game.getObjectById(Memory.operations[id].nearest_spawnId).createCreep(creep_body,undefined,{role: 'attacker', operation_id: id, target: Memory.operations[id].flagName});
                    Memory.operations[id].squads[name]= [];
                    console.log('Did spawn creep '+name);
                }

            }else{
                var creep_body=Memory.operations[id].default_Hbody;
                for(var sLeader in Memory.operations[id].squads){
                    if(Object.keys(Memory.operations[id].squads[sLeader]).length < Memory.operations[id].healers){
                        if(Game.getObjectById(Memory.operations[id].nearest_spawnId).canCreateCreep(creep_body, undefined, {role: 'healer', operation: id, Leader: sLeader, target: Memory.operations[id].flagName}) == OK){
                            var name=Game.getObjectById(Memory.operations[id].nearest_spawnId).createCreep(creep_body,undefined,{role: 'healer', operation_id: id, Leader: sLeader, target: Memory.operations[id].flagName});
                            console.log('Did spawn creep '+name);
                            var list=Memory.operations[id].squads[sLeader];
                            console.log(list);
                            list.push(name);
                            console.log(list);
                            console.log(Memory.operations[id].squads[sLeader].push(name));

                        }
                    }
                }
            }
            // CHECK IF REACHED OR FLAG POSITION CHANGED
        }

        static checkAssembled(id){
            var out=true;
            if(Object.keys(Memory.operations[id].squads).length == Memory.operations[id].size){
                    for(var sLeader in Memory.operations[id].squads){
                        if(Memory.operations[id].squads[sLeader].length != Memory.operations[id].healers){
                            out=false;
                        }else{
                            for(var cr in Memory.operations[id].squads[sLeader]){
                                if(Game.creeps[cr].spawning){
                                    out = false;
                                }
                            }
                        }
                    }

            }else{
                out = false;
            }
            return out;

        }

        static checkAssembled_ByRallyPoint(id){
            var out=true;
            if(Object.keys(Memory.operations[id].squads).length == Memory.operations[id].size){
                for(var sLeader in Memory.operations[id].squads){
                    if(Memory.operations[id].squads[sLeader].length == Memory.operations[id].healers){
                        for(var cr in Memory.operations[id].squads[sLeader]){
                            if(!Game.creeps[cr].pos.inRangeTo(Game.getObjectById(Memory.operations[id].rallyPoint),3)){
                                out=false;
                            }
                        }
                    }else{
                        out=false;
                    }
                }
                if(!Game.creeps[sLeader].pos.inRangeTo(Game.getObjectById(Memory.operations[id].rallyPoint),3)){
                        out=false;
                }
            }else{
                out = false;
            }
            return out;
        }

        static findClosestSpawn(flagName){
            var min_length;
            var best_spawn;
            var length;
            for(var i in Game.spawns){
                console.log('length from '+Game.spawns[i].pos.roomName+' to '+Game.flags[flagName].pos.roomName);
                console.log( Object.keys(Game.map.findRoute(Game.spawns[i].pos.roomName,Game.flags[flagName].pos.roomName)).length < min_length  || min_length == undefined);
                length= Object.keys(Game.map.findRoute(Game.spawns[i].pos.roomName,Game.flags[flagName].pos.roomName)).length;
                if(length < min_length  || min_length == undefined){
                    min_length=length;
                    best_spawn=Game.spawns[i].id;
                }
            }
            return best_spawn;
        }



        static init(roomName,flag){
            if(!Game.flags[flag].memory.operation_id){
                if(!Memory.operations){
                        Memory.operations={};
                }
                this.id=parseInt(Math.random()*10000000);
                console.log(this.isIdFree(this.id));
                while(!this.isIdFree(this.id)){
                    this.id=parseInt(Math.random()*10000000);
                }

                this.roomName=roomName;
                console.log(flag);
                console.log(this.id);
                console.log(this.roomName);
                this.flagName=flag;

                Game.flags[flag].memory.operation_id=this.id;

                if(!Memory.operations[this.id]){
                    Memory.operations[this.id]={}
                }
                //DEFINE ALL OP VARIABLES HERE
                Memory.operations[this.id].roomName=roomName;
                Memory.operations[this.id].flagName=flag;
                Memory.operations[this.id].permanent=false;
                Memory.operations[this.id].type='defend';
                Memory.operations[this.id].size=1;
                Memory.operations[this.id].healers=3;
                //COST 1800
                //Memory.operations[this.id].default_Abody=[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK];// COST
                Memory.operations[this.id].default_Abody=[MOVE,ATTACK]; //TEST
                // COST 1800
                //Memory.operations[this.id].default_Hbody=[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL];
                Memory.operations[this.id].default_Hbody=[MOVE,HEAL]; //TEST
                Memory.operations[this.id].nearest_spawnId=this.findClosestSpawn(flag);
                Memory.operations[this.id].status='assembling';
                Memory.operations[this.id].squads= {};
                Memory.operations[this.id].rallyPoint=Game.getObjectById(Memory.operations[this.id].nearest_spawnId).pos.findClosestByPath(FIND_MY_STRUCTURES,{filter: (str) => str.structureType == STRUCTURE_TOWER}).id;


                //console.log(JSON.stringify(Memory.operations[this.id]));
            }


        }
        // CHECK IF ID IS AVAILABLE
        static isIdFree(id){
            var out=true;
            for(var i in Memory.operations){
                if(Memory.operations[id]){
                    out= false;
                }

            }
            return out;
        }
        // CHECK IF FLAG IS STILL EXISITING, IF NOT => DELETE OPERATION IF NOT PERMANENT
        static checkForDelete(id){
            var flagname =  Memory.operations[id].flagName;
            if(!Game.flags[flagname] && !Memory.operations[id].permanent){
                delete Memory.flags[flagname];
                delete Memory.operations[id];

                return true;
            }else {
                return false;
            }

        }

        static refreshTimer(creep){
            var target = Game.spawns['Spawn1'];
            if(target.renewCreep(creep) == ERR_NOT_IN_RANGE){
                creep.moveTo(target)
            }else if(target.renewCreep(creep) == ERR_FULL){
                this.creep.Idle(creep);
            }
        }






};