import { ErrorMapper } from "utils/ErrorMapper";

import creation from 'creation';
import roleHarvester from 'roles/harvester';
import roleBuilder from 'roles/builder';
import roleUpgrader from 'roles/upgrader';
import roleRepairer from 'roles/repairer'

const ROLE_HARVESTER = 0;
const ROLE_BUILDER = 1;
const ROLE_UPGRADER = 2;
const ROLE_REPAIRER = 3;


const MINIMUM_CREEPS: MinCreepMap = {
  [ROLE_HARVESTER]: 5,
  [ROLE_BUILDER]: 3,
  [ROLE_UPGRADER]: 3,
  [ROLE_REPAIRER]: 3
}

const ROLE_NAME_MAP: RoleNameMap = {
  [ROLE_HARVESTER]: "Harvester",
  [ROLE_BUILDER]: "Builder",
  [ROLE_UPGRADER]: "Upgrader",
  [ROLE_REPAIRER]: "Repairer"
}

const ROLE_TO_JOB: RoleToJob = {
  [ROLE_HARVESTER]: roleHarvester,
  [ROLE_BUILDER]: roleBuilder,
  [ROLE_UPGRADER]: roleUpgrader,
  [ROLE_REPAIRER]: roleRepairer
}


// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  creation(MINIMUM_CREEPS, ROLE_NAME_MAP);

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

  for(var name in Game.creeps) {
      var creep = Game.creeps[name];

      ROLE_TO_JOB[creep.memory.role](creep);
  }
});
