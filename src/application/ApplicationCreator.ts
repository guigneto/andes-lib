import { PathLike } from "fs"
import createFolderAndFile from "./IO";
import { DocusaurusProjectCreator } from "./DocusaurusCreator";
import { ProjectModuleType, ProjectType } from "../model/andes/ProjectTypes";
import SparkFileRender from "../renders/dsl/spark/SparkFileRender";
import MadeFileRender from "../renders/dsl/made/MadeFileRender";


export default class ApplicationCreator
{
    private project: ProjectType;
    private targetFolder: PathLike;

    public constructor(project: ProjectType, targetFolder: PathLike)
    {
        this.project = project;
        this.targetFolder = `${targetFolder}/artifacts`;
    }

    public create(): void
    {
        this.createSpark();
        this.createDocusaurus();
        this.createMade();
    }

    private createSpark(): void
    {
        const spark = new SparkFileRender(this.project);
        createFolderAndFile(this.targetFolder, `${this.project.overview.name}.spark`, spark.render());
    }

    private createDocusaurus(): void
    {

        const docusaurus = new DocusaurusProjectCreator(this.project, `${this.targetFolder}/documentation`);

        docusaurus.create();
    }

    private createMade(): void
    {
        this.project.modules.forEach(module => this.createMadeModule(module));
    }

    private createMadeModule(module: ProjectModuleType): void
    {
        const made = new MadeFileRender(module);

        createFolderAndFile(`${this.targetFolder}`, `${module.identifier}.made`, made.render());
    }
}

