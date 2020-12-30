import { ErrorMapper } from "utils/ErrorMapper";

import creation from "creation";

import { ROLE_TO_JOB } from "./constants";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  creation();

  // var tower = Game.getObjectById('TOWER_ID');
  // if(tower) {
  //     var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
  //         filter: (structure) => structure.hits < structure.hitsMax
  //     });
  //     if(closestDamagedStructure) {
  //         tower.repair(closestDamagedStructure);
  //     }

  //     var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
  //     if(closestHostile) {
  //         tower.attack(closestHostile);
  //     }
  // }

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];

    ROLE_TO_JOB[creep.memory.role](creep);
  }
});
