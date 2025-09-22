import { BaseSuperType, DescriptableSuperType, NameableSuperType } from "../supertypes";
import { EnumEntityType } from "./EnumTypes";


/**
 * @interface AttributeType Abstrai os parâmetros que um atributo possui
 * 
 * @param identifier indica o nome do atributo. 
 * @param type recebe o tipo do atributo
 */
export interface AttributeType extends BaseSuperType
{
    type: string;
    blank: boolean,
    unique: boolean,
    min?: number,
    max?: number,
}


/**
 * @interface EnumAttributeType Abstrai os parâmetros que um atributo referente a um enum possui.
 * 
 * @param identifier indica qual o nome da relação. Exemplo entity Aluno { **semestre** uses Semestres }.
 * @param type indica a qual objeto a relação está associada. Exemplo entity Aluno { semestre uses **Semestres** }.
 */
export interface EnumAttributeType extends BaseSuperType 
{
    type: EnumEntityType;
}


export interface RelationType extends BaseSuperType
{
    relationType: string;
    targetObject: EntityType;
    min?: number;
    max?: number;
}


export interface EntityType extends BaseSuperType
{
    attributes?: AttributeType[];
    enums?: EnumAttributeType[];
    relationsAttr?: RelationType[];
}

