import harvestSource from "actions/harvestSource"
import build from "actions/build"

export default function run(creep: Creep): void {
    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.building = false;
        creep.say('🔄 harvest');
    }
    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
        creep.memory.building = true;
        creep.say('🚧 build');
    }

    if(creep.memory.building) {
        build(creep);
    }
    else {
        harvestSource(creep);
    }
}
