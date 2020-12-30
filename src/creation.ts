export default function run(minCreeps: MinCreeps, roleNameMap: RoleNameMap): void {
    cleanCreeps();

    // build no more creeps error routine

    buildNewCreeps(minCreeps, roleNameMap);
}

function cleanCreeps(): void {
    for (const name in Memory.creeps) {
        if (!(name in Game.creeps)) {
          delete Memory.creeps[name];
        }
      }
}

function buildNewCreeps(minCreeps: MinCreeps, roleNameMap: RoleNameMap): void {

    let toBuildRole = determineNewRoleToBuild(minCreeps);

    if (toBuildRole) {
        buildCreepOf(toBuildRole, roleNameMap);
    }

    if (Game.spawns['Spawn1'].spawning) {
        announceNewCreepBeingSpawned(Game.spawns['Spawn1'].spawning.name, roleNameMap)
    }
}

function determineNewRoleToBuild(minCreeps: MinCreeps): CreepRole | null {
    let found = _.find(minCreeps, function([role, minimum]) {
        let existing = _.filter(Game.creeps, (creep) => creep.memory.role == role);
        return existing.length < minimum;
    });

    return (found && found[0]) || null;
}

function buildCreepOf(role: CreepRole, roleNameMap: RoleNameMap): void {
    let roleName = roleNameMap[role];
    console.log(`Building new ${roleName}`);
    var newName = `${roleName} ${Game.time}`

    Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName,
        {memory: {role: role, building: false, upgrading: false, repairing: false}})
}

function announceNewCreepBeingSpawned(spawningName: string, roleNameMap: RoleNameMap): void {
    var spawningCreep = Game.creeps[spawningName];
    Game.spawns['Spawn1'].room.visual.text(
        '🛠️' + roleNameMap[spawningCreep.memory.role],
        Game.spawns['Spawn1'].pos.x + 1,
        Game.spawns['Spawn1'].pos.y,
        {align: 'left', opacity: 0.8});
}
