import { ModuleIntegration_BaseFragmentFragment } from '@last-rev-marketing-site/graphql-sdk';

export interface ModuleIntegrationProps extends ModuleIntegration_BaseFragmentFragment {}

export interface ModuleIntegrationClasses {
  root: string;
}

export declare type ModuleIntegrationClassKey = keyof ModuleIntegrationClasses;
