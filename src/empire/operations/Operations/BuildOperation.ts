import { OperationsManager } from "empire/OperationsManager";
import { OperationMemory } from "./OperationMemory";
import { RoomOperation } from "./RoomOperation";


/**
 * This Phase is Active preStorage after the first Spawn,
 * it should also activate if room is in decline and needs recovery. 
 */
export class BuildOperation extends RoomOperation{
    

    constructor(name: string, manager: OperationsManager, entry: OperationMemory) {
        super(name, manager,entry);
        this.type = "BuildOperation";
    }
/**
 * Adds Creeps for this Phase to the spawnManager
 */

    public run() {
        super.run();
        const r: Room = this.room;
        if( r != null){
            const constrSites = r.find(FIND_CONSTRUCTION_SITES);
            this.validateCreeps();
            const currentBuilders = this.data.creeps.length;
            if(constrSites.length > 0) {
                const numToSpawn: number = Math.max(0, Math.ceil(constrSites.length/5));
                if(numToSpawn > currentBuilders){
                    for(let j=0; j< numToSpawn - (currentBuilders); j++){
                        const name=this.manager.empire.spawnMgr.enque({
                            room: this.data.roomName,
                            memory: {role: "Builder", op: this.name},
                            pause: 0,
                            body: undefined,
                            priority: 50,
                            rebuild: false});
                        this.data.creeps.push(name);
                    }
                }
            }
        }
        
    }


}