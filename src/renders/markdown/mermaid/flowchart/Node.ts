import { identate } from "../../../Identation";
import ChartTextRender from "./ChartTextRender";
import MultiEdgeHandller, { ConnectionTypes } from "./MultiEdgeHandler";


export default class Node
{
    private identifier: string;
    private text: ChartTextRender;
    private edges: MultiEdgeHandller[];

    public constructor(identifier: string, text: string)
    {
        this.identifier = identifier;
        this.text = new ChartTextRender(text);
        this.edges = [];
    }

    public getIdentifier(): string
    {
        return this.identifier;
    }

    public renderName(identationStartLevel: number = 0): string
    {
        return `${identate(identationStartLevel)}${this.identifier}["${this.text.render()}"]`;
    }

    public renderConnections(identationStartLevel: number = 0): string
    {
        return `\n${identate(identationStartLevel)}${this.identifier}` + this.edges.map(edge => edge.render()).join(`\n ${identate(identationStartLevel)}`);
    }

    public addEdge(node: Node, connectionType: ConnectionTypes, connectionName: string = "")
    {
        let edge: MultiEdgeHandller | undefined = this.edges.filter(edge => edge.checkConnection(connectionType, connectionName)).at(0);

        if(edge == undefined)
        {
            edge = new MultiEdgeHandller([node], connectionType, connectionName);
            this.edges.push(edge);
        }
        else
        {
            edge.addConnection(node);
        }
    }

    public getDependsEdges(): Node[]
    {
        return this.edges.filter(edge => edge.checkConnection(ConnectionTypes.APPOINTS_TO, "depends")).map(meh => meh.getConnections()).flat();
    }

    public compareTo(other: Node): boolean
    {
        return this.identifier == other.identifier;
    }

    public cloneEmptyEdges(): Node
    {
        return new Node(this.identifier, this.text.getText());
    }
}

