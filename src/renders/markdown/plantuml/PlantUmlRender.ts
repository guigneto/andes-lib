import IRender from "../../IRender";

export default abstract class PlantUmlRender implements IRender
{
    public constructor()
        { }

    public render(identationLevel: number = 0): string
    {
        return "```plantuml\n@startuml\n" + this.pumlRender(identationLevel) + "\n@enduml\n```"; 
    }

    public abstract pumlRender(identationLevel: number): string;
}

