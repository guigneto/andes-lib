import IRender from "../../../IRender";
import PlantUmlRender from "../PlantUmlRender";
import ClassRender from "./ClassRender";

export default class ClassDiagramRender extends PlantUmlRender
{
    private objects: IRender[];
    
    public constructor(objects: IRender[] = [])
    {
        super();
        this.objects = objects;
    }

    public pumlRender(identationLevel: number = 0): string
    {
        const objetos =this.objects.map(obj => obj.render(identationLevel+1)).join("\n")
        const dependencies = this.objects.filter(obj => obj instanceof ClassRender).map(obj => obj.renderRelations(identationLevel+1)).join('\n')
        return `${objetos}\n${dependencies}`;
    }
}