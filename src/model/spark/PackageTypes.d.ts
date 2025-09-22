import { BaseSuperType } from "../supertypes";
import { EntityType } from "./EntityTypes";
import { EnumEntityType } from "./EnumTypes";

/**
 * This Translate Andes Module
 */
export interface PackageType extends BaseSuperType
{
    entities: EntityType[];
    enums?: EnumEntityType[];
    subPackage?: PackageType[];
}

