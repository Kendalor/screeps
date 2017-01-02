var WHITELIST = {'Cade' : true,'Kendalor' : true,'Palle' : true};

module.exports = class{
        
        constructor(){

        }
        static run(id){
            //Memory.operations[id].size=4;
			// 1800 Energy : 6xMOVE(=300) + 6xRANGED_ATTACK(=900) + 2xMOVE(=100) + 2xHEAL(=500)
            var creep_body = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,HEAL,MOVE,HEAL];
            if(!this.checkForDelete(id)){ // RUN ONLY IF APPLICABLE
            // BUILD CREEPS UNTIL SQUAD SIZE REACHED

            if(Object.keys(Memory.operations[id].members).length < Memory.operations[id].size && !Memory.operations[id].members.assembled){
                //console.log('Spawning');
                //console.log(Game.spawns['Spawn1'].canCreateCreep(creep_body, undefined, {role: 'penetrator', operation: id, target: Memory.operations[id].flagName}) == OK);
                if(Game.getObjectById(Memory.operations[id].nearest_spawnId).canCreateCreep(creep_body, undefined, {role: 'penetrator', operation: id, target: Memory.operations[id].flagName}) == OK){
                    var name=Game.getObjectById(Memory.operations[id].nearest_spawnId).createCreep(creep_body,undefined,{role: 'penetrator', operation_id: id, target: Memory.operations[id].flagName});
                    Memory.operations[id].members[name]= 'penetrator';
                    console.log('Did spawn creep '+name);
                }

            }else if(Object.keys(Memory.operations[id].members).length == Memory.operations[id].size && !Memory.operations[id].assembled){
                Memory.operations[id].assembled = true;
                console.log('Squad assembled');
            }
            // CHECK IF REACHED OR FLAG POSITION CHANGED
            var reached=0;
            for(var cr in Memory.operations[id].members){
                // DELETE NONEXISTING CREEPS FROM OPERATION
                if(!Game.creeps[cr]) {
                    console.log('Deleted '+cr +'from memory')
                    delete Memory.creeps[cr];
                    delete Memory.operations[id].members[cr];
                }


                if(Memory.operations[id].reached==false && Memory.operations[id].assembled==true){
                    if(Game.flags[Memory.operations[id].flagName].pos.inRangeTo(Game.creeps[cr],2)){
                        reached = reached+1;
                    }
                    if(reached == Memory.operations[id].size){
                        Memory.operations[id].reached=true;
                    }
                }else if(Memory.operations[id].assembled==true && Memory.operations[id].reached==true){
                    if(Game.flags[Memory.operations[id].flagName].pos.roomName == Game.creeps[cr].pos.roomName){
                        reached = reached+1;
                    }
                    if(reached != Memory.operations[id].size){
                        Memory.operations[id].reached=false;
                    }
                }
            }
            // RUN CREEP JOBS
            for(var cr in Memory.operations[id].members){
                if(!Game.creeps[cr].spawning && Game.creeps[cr]){
                    if(Memory.operations[id].assembled==false){
                        console.log('Running Refresh for'+cr);
                        if(Game.creeps[cr].ticksToLive < 1400){
                            this.refreshTimer(Game.creeps[cr]);
                        }else{
                            this.creepIdle(Game.creeps[cr]);
                        }
                    }else if(Memory.operations[id].assembled==true && Memory.operations[id].reached==false){
                        console.log('Running Travel for '+cr);
						if (Game.creeps[cr].hits == Game.creeps[cr].hitsMax)
							this.creepTravel(Game.creeps[cr],Game.flags[Memory.operations[id].flagName]);
						else{
							/*
							this.creepLeaveBorder(Game.creeps[cr]);
							Game.creeps[cr].heal(creeps[cr]);*/
							this.creepAttack(Game.creeps[cr]);
						}

                    }else if(Memory.operations[id].assembled==true && Memory.operations[id].reached==true){
                        console.log('Running Penetration for '+cr);
						if (Game.creeps[cr].hits > (Game.creeps[cr].body.filter((body) => body.type == HEAL).length * 200 + 100))
							this.creepAttack(Game.creeps[cr]);
						else
							this.creepEscape(Game.creeps[cr]);
                    }
                }
            }




            }
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
                Memory.operations[this.id].type='penetration';
                Memory.operations[this.id].size=1;
                Memory.operations[this.id].nearest_spawnId=this.findClosestSpawn(flag);
                Memory.operations[this.id].assembled=false;
                Memory.operations[this.id].reached=false;
                Memory.operations[this.id].refreshed=false;
                Memory.operations[this.id].members= {};
                Memory.operations[this.id].rallyPoint=Game.spawns['Spawn1'].pos.findClosestByPath(FIND_MY_STRUCTURES,{filter: (str) => str.structureType == STRUCTURE_TOWER}).id;


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
        // IDLE MOVESET
        static creepIdle(creep){
            var target = Game.getObjectById(Memory.operations[creep.memory.operation_id].rallyPoint);
            creep.moveTo(target);

        }
        // TRAVEL TO FLAG
        static creepTravel(creep,flag){
            creep.moveTo(flag);
            creep.heal(creep);
            //this.creepAttack(creep);

        }
        // ATTACK CODE
        static creepAttack(creep){
			this.creepLeaveBorder(creep);
            var priorityTarget=Game.flags[Memory.operations[creep.memory.operation_id].flagName].pos.lookFor(LOOK_STRUCTURES);
            var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS,{filter: (hostile) =>
              WHITELIST[hostile.owner.username] == undefined 
              && hostile.pos.x > 0 && hostile.pos.y > 0 && hostile.pos.x < 49 && hostile.pos.y < 49 
              && hostile.body.filter((body) => body.type == 'attack' || body.type == 'ranged_attack' || body.type == 'claim').length > 0
            });
            var closestHostile_all = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS,{filter: (hostile) =>
              WHITELIST[hostile.owner.username] == undefined
              && hostile.pos.x > 0 && hostile.pos.y > 0 && hostile.pos.x < 49 && hostile.pos.y < 49 });
            var closestStr =creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES,{filter: (str) => (str.structureType == STRUCTURE_TOWER || str.structureType == STRUCTURE_SPAWN || str.structureType == STRUCTURE_EXTENSION) && WHITELIST[str.owner.username] == undefined, ignoreDestructibleStructures: true});
            var spawn = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES,{filter: (str) => str.structureType == STRUCTURE_TOWER && WHITELIST[str.owner.username] == undefined,ignoreDestructibleStructures: true});
            //console.log(closestHostile);
            if(priorityTarget[0]){
                //console.log(creep.name);
                //console.log(priorityTarget);
                //console.log(creep.attack(priorityTarget));
                if(creep.attack(priorityTarget[0]) == ERR_NOT_IN_RANGE){
                        creep.moveTo(priorityTarget[0],{ignoreDestructibleStructures: true});
                        //console.log(creep.moveTo(priorityTarget[0],{ignoreDestructibleStructures: true, ignoreCreeps: true}));
                        creep.heal(creep);
                        creep.say('prio 1');
                    }
            }
            else if(closestHostile){
                //console.log(creep.name);
                //console.log('TEST2');
                if(creep.attack(closestHostile) == ERR_NOT_IN_RANGE){
                    creep.moveTo(closestHostile,{ignoreDestructibleStructures: false});
                    creep.heal(creep);
                    creep.say('attacking 1');
                }
            }else if(closestHostile_all){
                if(creep.attack(closestHostile_all) == ERR_NOT_IN_RANGE){
                    creep.moveTo(closestHostile_all,{ignoreDestructibleStructures: false});
                    creep.heal(creep);
                    creep.say('attacking 1');
                }

            }else if (creep.hits < creep.hitsMax){
                creep.heal(creep);

            }else if(closestStr){

                if(creep.attack(closestStr) == ERR_NOT_IN_RANGE){
                    creep.moveTo(closestStr,{ignoreDestructibleStructures: true});
                    creep.heal(creep);
                    creep.say('attacking 2');
                }
            }else{
                //console.log('TEST3');
                creep.memory.reached=false;
                delete creep.memory.target;

            }

        }
		
		static creepEscape(creep){
			var exit = creep.room.findClosestByPath(FIND_EXIT)
			creep.moveTo(exit);
		}
		
		static creepLeaveBorder(creep){
			if (creep.pos.x == 0) creep.move(RIGHT);
			else if(creep.pos.y == 0) creep.move(BOTTOM);
			else if(creep.pos.x == 49) creep.move(LEFT);
			else if(creep.pos.y == 49) creep.move(TOP);
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