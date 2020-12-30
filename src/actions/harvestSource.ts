export default function harvestSource(creep: Creep): void {
  var closestSource = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
  if (closestSource && creep.harvest(closestSource) == ERR_NOT_IN_RANGE) {
    creep.moveTo(closestSource, { visualizePathStyle: { stroke: "#ffaa00" } });
  }
}
