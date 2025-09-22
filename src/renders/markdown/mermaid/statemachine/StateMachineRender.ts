import { ConnectionTypes } from "../flowchart/MultiEdgeHandler";
import Node from "../flowchart/Node";
import MermaidRender from "../MermaidRender"

export default class StateMachineRender extends MermaidRender
{
    private static enumeration: number = 1;
    private startNode: Node;
    private endNode: Node;
    private otherStates: Node[];

    public constructor(entidade: string, author: string = "Autoria Própria")
    {
        super("Máquina de Estados", `da entidade${entidade}`, author, StateMachineRender.enumeration);
        this.startNode = new Node("", "*");
        this.endNode = new Node("", "*");
        this.otherStates = [];

        StateMachineRender.enumeration++;
    }

    public addStartState(newState: Node)
    {
        this.startNode.addEdge(newState, ConnectionTypes.APPOINTS_TO);
    }

    public addEndState(toEnd: Node)
    {
        toEnd.addEdge(this.endNode, ConnectionTypes.APPOINTS_TO);
    }

    /**
     * @param newState -> novo estado a ser adicionado na máquina de estados
     * @returns true se consseguir adicionar, false caso o estado já esteja na máquina de estados.
     */
    public addState(newState: Node): boolean
    {
        for(let state of this.otherStates)
        {
            if(state.compareTo(newState))
                { return false; }
        }
        this.otherStates.push(newState);
        return true;
    }

    public getState(stateIdentifier: string): Node | undefined
    {
        return this.otherStates.filter(state => state.getIdentifier() == stateIdentifier).at(0);
    }

    public mermaidRender(identationStartLevel: number): string
    {
        let title = `---\ntitle: ${this.renderDescreption()}\n---`;
        let body = `stateDiagram-v2\n${this.renderNodesName(1)}\n${this.renderNodeConnection(1)}`;

        return `\n${title}\n${body}\n`;    
    }

    private renderNodesName(identationLevel: number = 0): string
    {
        return `${this.startNode.renderName()}\n` +  this.otherStates.map(node => node.renderName(identationLevel)).join('\n') + `${this.endNode.renderName()}\n`;
    }

    private renderNodeConnection(identationLevel: number = 0): string
    {
        return `${this.startNode.renderConnections()}\n` + this.otherStates.map(node => node.renderConnections(identationLevel)).join('\n') + `${this.endNode.renderConnections()}\n`;
    }
}