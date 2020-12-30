export default function run(minHarvesterMap: MinCreepMap, roleNameMap: RoleNameMap): void {
    cleanCreeps();

    for (let roleString in minHarvesterMap) {
        let role = +roleString;
        let existing = _.filter(Game.creeps, (creep) => creep.memory.role == role)

        let minRequired = minHarvesterMap[roleString];

        if (existing.length < minRequired) {
            let roleName = roleNameMap[roleString];
            console.log(`Building new ${roleName}`);
            var newName = `${roleName} ${Game.time}`

            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName,
                {memory: {role: role, building: false, upgrading: false, repairing: false}})
        }
    }


    if (Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }
}

function cleanCreeps(): void {
    for (const name in Memory.creeps) {
        if (!(name in Game.creeps)) {
          delete Memory.creeps[name];
        }
      }
}
