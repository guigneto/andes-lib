import { EntityType } from "../../../model/spark/EntityTypes";
import { EnumEntityType } from "../../../model/spark/EnumTypes";
import { PackageType } from "../../../model/spark/PackageTypes";
import IRender from "../../IRender";
import NameSpaceRender from "../NameSpaceRender";
import SparkEntityRender from "./SparkEntytiRender";
import SparkEnumEntityRender from "./SparkEnumEntityRender";


export default class SparkPackageRender extends NameSpaceRender
{
    private enums: SparkEnumEntityRender[];
    private submodules: SparkPackageRender[];

    public constructor(pkg: PackageType)
    {
        super("module", pkg.identifier, []);
        this.enums = [];
        this.submodules = [];

        pkg.entities.forEach(e => this.addEntity(e));
        pkg.enums?.forEach(e => this.addEnum(e));
        pkg.subPackage?.forEach(sb => this.addSubPackage(sb));
    }

    public addEnum(entity: EnumEntityType)
    {
        const e = new SparkEnumEntityRender(entity);
        this.enums.push(e);
    }

    public addEntity(entity: EntityType)
    {
        const e = new SparkEntityRender(entity);
        this.items.push(e);        
    }

    public addSubPackage(subPackage: PackageType)
    {
        this.submodules.push(new SparkPackageRender(subPackage));
    }

    protected override listAll(): IRender[]
    {
        return [...this.items, ...this.enums, ...this.submodules];
    }
}

