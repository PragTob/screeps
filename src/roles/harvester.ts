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
        let structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        if(structure) {
            if(creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(structure, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            // hack because the type system doesn't let me include it above?
            let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });

            if(container) {
                if(creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                // regress to builder behavior
                builder(creep)
            }
       }
    }
}
