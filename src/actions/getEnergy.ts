export default function run(creep: Creep): void {
    let room = creep.room;
    let activeSources = room.find(FIND_SOURCES_ACTIVE);
    let activeContainers = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER ||
                structure.structureType == STRUCTURE_STORAGE) &&
                (structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0)
        }
    });

    let potentialEnergyPositions = activeSources.map((source) => {return source.pos;}).concat(activeContainers.map((container)=> {return container.pos}));

    let closestCoordinate = creep.pos.findClosestByPath(potentialEnergyPositions);

    if(closestCoordinate == null) {
        return;
    }

    let container = room.lookForAt(LOOK_STRUCTURES, closestCoordinate)[0]

    if(container) {
        if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    } else {
        let source = room.lookForAt(LOOK_SOURCES, closestCoordinate)[0]
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    }
}
