import builder from "roles/builder"
import harvest from "actions/harvestSource"
import harvestSource from "actions/harvestSource";

export default function run(creep: Creep): void {
    let structureToRepair = findStructureToRepair(creep);

    if (structureToRepair) {
        if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false
        }
        if (!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
            creep.memory.repairing = true;
        }

        if (creep.memory.repairing) {
            repair(creep, structureToRepair)
        }
        else {
            harvestSource(creep)
        }
    }
    else {
        creep.memory.repairing = false;
        builder(creep)
    }
}

const CRITICAL_HIT_DIFF = 1_000;

function findStructureToRepair(creep: Creep): Structure | null {
    return creep.pos.findClosestByPath(FIND_STRUCTURES,
        {
            filter: (structure) => {
                let missingHits = structure.hitsMax - structure.hits;
                return missingHits >= CRITICAL_HIT_DIFF;
            }
        }
    )
}

// fully repair the target
function repair(creep: Creep, structure: Structure): void {
    if(creep.repair(structure) == ERR_NOT_IN_RANGE) {
        creep.moveTo(structure, {visualizePathStyle: {stroke: '#ffffff'}});
    }
}
