import { OperationsManager } from "empire/OperationsManager";
import { OPERATION, OperationMemory } from "utils/constants";
import { RoomMemoryUtil } from "utils/RoomMemoryUtil";
import { BuildOperation } from "../BuildOperation";
import { DefenseOperation } from "../DefenseOperation";
import { HaulerOperation } from "../HaulerOperation";
import { MinerOperation } from "../MinerOperation";
import RepairOperation from "../RepairOperation";
import { RoomLogisticsOperation } from "../RoomLogisticsOperation";
import { RoomOperation } from "../RoomOperation";
import { RoomPlannerOperation } from "../roomPlanner/RoomPlannerOperation";
import SupplyOperation from "../SupplyOperation";
import { UpgradeOperation } from "../UpgradeOperation";







/**
 * This Phase is Active preStorage after the first Spawn,
 * it should also activate if room is in decline and needs recovery. 
 */
export class InitialRoomOperation extends RoomOperation{


    constructor(name: string,manager: OperationsManager, entry: OperationMemory) {
        super(name,manager,entry);
        this.type = OPERATION.BASE;
        this.priority = 99;
    }


    public setRoomPlanner(name: string){
        this.data.roomPlanner = name;
    }
    public run() {
        super.run();
        const r: Room = this.room;
        this.checkForEmergency();
        // Validate Op


        if(r != null){
            if(this.room.controller != null){
                if(this.room.controller.my === false){
                    this.removeSelf();
                }
            }
            // Add Missing RoomOps
            if(this.data.roomPlanner == null){
                console.log("Enqued RoomPlanner Op for Room: " + r.name);
                this.createNewRoomPlanner();

            }else {
                if( !this.manager.entryExists(this.data.roomPlanner)){
                    console.log("Enqued RoomPlanner not found" + r.name);
                    this.data.roomPlanner = null;
                }
            }
            if(r. storage != null){
                if(this.data.supply == null){
                    this.createSupplyOperation();
                } else {
                    if( !this.manager.entryExists(this.data.supply)){
                        this.data.supply = null;
                    }
                }
                if(this.data.build == null){
                    this.createBuildOperation();
                } else {
                    if( !this.manager.entryExists(this.data.build)){
                        this.data.build = null;
                    }
                }
                if(this.data.repair == null){
                    this.createRepairOperation();
                } else {
                    if( !this.manager.entryExists(this.data.repair)){
                        this.data.repair = null;
                    }
                }
                if(this.data.haul == null ){
                    this.createHaulOperation();
                } else {
                    if( !this.manager.entryExists(this.data.haul)){
                        this.data.haul = null;
                    }
                }
                if( this.data.upgrade == null){
                    this.createUpgradeOperation();
                } else {
                    if( !this.manager.entryExists(this.data.upgrade)){
                        this.data.upgrade = null;
                    }
                }
                if( this.data.logistic == null){
                    console.log("Enque Logistic Op");
                    this.createRoomLogisticsOperation();
                } else {
                    if( !this.manager.entryExists(this.data.logistic)){
                        this.data.logistic = null;
                    }
                }
            }
            if(r.controller!.level >= 3){
                if(this.data.mine == null ){
                    this.createMiningOperation();
                } else {
                    if( !this.manager.entryExists(this.data.mine)){
                        this.data.mine = null;
                    }
                }
                if(this.data.defense == null){
                    this.createDefenseOperation();
                } else {
                    if( !this.manager.entryExists(this.data.defense)){
                        this.data.defense = null;
                    }
                }
            }

            // Validate creeps:
            this.validateCreeps();
            this.colonize();

            if(r.storage == null) {
                if(this.data.creeps.length < 6){
                    if(r.find(FIND_MY_CREEPS).length === 0){
                        const name = this.manager.empire.spawnMgr.enque({
                            room: r.name,
                            memory: {role: "Maintenance"},
                            pause: 0,
                            priority: 100,
                            rebuild: false});
                        this.data.creeps.push(name);
                    }
                }
            }
        } else {
            this.removeSelf();
        }
        

    }

