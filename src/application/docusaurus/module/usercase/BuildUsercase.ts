import { Graph } from "../../../../graph/graph";
import { UseCaseClass } from "../../../../model/andes/AnalisysTypes";
import { ProjectModuleType, ProjectType } from "../../../../model/andes/ProjectTypes";
import MarkdownFileRender from "../../../../renders/markdown/FileRender";
import GraphRender from "../../../../renders/markdown/mermaid/flowchart/GraphRender";
import { ConnectionTypes } from "../../../../renders/markdown/mermaid/flowchart/MultiEdgeHandler";
import Node from "../../../../renders/markdown/mermaid/flowchart/Node";
import SectionRender from "../../../../renders/markdown/SectionRender";
import TableRender from "../../../../renders/markdown/TableRender";
import UserCaseGraphParser from "./UseCaseGraphParser";


export default class BuildUserCase
{
    static build(module: ProjectModuleType, project: ProjectType): MarkdownFileRender
    {
        const uc = new MarkdownFileRender("Modelo de Caso de Uso");

        const section = new SectionRender("Caso de Uso");

        module.uc.forEach(_uc => {
            const ucSection = new SectionRender(`${_uc.identifier.toUpperCase()}: ${_uc.name}`);

            _uc.event?.forEach((e, index) => {
                const eventSection = new SectionRender(`${e.identifier.toUpperCase()}.${index}: ${e.name}`);
                eventSection.addEnumerablePart(e.action??["Sem ações descritas"]);
                ucSection.addElement(eventSection);
            })

            section.addElement(ucSection);
        })

        const ucGraph = new Graph();

        module.uc.forEach(_uc => {
            ucGraph.addVertex(_uc.identifier, _uc.description??"", _uc.performer?.map(a=>a.identifier)??[]);
        })
        module.uc.forEach(_uc => {
            _uc.depends.forEach(d => ucGraph.addEdge(_uc.identifier, d.identifier));
        })

        section.addSimpleSubsection("Matriz dos Casos de Uso", ucGraph.generateMarkdownTable());
        section.addSimpleSubsection("Matriz de Dependência dos UC", `\n\`\`\`mermaid\n${ucGraph.generateMermaidDiagram()}\n\`\`\``);

        const eventsGraph = new Graph();

        module.uc.forEach(_uc => {
            _uc.event?.forEach(e => {
                eventsGraph.addVertex(e.identifier, e.description??"", e.performer?.map(a => a.identifier)??[])
            })
        })

        module.uc.forEach(_uc => {
            _uc.event?.forEach(e => {
                e.depends?.map(target => eventsGraph.addEdge(e.identifier, target.identifier));
            })
        })

        section.addSimpleSubsection("Matriz dos Eventos", eventsGraph.generateMarkdownTable());
        section.addSimpleSubsection("Matriz de Dependêcia dos Eventos", `\n\`\`\`mermaid\n${eventsGraph.generateMermaidDiagram()}\n\`\`\``);

        uc.add(section);

        // const startSection = BuildUserCase.buildStartSection(module, project);
        // uc.add(startSection);

        // module.uc.forEach(_uc => uc.add(BuildUserCase.buildUsercaseBruteSection(_uc)));
        // const s = BuildUserCase.buildGraphSection(module.uc);

        // uc.add(s);
        // uc.add(BuildUserCase.buildEventDependencie(module))

        // module.uc.map(uc => startSection.addElement(BuildUserCase.buildUsercaseSection(uc)));
        return uc;
    }

    private static buildStartSection(module: ProjectModuleType, project: ProjectType): SectionRender
    {
        const startSection = new SectionRender("Casos de Uso");
        startSection.addSimpleParagraph(`O modelo de Casos de Uso captura e descreve as funcionalidades que o sistema provê a seus atores. No Módulo ${module.name} da plataforma ${project.overview.identifier} foi(ram) identificado(s) ${module.actors.length} ator(es) acessando ${module.uc.length} Casos de Uso, organizados em eventos.`);

        const actorsTable = new TableRender(["Ator", "Descrição"], module.actors.map(a => [a.identifier, a.description??""]), "Lista de Atores e suas Descrições");
        startSection.addElement(actorsTable);

        return startSection;
    }

