import Node from "./Node";


export enum ConnectionTypes
{
    SIMPLE_CONNECTION = "---",
    POINTS_CONNECTION = "-.-",
    APPOINTS_TO = "-->",
    POINTS_APPOINTS_TO = "-.->",
}

export default class MultiEdgeHandller
{
    private connectedWith: Node[];
    private connectionName: string;
    private connectionType: ConnectionTypes;

    public constructor(connectedWith: Node[], connectionType: ConnectionTypes, connectionName: string = "")
    {
        this.connectedWith = connectedWith;
        this.connectionName = connectionName ? `|${connectionName}|` : "";
        this.connectionType = connectionType;
    }

    public addConnection(node: Node)
    {
        this.connectedWith.push(node);
    }

    public render(): string
    {
        if(this.connectedWith.length == 0)
            { return ""; }

        return `${this.connectionType}${this.connectionName} ${this.connectedWith.map(node => node.getIdentifier()).join(' & ')}`;
    }

    public checkConnection(_type: ConnectionTypes, connectionName: string): boolean
    {
        return this.connectionType == _type && this.connectionName == `|${connectionName}|`;
    }

    public getConnections(): Node[]
    {
        return this.connectedWith;
    }
}

