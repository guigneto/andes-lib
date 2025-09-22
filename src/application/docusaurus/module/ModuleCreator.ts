import { PathLike } from "fs";
import { BuildModulePourpuse } from "./propourse/BuildMoudulePourpuse";
import BuildRequisites from "./requisits/BuildRequisites";
import MarkdownFileRender from "../../../renders/markdown/FileRender";
import createFolderAndFile from "../../IO";
import BuildDomain from "./domain/BuildDomain";
import BuildUserCase from "./usercase/BuildUsercase";
import { ProjectModuleType, ProjectType } from "../../../model/andes/ProjectTypes";


export class ModuleCreator
{
    private projectRef: ProjectType;
    private module: ProjectModuleType | null;
    private originalPath: PathLike;
    private targetFolder: PathLike;

    private modulePropourse: MarkdownFileRender| null = null;
    private moduleRequisites: MarkdownFileRender | null = null;
    private moduleUserCases: MarkdownFileRender | null = null;
    private moduleDomainModel: MarkdownFileRender | null = null;
    // private moduleStatesMachines: MarkdownFileRender | null = null;
    
    public constructor(module: ProjectModuleType | null = null, projectRef: ProjectType, targetFolder: PathLike = "")
    {
        this.projectRef = projectRef;
        this.module = module;
        this.originalPath = targetFolder;
        this.targetFolder = `${targetFolder}/${module ? module.name : ''}`;
    }

    public changeModule(newModule: ProjectModuleType): ModuleCreator
    {
        this.module = newModule;
        this.targetFolder = `${this.originalPath}/${this.module.name}`;

        return this;
    }

    public create()
    {
        if(this.module == null)
            { return; }
        this.modulePropourse = BuildModulePourpuse.buildModuleProporse(this.module);
        this.moduleRequisites = BuildRequisites.buildModuleRequisites(this.module);
        this.moduleDomainModel = BuildDomain.buildDomainDiagram(this.module.packages[0]);
        this.moduleUserCases = this.buildModuleUserCase(this.module);
        // this.moduleStatesMachines = this.buildModuleStatesMachine();
        createFolderAndFile(this.targetFolder, `ModulePropourse.md`, this.modulePropourse.render(0));
        createFolderAndFile(this.targetFolder, `Requisites.md`, this.moduleRequisites.render(1));
        createFolderAndFile(this.targetFolder, `UserCase.md`, this.moduleUserCases.render(2));
        createFolderAndFile(this.targetFolder, `ModuleDomain.md`, this.moduleDomainModel.render(3));
        // createFolderAndFile(this.targetFolder, `ModuleStatesMachine.md`, this.moduleStatesMachines.render(4));
    }

    private buildModuleUserCase(module: ProjectModuleType): MarkdownFileRender
    {
        return BuildUserCase.build(module, this.projectRef);
    }

    // private buildModuleStatesMachine(): MarkdownFileRender
    // {

    // }
}

