

module.exports = class{
        constructor(){

        }
        static run(id){
            var creep_body = [MOVE];
            if(!this.checkForDelete(id)){ // RUN ONLY IF APPLICABLE
            // BUILD CREEPS UNTIL SQUAD SIZE REACHED

            if(Object.keys(Memory.operations[id].members).length < Memory.operations[id].size && !Memory.operations[id].members.assembled){
                //console.log('Spawning');
                //console.log(Game.spawns['Spawn1'].canCreateCreep(creep_body, undefined, {role: 'attacker', operation: id, target: Memory.operations[id].flagName}) == OK);
                if(Game.spawns['Spawn1'].canCreateCreep(creep_body, undefined, {role: 'attacker', operation: id, target: Memory.operations[id].flagName}) == OK){
                    var name=Game.spawns['Spawn1'].createCreep(creep_body,undefined,{role: 'attacker', operation_id: id, target: Memory.operations[id].flagName});
                    Memory.operations[id].members[name]= 'attacker';
                    console.log('Did spawn creep '+name);
                }

            }else if(Object.keys(Memory.operations[id].members).length == Memory.operations[id].size && !Memory.operations[id].assembled){
                Memory.operations[id].assembled = true;
                console.log('Squad assembled');
            }
            // RUN CREEP JOBS
            for(var cr in Memory.operations[id].members){
                console.log('LOOKATME');
                console.log(cr);

                if(!Game.creeps[cr].spawning && Game.creeps[cr]){
                    if(Memory.operations[id].assembled==false){
                        console.log('Running Idle for '+cr);
                        this.creepIdle(Game.creeps[cr]);
                    }else if(Memory.operations[id].assembled==true && Memory.operations[id].reached==false){
                        console.log('Running Travel for '+cr);
                        this.creepTravel(Game.creeps[cr],Game.flags[Memory.operations[id].flagName]);

                    }else if(Memory.operations[id].assembled==true && Memory.operations[id].reached==true){
                        console.log('Running Attack for '+cr);
                        this.creepAttack(Game.creeps[cr]);
                    }
                }
            }




            }
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
                Memory.operations[this.id].type='attack';
                Memory.operations[this.id].size=2;
                Memory.operations[this.id].assembled=false;
                Memory.operations[this.id].reached=false;
                Memory.operations[this.id].members= {};
                Memory.operations[this.id].rallyPoint=Game.flags[flag].pos.findClosestByPath(FIND_MY_STRUCTURES,{filter: (str) => str.structureType == STRUCTURE_TOWER}).id;


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

        static creepIdle(creep){
            var target = Game.getObjectById(Memory.operations[creep.memory.operation_id].rallyPoint);
            creep.moveTo(target);

        }

        static creepTravel(creep,flag){
            creep.moveTo(flag);

        }

        static creepAttack(creep){


        }

        static refreshTimer(creep){

        }
        static runCreep(creep){


        if(!creep.spawning){
        //console.log('TEST1');
        if(creep.memory.reached){
            var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS,{filter: (creep) => (_.filter(creep.body,(body) => body.type == 'attack')).length =! 0});
            var closestStr =creep.pos.findClosestByRange(FIND_STRUCTURES,{filter: (str) => str.structureType != STRUCTURE_CONTROLLER && str.structureType != STRUCTURE_WALL && str.structureType != STRUCTURE_CONTAINER});
            var spawn = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES,{filter: (str) => str.structureType == STRUCTURE_TOWER});
            //console.log(closestHostile);
            if(closestHostile){
                //console.log(creep.name);
                //console.log('TEST2');
                if(creep.attack(closestHostile) == ERR_NOT_IN_RANGE){
                    creep.moveTo(closestHostile);
                    creep.heal(creep);
                    creep.say('attacking');
                }
            }else if (creep.hits < creep.hitsMax){
                creep.heal(creep);

            }else if(closestStr){

                if(creep.attack(closestStr) == ERR_NOT_IN_RANGE){
                    creep.moveTo(closestStr);
                    creep.heal(creep);
                    creep.say('attacking');
                }
            }else{
                //console.log('TEST3');
                creep.memory.reached=false;
                delete creep.memory.target;

            }

        }else if(!creep.memory.reached && !creep.memory.target){


            creep.memory.target=creep.memory.squad;
            //console.log('TEST4');
        }else{
            //console.log('TEST5');

            if(Memory.squads[creep.memory.squad].assembled){
                var target=Game.flags[creep.memory.target];
                //console.log(target);
                creep.moveTo(target,{costCallback: function(roomName, costMatrix) {
	                if(roomName == 'E79N43') {
                        for(var i=0;i<255;i++){
                            for(var j=0;j<255;j++){
                                costMatrix.set(i,j,255);
                            }
                        }
		            }
	            }

                });
                //creep.moveTo(target,{ignoreDestructibleStructures: true});
                creep.heal(creep);
                //if(creep.room.name = target.room.name){}
                if(creep.pos.inRangeTo(target,2)){
                    creep.memory.reached=true;
                }

            }else{
                creep.say('waiting for assembling')
                if(!Memory.squads[creep.memory.squad].members[creep.id]){
                    Memory.squads[creep.memory.squad].members[creep.id]=creep.id;
                    console.log('added');
                }

        }

        }

        }




        }





};