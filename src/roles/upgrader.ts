import getEnergy from "actions/getEnergy";

export default function run(creep: Creep): void {
  if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
    creep.memory.upgrading = false;
    creep.say("🔄 getting Energy");
  }
  if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
    creep.memory.upgrading = true;
    creep.say("⚡ upgrade");
  }

  if (creep.memory.upgrading) {
    let controller = creep.room.controller;

    if (controller) {
      // creep got lost
      if (!controller.my) {
        controller = Game.spawns["Spawn1"].room.controller;
      }

      if (controller && creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(controller, { visualizePathStyle: { stroke: "#ffffff" } });
      }
    }
  } else {
    getEnergy(creep);
  }
}
