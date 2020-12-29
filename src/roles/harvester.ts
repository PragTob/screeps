import harvestSource from "actions/harvestSource"

export default function run(creep: Creep): void {
    if(creep.store.getFreeCapacity() > 0) {
        harvestSource(creep);
    }
    else {
        var structures = creep.room.find(FIND_STRUCTURES, {
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
    }
}
