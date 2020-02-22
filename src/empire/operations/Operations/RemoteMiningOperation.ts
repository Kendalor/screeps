import { OperationsManager } from "empire/OperationsManager";
import { OPERATION, OperationMemory } from "utils/constants";
import { FlagOperation } from "./FlagOperation";


export class RemoteMiningOperation extends FlagOperation {
    
    constructor(name: string, manager: OperationsManager, entry: OperationMemory) {
        super(name, manager,entry);
        this.type = OPERATION.REMOTEMINING;
    }

    public run() {
        super.run();
    }
}