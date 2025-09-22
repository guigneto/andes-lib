import { ProjectType } from "../../../model/andes/ProjectTypes";
import IRender from "../../IRender";
import SparkConfigRender from "./SparkConfigRender";
import SparkPackageRender from "./SparkPackageRender";

export default class SparkFileRender implements IRender
{
    private config: SparkConfigRender;
    private modules: SparkPackageRender[];

    public constructor(project: ProjectType)
    {
        this.config = new SparkConfigRender(project.overview);
        this.modules = [];

        project.modules.forEach(m => m.packages.forEach(p => this.modules.push(new SparkPackageRender(p))));
    }

    public render(identationStartLevel: number = 0): string
    {
        return `${this.config.render()}\n${this.modules.map(m=>m.render()).join('\n')}`;
    }
}

