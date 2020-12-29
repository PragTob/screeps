import harvestSource from "actions/harvestSource"

export default function run(creep: Creep): void {

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if(creep.memory.upgrading) {
            let controller = creep.room.controller;
            if(controller) {
                if(creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(controller, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            harvestSource(creep);
        }
    }

