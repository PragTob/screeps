// example declaration file - remove these and add your own custom typings

// memory extension samples
interface CreepMemory {
  role: number;
  building: boolean;
  upgrading: boolean;
}

type MinCreepMap = Record<number, number>
type RoleNameMap = Record<number, string>
type RoleToJob = Record<number, (creep: Creep) => void>



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