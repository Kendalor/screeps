import {Job} from "./Job";
import {IBUCreep} from "./IBUCreepJob";

export class InitialBuildUpJob extends Job {
  public type = "IBU";
  public room: Room;
  public roomData: RoomData;
  public run(){
    const job = this;
    this.room = Game.rooms[this.data.name];
    this.roomData = global.roomData[this.data.name];
    let numWorkers = 0;
    for (const i in job.roomData.sourceSlots) {
      for (let j = 0; j < job.roomData.sourceSlots[i]; j++){
        numWorkers = numWorkers + +1;
        this.manager.addJobIfNotExist(job.name + "_" + numWorkers, IBUCreep, 20, {source: job.roomData.sourceSlots[i], name: this.room.name}, job.name);
      }
    }

    if (!!this.room.storage) {
      this.completed = true;
    }
  }
}
