import ParagraphRender from "../../ParagraphRender";
import MermaidRender from "../MermaidRender";
import { ConnectionTypes } from "./MultiEdgeHandler";
import Node from "./Node";


export default class GraphRender extends MermaidRender
{
    private static numeration: number = 1;

    private name: string;
    private nodes: Node[];

    public constructor(name: string, nodes: Node[], description: string = "", author: string = "Autoria Própria")
    {
        super("Grafo de Fluxo", description, author, GraphRender.numeration);
        this.name = name;
        this.author = author;
        this.nodes = nodes;

        GraphRender.numeration++;
    }

    public mermaidRender(identationStartLevel: number = 0): string
    {
        let title = `---\ntitle: ${this.name}\n---`;
        let body = `graph LR\n${this.renderNodesName(1)}\n${this.renderNodeConnection(1)}`;

        return `\n${title}\n${body}\n`;    
    }

    public addNode(node: Node)
    {
        this.nodes.push(node);
    }

    private renderNodesName(identationLevel: number = 0): string
    {
        return this.nodes.map(node => node.renderName(identationLevel)).join('\n');
    }

    private renderNodeConnection(identationLevel: number = 0): string
    {
        return this.nodes.map(node => node.renderConnections(identationLevel)).join('\n');
    }

    generateCycleGraph(): GraphRender[] | null
    {
        const graphs: GraphRender[] = [];
        const cycles: Node[][] = [];

        for (let node of this.nodes)
            { this.cycleIn(node, cycles); }
        if(cycles.length == 0)
            { return null; }

        cycles.forEach(cycle =>{
            let newCycle: Node[] = [];
            for(let i = 0; i < cycle.length-1; i++)
            {
                const currentNode = cycle[i].cloneEmptyEdges();
                const nextNode = cycle[(i + 1) % cycle.length];
                currentNode.addEdge(nextNode, ConnectionTypes.APPOINTS_TO, "depends");
                newCycle.push(currentNode);
            }

            graphs.push(new GraphRender(`Grafo de Ciclos (${this.name})`, newCycle, `Grafo que contém um dos ciclos encontrados no grafo ${this.name}`))
        })

        return graphs;
    }

    private cycleIn(n: Node, cycles: Node[][]): void
    {
        const visited: Node[] = [];
        const notVisited: Node[] = [];
        const stackTrace: Node[] = [];

        let current: Node | null = n;

        while (current !== null)
        {
            let adds = 0;
            stackTrace.push(current);

            if (!visited.includes(current))
                { visited.push(current); }

            for (let e of current.getDependsEdges())
            {
                if (e.compareTo(n))
                {
                    // Achou um Ciclo
                    stackTrace.push(e);

                    if (cycles.length === 0) // caso base
                        { cycles.push(stackTrace.slice()); }
                    else
                    {
                        let onlyHaveSize = true;
                        for (let cycle of cycles)
                        {
                            if (cycle.length === stackTrace.length)
                            {
                                onlyHaveSize = false;
                                for (let osn of cycle)
                                {
                                    if(cycle.find(obj => obj.compareTo(osn)) == undefined)
                                    {
                                        cycles.push(stackTrace.slice());
                                        break;
                                    }
                                }
                            }
                        }
                        if (onlyHaveSize)
                            { cycles.push(stackTrace.slice()); }
                    }
                    stackTrace.pop();
                }
                if (!visited.includes(e) && !notVisited.includes(e))
                {
                    notVisited.push(e);
                    adds++;
                }
            }

            if (adds === 0)
                { stackTrace.pop(); }

            try { current = notVisited.pop() || null; }
            catch (e) { current = null; }
        }
    }
}

