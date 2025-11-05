import { PathLike } from "fs";
import createFolderAndFile from "./IO";
import type { ProjectType } from "../model/andes/ProjectTypes";
import BuildDomain from "./docusaurus/module/domain/BuildDomain";

export default class ClassDiagramCreator
{
    private project: ProjectType;
    private targetFolder: PathLike;

    public constructor(project: ProjectType, targetFolder: PathLike)
    {
        this.project = project;
        this.targetFolder = `${targetFolder}/artifacts/diagrams`;
    }

    public create(): void
    {
        this.project.modules.forEach(module => this.createModuleDiagrams(module));
    }

    private createModuleDiagrams(module: any): void
    {
        if(!module.packages || module.packages.length === 0)
        {
            return;
        }

        module.packages.forEach((pkg: any) => {
            try {
                const md = BuildDomain.buildDomainDiagram(pkg);
                const fileName = `${module.identifier ?? module.name}-${pkg.identifier}-Domain.md`;
                createFolderAndFile(this.targetFolder, fileName, md.render(0));
            }
            catch(e)
            {
                // swallow to avoid breaking whole generation; could log
            }
        });
    }
}