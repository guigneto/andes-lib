import { PackageType } from "../../../../model/spark/PackageTypes";
import { EntityType } from "../../../../model/spark/EntityTypes";
import MarkdownFileRender from "../../../../renders/markdown/FileRender";
import ClassDiagramRender from "../../../../renders/markdown/plantuml/classDiagram.ts/ClassDiagramRender";
import ClassRender from "../../../../renders/markdown/plantuml/classDiagram.ts/ClassRender";
import SectionRender from "../../../../renders/markdown/SectionRender";
import EnumRender from "../../../../renders/markdown/plantuml/classDiagram.ts/EnumRender";
import IRender from "../../../../renders/IRender";
import TableRender from "../../../../renders/markdown/TableRender";
import { VisibilityOptions } from "../../../../renders/markdown/plantuml/classDiagram.ts/VisibilityOptions";

export default class BuildDomain
{
    static buildDomainDiagram(_package: PackageType): MarkdownFileRender
    {
        const domain = new MarkdownFileRender("Domain");

        const classes = BuildDomain.packageToMermaid(_package);
        const diagram = new ClassDiagramRender(classes);

       domain.addSimpleSection("Diagrama de Domínio", diagram.render());
       domain.add(BuildDomain.packageDescription(_package)) 
       return domain;
    }

    private static packageToMermaid(pkg: PackageType): IRender[]
    {
        const entities = pkg.entities.map(entity => new ClassRender(entity));
        const enums = pkg.enums?.map(e => new EnumRender(e))??[];

        return [...entities, ...enums];
    }

    private static packageDescription (pkg: PackageType): SectionRender{
        const section = new SectionRender(pkg.identifier);
        pkg.entities.forEach(e => section.addElement(BuildDomain.classDecription(e)))
        return section;
    }

    private static classDecription(cls: EntityType): SectionRender
    {
        const section = new SectionRender(cls.identifier);
        section.addSimpleParagraph(`Descrição: ${cls.description??"Classe Sem Descrição"}`);

        const table = new TableRender(["Nome", "Descrição", "Meta Dados", "Visibilidade"],
            cls.attributes?.map(attr => [attr.identifier, attr.description??"", "`"+`${attr.type} min: ${attr.min??"*"} max: ${attr.max??"*"} unique: ${attr.unique} blank: ${attr.blank}`+"`", "Public"]),
            `atributos da entidade ${cls.identifier}`
        )

        section.addElement(table);

        return section;
    }
}   


