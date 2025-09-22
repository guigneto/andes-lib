import { BuisinessRuleType, FunctionalRequirimentType, NonFunctionalRequirimentType } from "../../../../model/andes/RequirimentsClass";
import TableRender from "../../../../renders/markdown/TableRender";

const functionalRequirimentsTableHeaders = ["ID", "Nome", "Descrição", "Dependências", "Prioridade"];
const nonFunctionalRequirimentsTableHeaders = ["ID", "Nome", "Descrição", "Dependências", "Prioridade"];
const buisinesRuleTableHeaders = ["ID", "Nome", "Descrição", "Dependências", "Prioridade"];


export default class TableParser
{
    static frToTable(frs: FunctionalRequirimentType[]): TableRender
    {
        return new TableRender(
            functionalRequirimentsTableHeaders,
            frs.map(fr => [
                fr.identifier,
                fr.name,
                fr.description??"",
                TableParser.ptBrMultiJoin(fr.depends.map(dep => dep.identifier)),
                fr.priority
            ]),
            "Requisitos Funcionais do Módulo"
        )
    }

    static nfrToTalbe(nfrs: NonFunctionalRequirimentType[]): TableRender
    {
        return new TableRender(
            nonFunctionalRequirimentsTableHeaders,
            nfrs.map(nfr => [nfr.identifier, 
                nfr.name, 
                nfr.description??"",
                TableParser.ptBrMultiJoin(nfr.depends.map(dep => dep.identifier)),
                nfr.priority]),
            "Requisitos Não Funcionais do Módulo"
        )
    }

    static brToTalbe(brs: BuisinessRuleType[]): TableRender
    {
        return new TableRender(
            buisinesRuleTableHeaders,
            brs.map(br => [br.identifier, 
            br.name, 
            br.description??"",
            TableParser.ptBrMultiJoin(br.depends.map(dep => dep.identifier)),
            br.priority]),
            "Regras de Negócio do Módulo"
        )
    }

    private static ptBrMultiJoin(strs: string[]): string
    {
        let lastStr = strs.pop();
        if(lastStr == undefined)
            { return ""; }
        if(strs.length <= 0)
            { return lastStr; }

        let completeStr = `${strs.join(',')} e ${lastStr}`;
        strs.push(lastStr); 
        
        return completeStr;
    }
}

