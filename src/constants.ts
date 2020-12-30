import roleHarvester from "roles/harvester";
import roleBuilder from "roles/builder";
import roleUpgrader from "roles/upgrader";
import roleRepairer from "roles/repairer";

export const ROLE_HARVESTER = 0;
export const ROLE_BUILDER = 1;
export const ROLE_UPGRADER = 2;
export const ROLE_REPAIRER = 3;

// order matters first roles are produced first, make sure to always have harvesters
export const MINIMUM_CREEPS: MinCreeps = [
  [ROLE_HARVESTER, 5],
  [ROLE_UPGRADER, 3],
  [ROLE_REPAIRER, 2],
  [ROLE_BUILDER, 2]
];

export const ROLE_NAME_MAP: RoleNameMap = {
  [ROLE_HARVESTER]: "Harvester",
  [ROLE_BUILDER]: "Builder",
  [ROLE_UPGRADER]: "Upgrader",
  [ROLE_REPAIRER]: "Repairer"
};

export const ROLE_TO_JOB: RoleToJob = {
  [ROLE_HARVESTER]: roleHarvester,
  [ROLE_BUILDER]: roleBuilder,
  [ROLE_UPGRADER]: roleUpgrader,
  [ROLE_REPAIRER]: roleRepairer
};
