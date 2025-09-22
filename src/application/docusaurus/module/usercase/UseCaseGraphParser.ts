import { EventType, UseCaseClass } from "../../../../model/andes/AnalisysTypes";
import GraphRender from "../../../../renders/markdown/mermaid/flowchart/GraphRender";
import { ConnectionTypes } from "../../../../renders/markdown/mermaid/flowchart/MultiEdgeHandler";
import Node from "../../../../renders/markdown/mermaid/flowchart/Node";

export default class UserCaseGraphParser {

    static ucToGraph(useCases: UseCaseClass[]): GraphRender {
        const nodes: Node[] = [];
        useCases.forEach(uc => this.addUseCaseAsNode(nodes, uc));

        return new GraphRender(
            "Dependência entre Casos de Uso",
            nodes,
            "Grafo esquematizado das dependências entre os casos de uso"
        );
    }

    static eventToGraph(useCases: UseCaseClass[]): GraphRender {
        const nodes: Node[] = [];
        useCases.forEach(uc => {
            uc.event?.forEach(ev => this.addEventAsNode(nodes, ev));
        });

        return new GraphRender(
            "Dependência entre Eventos",
            nodes,
            "Grafo esquematizado das dependências entre os eventos dos casos de uso"
        );
    }

    private static addUseCaseAsNode(nodes: Node[], uc: UseCaseClass): Node {
        let existing = this.findNode(nodes, uc.identifier);
        if (existing) return existing;

        const node = new Node(uc.identifier, uc.name);
        nodes.push(node);

        uc.depends.forEach(dep => {
            const depNode = this.addUseCaseAsNode(nodes, dep);
            node.addEdge(depNode, ConnectionTypes.APPOINTS_TO, "depends");
        });

        return node;
    }

    private static addEventAsNode(nodes: Node[], ev: EventType): Node {
        let existing = this.findNode(nodes, ev.identifier);
        if (existing) return existing;

        const node = new Node(ev.identifier, ev.name);
        nodes.push(node);

        ev.depends?.forEach(dep => {
            if ('identifier' in dep && 'name' in dep) {
                const depNode = this.addEventAsNode(nodes, dep as EventType);
                node.addEdge(depNode, ConnectionTypes.APPOINTS_TO, "depends");
            }
        });

        return node;
    }

    private static findNode(nodes: Node[], identifier: string): Node | undefined {
        return nodes.find(n => n.getIdentifier() === identifier);
    }
}
