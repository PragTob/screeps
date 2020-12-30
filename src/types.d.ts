// example declaration file - remove these and add your own custom typings

// Use actual constants...
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

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}
