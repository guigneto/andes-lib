import fs from "fs";
import path from 'path';
import { LocalEntity, Model, Module, Relation, isEnumX, isImportedEntity, isLocalEntity, isManyToMany, isManyToOne, isModule, isOneToOne } from "../../model/models";
import { base_ident } from "../../util/generator-utils";
import { expandWithNewLines } from "../../util/expandToString";

export class DiagramGeneratorService {
    private model: Model;
    private targetFolder: string;

    constructor(model: Model, targetFolder: string) {
        this.model = model;
        this.targetFolder = targetFolder;
    } 

    public generate(): void {
        this.CreateModuloEstrutural()
        const modules = this.model.modules;
        
        for (const module of modules) {
            // Define o caminho do arquivo diretamente na pasta targetFolder, sem criar uma nova pasta
            const filePath = path.join(this.targetFolder, "classdiagram.puml");
            fs.writeFileSync(filePath, this.createClassDiagram(module));
        }
    }

    private createClassDiagram(module: Module): string {
        const enums = module.enumXs
        const entities = module.localEntityes;

        return expandWithNewLines`
            @startuml ${module.name}
                ${enums.flatMap(e =>[`enum ${e.name} { \n ${e.attributes.map(a => `${base_ident}${a.name}`).join(`\n`)}\n}`]).join(`\n`)}
                ${entities.map(e => this.entityClassDiagram(e, module)).join(`\n`)}
            @enduml`;
    }

    private entityClassDiagram(entity: LocalEntity, module: Module): string {
        const lines = [
            `class ${entity.name} ${entity.superType ? isImportedEntity(entity.superType) ? `<< ${entity.superType.name}>>` : `` : ``}{`,
            ...entity.attributes.map(a => `${a.type}: ${a.name}`),
            ``,
            ...entity.relations.filter(r => !isManyToMany(r)).map(r => `${r.type.name}: ${r.name.toLowerCase()}`),
            `}`,
            entity.superType ? `\n${entity.superType.name} <|-- ${entity.name}\n` : '',
            entity.enumentityatributes.map(a => `${entity.name} "1" -- "1" ${a.type.name} : ${a.name.toLowerCase()}>`),
            ...entity.relations.filter(r => !isManyToOne(r)).map(r => this.relationDiagram(r, entity, module)),
            ``
        ];

        return lines.join('\n');
    }

    private relationDiagram(relation: Relation, entity: LocalEntity, module: Module): string {
        const targetCardinality = isOneToOne(relation) ? "1" : "0..*";
        const sourceCardinality = isManyToMany(relation) ? "0..*" : "1";
        const originModule = relation.type.$container.name?.toLowerCase() !== module.name?.toLowerCase() ? `${relation.type.$container.name}.` : "";

        return `${entity.name} "${sourceCardinality}" -- "${targetCardinality}" ${originModule}${relation.type.name} : ${relation.name.toLowerCase()} >`;
    }

    
    private CreateModuloEstrutural(){
    
        const useCases = this.model.modules

        const value = `---
    sidebar_position: 4
    ---
    # Modelo Estrutural
    ${useCases.map(usecase=> this.createUseCaseContain(usecase)).join('\n')}
    `      
    fs.writeFileSync(path.join(this.targetFolder , `modeloestrutural.md`), value)

    }
    
    private createUseCaseContain(modulo: Module):string {
        
        return expandWithNewLines`
        ${modulo.description}
        `
    }
}
