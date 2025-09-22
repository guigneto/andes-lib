import { RelationType } from "../../../../model/spark/EntityTypes";
import { identate } from "../../../Identation";
import IRender from "../../../IRender";
import ClassRender from "./ClassRender";

export enum NumberOptions
{
    One,
    Many,
    OneOrMore,
    ZeroOrMore,
}


function renderNumeration(num: NumberOptions): string
{
    switch(num)
    {
        case NumberOptions.Many: return "*";
        case NumberOptions.One: return "1";
        case NumberOptions.OneOrMore: return "1..*";
        case NumberOptions.ZeroOrMore: return "0..*";
    }
}


export default class RelationHandler
{
    private target: ClassRender;
    private targetNumeration: NumberOptions;
    private selfNumeration: NumberOptions;
    private relationName: string;

    public constructor(r: RelationType)
    {
        this.target = new ClassRender(r.targetObject);
        switch (r.relationType) {
        case "ManyToOne":
            this.selfNumeration = NumberOptions.Many;
            this.targetNumeration = NumberOptions.One;
            break;

        case "OneToMany":
            this.selfNumeration = NumberOptions.One;
            this.targetNumeration = NumberOptions.Many;
            break;

        case "OneToOne":
            this.selfNumeration = NumberOptions.One;
            this.targetNumeration = NumberOptions.One;
            break;

        case "ManyToMany":
            this.selfNumeration = NumberOptions.Many;
            this.targetNumeration = NumberOptions.Many;
            break;

        case "OneToZeroOrMore":
            this.selfNumeration = NumberOptions.One;
            this.targetNumeration = NumberOptions.ZeroOrMore;
            break;

        case "ZeroOrMoreToOne":
            this.selfNumeration = NumberOptions.ZeroOrMore;
            this.targetNumeration = NumberOptions.One;
            break;

        case "OneToOneOrMore":
            this.selfNumeration = NumberOptions.One;
            this.targetNumeration = NumberOptions.OneOrMore;
            break;

        case "OneOrMoreToOne":
            this.selfNumeration = NumberOptions.OneOrMore;
            this.targetNumeration = NumberOptions.One;
            break;

        default:
            throw new Error(`Unknown relation type: ${r.relationType}`);
        }
        this.relationName = r.identifier;
    }

    public renderTargerNumeration(): string
    {
        return renderNumeration(this.targetNumeration);
    }

    public renderSelfNumeration(): string
    {
        return renderNumeration(this.selfNumeration);
    }

    public getTarget(): ClassRender
    {
        return this.target;
    }

    public getRelationName(): string
    {
        return this.relationName;
    }
}