    private colonize(): void {
        if(Math.random() <= 0.001){
            if(this.canColonize()){
                const room = RoomMemoryUtil.getNearestColonizeAbleRoom(this.room.name);
                if( room != null){
                    this.createColonizeOperation(room);
                    RoomMemoryUtil.reserveRoom(room);
                }
            }
        }
    }

    private canColonize(): boolean {
        if(this.room.energyCapacityAvailable >= 650){
            this.checkColonizeOperation();
            if(this.data.colonize == null){
                return true;
            }
        }
        return false;
    }

    private checkColonizeOperation(): void {
        if(this.data.colonize != null){
            if( !this.manager.entryExists(this.data.colonize)){
                this.data.colonize = null;
            }
        }
    }
    
    private createColonizeOperation(roomName: string): void {
        if(this.data.colonize != null){
            if( !this.manager.entryExists(this.data.colonize)){
                this.data.colonize = null;
            }
        } else {
            this.data.colonize = this.manager.enque({type: OPERATION.COLONIZE, data: {room: roomName, parent: this.name, spawnRoom: this.room.name},pause: 1});
        }
        
    }

    private checkForEmergency(): void {
        if(this.data.emergencyCounter == null){
            this.data.emergencyCounter = 0;
        }
        if(this.room.energyAvailable <= 300 && this.room.controller!.level >= 4){
            this.data.emergencyCounter += 1; 
        } else if(this.room.energyAvailable >= this.room.energyCapacityAvailable -300) {
            this.data.emergencyCounter = 0;
        }
        if(this.data.emergencyCounter > 1000){
            this.data.creepsMax = 10;
            this.validateCreeps();
            if(this.data.creepsMax > this.data.creeps.length){
                for(let j=0; j< this.data.creepsMax - (this.data.creeps.length); j++){
                    const name = this.manager.empire.spawnMgr.enque({
                        room: this.room.name,
                        memory: {role: "Maintenance", op: this.name},
                        pause: 0,
                        body: undefined,
                        priority: 101,
                        rebuild: false});
                    this.data.creeps.push(name);
                }
            }

        }
    }



    private enqueueMaintenanceCreep(): void {
        const name = this.manager.empire.spawnMgr.enque({
            room: this.room.name,
            memory: {role: "Maintenance", op: this.name},
            pause: 0,
            body: [WORK,MOVE,MOVE,CARRY,CARRY],
            priority: 50,
            rebuild: false});
        this.data.creeps.push(name);
    }
    public getRoomPlannerOperation(): RoomPlannerOperation {
        if(this.data.roomPlanner != null){
            const op = this.manager.getEntryByName<RoomPlannerOperation>(this.data.roomPlanner);
            if( op != null){
                return op;
            }
        }
        this.createNewRoomPlanner();
        return this.getRoomPlannerOperation();
    }

    private createNewRoomPlanner(): void {
        this.data.roomPlanner = this.manager.enque({type: OPERATION.ROOMPLANNER, data: {roomName: this.data.roomName, parent: this.name}, pause: 1});
    }

    public getMiningOperation(): MinerOperation {
        if(this.data.mine != null){
            const op = this.manager.getEntryByName<MinerOperation>(this.data.mine);
            if( op != null){
                return op;
            }
        }
        this.createMiningOperation();
        return this.getMiningOperation(); 
    }

    public getBuildingList(): BuildEntry[] {
        console.log("Get Complete BuildingsList for room: " + this.room.name);
        const out = super.getBuildingList();
        this.getRoomPlannerOperation().updateBuildingCostMatrix(out);
        const miningOp = this.getMiningOperation().getBuildingList();
        this.getRoomPlannerOperation().updateBuildingCostMatrix(miningOp);
        const upgrade = this.getUpgradeOperation().getBuildingList();
        this.getRoomPlannerOperation().updateBuildingCostMatrix(upgrade);
        return out.concat(miningOp).concat(upgrade);
    }

