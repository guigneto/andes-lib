import { ProjectModuleType } from "../../../../model/andes/ProjectTypes";
import MarkdownFileRender from "../../../../renders/markdown/FileRender";


export class BuildModulePourpuse
{
    static buildModuleProporse(module: ProjectModuleType): MarkdownFileRender
    {
        let porpourse = new MarkdownFileRender("Proósito do Módulo");
        porpourse.addSimpleSection("Propósito", module.purpose);
        porpourse.addSimpleSection("Minimundo", module.miniwolrd);

        return porpourse;
    }
}

