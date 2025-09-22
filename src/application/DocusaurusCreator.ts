import { PathLike } from "fs";
import { ModuleCreator } from "./docusaurus/module/ModuleCreator";
import { ProjectType } from "../model/andes/ProjectTypes";


export class DocusaurusProjectCreator
{
    private projectReference: ProjectType;
    private targetFolder: PathLike;

    public constructor(projectReference: ProjectType, targetFolder: PathLike)
    {
        this.projectReference = projectReference;
        this.targetFolder = `${targetFolder}`;
    }

    public create()
    {
        this.buildModules();
    }

    private buildModules(): void
    {
        const module = new ModuleCreator(null, this.projectReference, this.targetFolder);
        this.projectReference.modules.forEach(m => module.changeModule(m).create())
    }
}

