import { Graph } from "../../../../graph/graph";
import { UseCaseClass } from "../../../../model/andes/AnalisysTypes";
import { ProjectModuleType } from "../../../../model/andes/ProjectTypes";
import { BuisinessRuleType, FunctionalRequirimentType, NonFunctionalRequirimentType, RequirimentsBaseClass } from "../../../../model/andes/RequirimentsClass";
import { DependableSuperType } from "../../../../model/supertypes";
import IRender from "../../../../renders/IRender";
import MarkdownFileRender from "../../../../renders/markdown/FileRender";
import SectionRender from "../../../../renders/markdown/SectionRender";
import TableRender from "../../../../renders/markdown/TableRender";
import GraphParser from "./GraphParser";
import RequirimentExtractor, { RequirimentExtracted } from "./RequirimentsExtractor";
import TableParser from "./TableParser";



export function parseGraph(i: RequirimentsBaseClass[]): Graph
{
    const graph = new Graph();

    i.forEach(r => graph.addVertex(r.identifier, r.description??"", []));
    i.forEach(r => r.depends.forEach(d => graph.addEdge(r.identifier, d.identifier)));

    return graph;
}

export default class BuildRequisites
{
    static buildModuleRequisites(module: ProjectModuleType): MarkdownFileRender
    {
        const requisites = new MarkdownFileRender("Requisitos do Módulo");
        const r = RequirimentExtractor.extract(module.requisites);

        // BuildRequisites.buildFR(requisites, r.fr);
        // BuildRequisites.buildNFR(requisites, r.nfr);
        // BuildRequisites.buildBR(requisites, r.br);
        // BuildRequisites.buildDependenciesSection(requisites, r);

        const frGraph = parseGraph(r.fr);
        const nfrGraph = parseGraph(r.nfr);
        const brGraph = parseGraph(r.br);

        requisites.addSimpleSection("Requisitos Funcionais", frGraph.generateMarkdownTable());
        requisites.addSimpleSection("Requisitos Não Funcionais", nfrGraph.generateMarkdownTable());
        requisites.addSimpleSection("Regras de Negócio", brGraph.generateMarkdownTable());

        const s = new SectionRender("Grafos de Dependências");
        s.addSimpleSubsection("Requisitos Funcionais", `\n\`\`\`mermaid\n${frGraph.generateMermaidDiagram()}\n\`\`\``)
        s.addSimpleSubsection("Requisitos Nao Funcionais", `\n\`\`\`mermaid\n${nfrGraph.generateMermaidDiagram()}\n\`\`\``)
        s.addSimpleSubsection("Regras de Negócio", `\n\`\`\`mermaid\n${brGraph.generateMermaidDiagram()}\n\`\`\``)

        requisites.add(s);

        // module.uc.forEach(uc => requisites.add(BuildRequisites.buildUsercaseSection(uc)));
        // BuildRequisites.buildGraphSection(module.uc);

        // requisites.add(BuildRequisites.buildEventDependencie(module));

        return requisites;
    }

    private static buildFR(rFile: MarkdownFileRender, fr: FunctionalRequirimentType[])
    {
        const frTable = TableParser.frToTable(fr);
        rFile.addSimpleTableSection("Requisitos Funcionais", frTable);
    }

    private static buildNFR(rFile: MarkdownFileRender, nfr: NonFunctionalRequirimentType[])
    {
        const nfrTable = TableParser.nfrToTalbe(nfr);
        rFile.addSimpleTableSection("Requisitos Não Funcionais", nfrTable);
    }

    private static buildBR(rFile: MarkdownFileRender, br: BuisinessRuleType[])
    {
        const brTable = TableParser.brToTalbe(br);
        rFile.addSimpleTableSection("Regras de Negócio", brTable);
    }

    private static buildDependenciesSection(rFile: MarkdownFileRender, r: RequirimentExtracted)
    {
        const frGraph = GraphParser.frToGraph(r.fr);
        const frCycleGraph = frGraph.generateCycleGraph();

        const dependenciaSection = new SectionRender("Grafo de Dependências", [frGraph]);
        if(frCycleGraph != null)
            { dependenciaSection.addSimpleSubsection("Ciclo entre dependências", frCycleGraph.map(cycle => cycle.render()).join("")); }

        rFile.add(dependenciaSection);
    }
}

