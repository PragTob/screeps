import { MINIMUM_CREEPS, ROLE_HARVESTER, ROLE_NAME_MAP } from "./constants";

export default function run(): void {
  cleanCreeps();

  // build no more creeps error routine
  handleIfNoHarvesters();

  buildNewCreeps();
}

function cleanCreeps(): void {
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
}

function handleIfNoHarvesters(): void {
  if (_.filter(Game.creeps, creep => creep.memory.role == ROLE_HARVESTER).length == 0) {
    Game.notify("NO MORE HARVESTERS WTF WHYYYYYY");
    console.log("wait why are there no more harvester?");
    // repurpose existing as harvesters
    // emergencyBuildHarvester()
  }
}

function buildNewCreeps(): void {
  if (Game.spawns["Spawn1"].spawning) {
    announceNewCreepBeingSpawned(Game.spawns["Spawn1"].spawning.name);
  } else {
    let toBuildRole = determineNewRoleToBuild();

    if (toBuildRole != null) {
      buildCreepOf(toBuildRole);
    }
  }
}

function determineNewRoleToBuild(): CreepRole | null {
  let found = _.find(MINIMUM_CREEPS, function ([role, minimum]) {
    let existing = _.filter(Game.creeps, creep => creep.memory.role == role);
    return existing.length < minimum;
  });

  return found ? found[0] : null;
}

function buildCreepOf(role: CreepRole): void {
  let roleName = ROLE_NAME_MAP[role];
  const buildRecipe = [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
  const price = spawnCost(buildRecipe);
  const spawner = Game.spawns["Spawn1"];

  if (price < spawner.room.energyAvailable) {
    console.log(`Building new ${roleName}`);
    let newName = `${roleName} ${Game.time}`;

    spawner.spawnCreep(buildRecipe, newName, {
      memory: { role: role, building: false, upgrading: false, repairing: false }
    });
  }
}

function announceNewCreepBeingSpawned(spawningName: string): void {
  var spawningCreep = Game.creeps[spawningName];
  Game.spawns["Spawn1"].room.visual.text(
    "🛠️" + ROLE_NAME_MAP[spawningCreep.memory.role],
    Game.spawns["Spawn1"].pos.x + 1,
    Game.spawns["Spawn1"].pos.y,
    { align: "left", opacity: 0.8 }
  );
}

function spawnCost(buildRecipe: BodyPartConstant[]): number {
  return buildRecipe.reduce((sum, partType) => {
    return sum + BODYPART_COST[partType];
  }, 0);
}