    private createMiningOperation(): void {
        this.data.mine = this.manager.enque({type: OPERATION.HAUL, data: {roomName: this.room.name, parent: this.name},pause: 1});
    }

    public getSupplyOperation(): SupplyOperation {
        if(this.data.supply != null){
            const op = this.manager.getEntryByName<SupplyOperation>(this.data.supply);
            if( op != null){
                return op;
            }
        } 
        this.createSupplyOperation();
        return this.getSupplyOperation(); 

    }

    private createSupplyOperation(): void {
        this.data.supply = this.manager.enque({type: OPERATION.SUPPLY, data: {roomName: this.room.name, parent: this.name},pause: 1});
    }


    public getRepairOperation(): RepairOperation {
        if(this.data.repair != null){
            const op = this.manager.getEntryByName<RepairOperation>(this.data.repair);
            if( op != null){
                return op;
            }
        }
        this.createRepairOperation();
        return this.getRepairOperation(); 
    }


    private createRepairOperation(): void {
        this.data.repair = this.manager.enque({type: OPERATION.REPAIR, data: {roomName: this.room.name, parent: this.name},pause: 1}); 

    }

    public getDefenseOperation(): DefenseOperation {
        if(this.data.repair != null){
            const op = this.manager.getEntryByName<DefenseOperation>(this.data.repair);
            if( op != null){
                return op;
            }
        }
        this.createDefenseOperation();
        return this.getDefenseOperation(); 
    }

    private createDefenseOperation(): void {
        this.data.defense = this.manager.enque({ type: OPERATION.DEFEND, data: {roomName: this.room.name, parent: this.name},pause: 1});

    }

    public getHaulOperation(): HaulerOperation {
        if(this.data.haul != null){
            const op = this.manager.getEntryByName<HaulerOperation>(this.data.haul);
            if( op != null){
                return op;
            }
        }
        this.createHaulOperation();
        return this.getHaulOperation(); 
    }

    private createHaulOperation(): void {
        this.data.haul = this.manager.enque({type: OPERATION.HAUL, data: {roomName: this.room.name, parent: this.name},pause: 1});
    }

    public getRoomLogisticsOperation(): RoomLogisticsOperation {
        if(this.data.logistic != null){
            const op = this.manager.getEntryByName<RoomLogisticsOperation>(this.data.logistic);
            if( op != null){
                return op;
            }
        }
        this.createRoomLogisticsOperation();
        return this.getRoomLogisticsOperation(); 
    }

    private createRoomLogisticsOperation(): void {
        this.data.logistic = this.manager.enque({type: OPERATION.ROOMLOGISTICS, data: {roomName: this.room.name, parent: this.name},pause: 1});

    }

    public getBuildOperation(): BuildOperation {
        if(this.data.build != null){
            const op = this.manager.getEntryByName<BuildOperation>(this.data.build);
            if( op != null){
                return op;
            }
        }
        this.createBuildOperation();
        return this.getBuildOperation(); 
    }

    private createBuildOperation(): void {
        this.data.build = this.manager.enque({type: OPERATION.BUILD, data: {roomName: this.room.name, parent: this.name},pause: 1});
    }

    public getUpgradeOperation(): UpgradeOperation {
        if(this.data.upgrade != null){
            const op = this.manager.getEntryByName<UpgradeOperation>(this.data.upgrade);
            if( op != null){
                return op;
            }
        }
        this.createUpgradeOperation();
        return this.getUpgradeOperation(); 
    }

    private createUpgradeOperation(): void {
        this.data.upgrade = this.manager.enque({type: OPERATION.UPGRADE, data: {roomName: this.room.name, parent: this.name},pause: 1});
    }

}