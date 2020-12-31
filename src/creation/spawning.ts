export function spawnCost(buildRecipe: BodyPartConstant[]): number {
  return buildRecipe.reduce((sum, partType) => {
    return sum + BODYPART_COST[partType];
  }, 0);
}
