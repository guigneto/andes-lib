import { EntityType } from "../../../../model/spark/EntityTypes";
import { identate } from "../../../Identation";
import IRender from "../../../IRender";
import AttributeRender from "./AttributeRender";
import MethodRender from "./MethodRender";
import RelationHandler from "./RelationHandler";


export default class ClassRender implements IRender
{
    private name: string;
    private attr: AttributeRender[];
    private methods: MethodRender[];
    private supertypes: ClassRender[];
    private relations: RelationHandler[];

    public constructor(entidade: EntityType)
    {
        this.name = entidade.identifier;
        this.attr = entidade.attributes?.map(atr => new AttributeRender(atr))?? [];
        this.methods = [];
        this.supertypes = [];
        this.relations = entidade.relationsAttr?.map(r => new RelationHandler(r))?? [];
    }

    public render(identationStartLevel: number = 0): string
    {
        return `${identate(identationStartLevel)}class ${this.name} {\n${this.attr.map(attr => attr.render(identationStartLevel+1)).join('\n')}\n${this.methods.map(method => method.render(identationStartLevel+1)).join('\n')}\n${identate(identationStartLevel)}}`;
    }

    public renderHerance(identationLevel: number = 0): string
    {
        return `\n${identate(identationLevel)}${this.supertypes.map(supertype => `${supertype.name} <|-- ${this.name}`)}`;
    }

    public renderRelations(identationLevel: number): string 
    {
        return `${identate(identationLevel)}${this.relations.map(relation => `${this.renderRelation(relation)}`).join(`${identate(identationLevel)}\n`)}`;
    }

    private renderRelation(relation: RelationHandler): string
    {
        const relaciones = relation.getRelationName() ? `: ${relation.getRelationName()}` : "";
        return `${relation.getTarget().name} "${relation.renderTargerNumeration()}" -- "${relation.renderSelfNumeration()}" ${this.name} ${relaciones}`;
    }
}

