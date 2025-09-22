import { PackageType } from "../spark/PackageTypes";
import { NameableSuperType } from "../supertypes";
import { ActorType, UseCaseClass } from "./AnalisysTypes";
import { RequirimentAgregationClass } from "./RequirimentsClass";


export interface ProjectOverviewType extends NameableSuperType
{
    purpose: string;
    miniwolrd: string;
    architecture: string;
}


export interface ProjectModuleType extends NameableSuperType
{
    miniwolrd: string;
    purpose: string;
    requisites: RequirimentAgregationClass;
    actors: ActorType[],
    uc: UseCaseClass[];
    packages: PackageType[];
}


export interface ProjectType 
{
    overview: ProjectOverviewType;
    modules: ProjectModuleType[]; 
}

