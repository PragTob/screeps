import harvestSource from "actions/harvestSource"

import builder from "roles/builder"

export default function run(creep: Creep): void {
    if (creep.memory.building) {
        return builder(creep);
    }

    if(creep.store.getFreeCapacity() > 0) {
        harvestSource(creep);
    }
    else {
        let structures = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        if(structures.length > 0) {
            if(creep.transfer(structures[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(structures[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            // hack because the type system doesn't let me include it above?
            let containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });

            if(containers.length > 0) {
                if(creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                // regress to builder behavior
                builder(creep)
            }
       }
    }
}