    private static buildUsercaseSection(uc: UseCaseClass): SectionRender
    {
        const section = new SectionRender(`${uc.identifier}: ${uc.name}`);

        uc.event?.forEach((e, index) => section.addSimpleSubsection(`${e.identifier}.${index}: ${e.name}`, "").addEnumerablePart(e.action??[]))

        return section;
    }

    private static buildEventDependencie(module: ProjectModuleType): SectionRender
    {
        const allEvents = module.uc.map(uc => uc.event).flat().filter(obj => obj != undefined);

        const table = new TableRender(
            ["Evento", "Descrição", "Dependência", "Habilitados", "Atores"],
            allEvents.map(e  => [
                e.identifier,
                e.description??"",
                e.depends?.map(d => d.identifier).join(", ")??"",
                // allEvents.map(ev => ev.depends?.filter(d => d.identifier==e.identifier).map(d=>d.identifier)).filter(_ => _? _.length>0:false).join(", "),
                allEvents.filter(ev => ev.depends?.includes(e)).map(ev => ev.identifier).join(","),
                e.performer?.map(a => a.identifier).join(', ') ?? ''
            ]),
            "Matrix de Dependência de Eventos"
        )



        const graph = new GraphRender("Grafo de dependência entre eventos", allEvents.map(e => {
            const n = new Node(e.identifier, e.name);

            e.depends?.forEach(d => n.addEdge(new Node(d.identifier, ""), ConnectionTypes.APPOINTS_TO, "Depends"));

            return n;
        }))

        const section = new SectionRender("Matriz de Dependência de eventos", [table, graph]);
        
        graph.generateCycleGraph()?.forEach(g => section.addElement(g));

        return section;
    }

    private static buildGraphSection(useCases: UseCaseClass[]): SectionRender
    {
        const section = new SectionRender("Grafos de Dependência");

        const ucGraph = UserCaseGraphParser.ucToGraph(useCases);
        section.addElement(ucGraph);

        const ucCycle = ucGraph.generateCycleGraph();
        if (ucCycle)
            section.addSimpleSubsection("Ciclos entre Casos de Uso", ucCycle.map(g => g.render()).join(""));

        // const evGraph = UserCaseGraphParser.eventToGraph(useCases);
        // section.addElement(evGraph);
        // const evCycle = evGraph.generateCycleGraph();
        // if (evCycle)
        //     section.addSimpleSubsection("Ciclos entre Eventos", evCycle.map(g => g.render()).join(""));

        const graph = new Graph();

        useCases.forEach(uc => {
            uc.event?.forEach(event => {
                graph.addVertex(event.identifier, event.description??"", event.performer?.map(a=>a.identifier)??[]);
            })
        })

        useCases.forEach(uc => {
            uc.event?.forEach(event => {
                event.depends?.forEach(d => graph.addEdge(event.identifier, d.identifier));
            })
        })

        section.addSimpleParagraph('\n```mermaid\n' + graph.generateMermaidDiagram() + '\n```');
        section.addSimpleParagraph(graph.generateMarkdownTable());

        return section;
    }

    private static buildUsercaseBruteSection(uc: UseCaseClass): SectionRender
    {
        const section = new SectionRender(`${uc.identifier}: ${uc.name}`);

        section.addSimpleParagraph(`Descrição: ${uc.description}`);

        if (uc.event? uc.event.length > 0 : false) {
            const headers = ["Evento", "Nome", "Descrição", "Ação", "Executor"];
            const rows: string[][] = uc.event?.map(e => [
                e.identifier,
                e.name,
                e.description??"",
                e.action?.join(", ")??"",
                e.performer?.map(a=>a.identifier).join(', ')??"",
            ])??[];

            const eventTable = new TableRender(headers, rows, "Eventos Associados ao Caso de Uso");
            section.addElement(eventTable);
        } else {
            section.addSimpleParagraph("_Nenhum evento registrado._");
        }

        return section;
    }
}

