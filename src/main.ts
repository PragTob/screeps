import { ErrorMapper } from "utils/ErrorMapper";

import creation from "creation";

import { ROLE_TO_JOB } from "./constants";

// https://github.com/screepers/screeps-typescript-starter/issues/147#issuecomment-719300872
declare global {
  // huh maybe gotta declare them as types and then get their values?
  type CreepRole = 0 | 1 | 2 | 3;

  // memory extension samples
  interface CreepMemory {
    role: CreepRole;
    building: boolean;
    upgrading: boolean;
    repairing: boolean;
  }

  type MinCreepValue = [CreepRole, number];

  type MinCreeps = Array<MinCreepValue>;
  type RoleNameMap = Record<CreepRole, string>;
  type RoleToJob = Record<CreepRole, (creep: Creep) => void>;

  interface Memory {
    uuid: number;
    log: any;
  }
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}

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
