import { spawnCost } from "./spawning";

describe("spawnCost", () => {
  const combinations: Array<[BodyPartConstant[], number]> = [
    [[], 0],
    [[WORK, CARRY, MOVE], 200],
    [[WORK, CARRY, MOVE, MOVE], 250],
    [[WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], 450],
    [[WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 500]
  ];

  for (const [recipe, cost] of combinations) {
    it(`returns ${cost} for ${recipe}`, () => {
      expect(spawnCost(recipe)).toEqual(cost);
    });
  }
});
