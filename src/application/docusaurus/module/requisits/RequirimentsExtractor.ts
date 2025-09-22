import { BuisinessRuleType, FunctionalRequirimentType, NonFunctionalRequirimentType, RequirimentAgregationClass, RequirimentsBaseClass } from "../../../../model/andes/RequirimentsClass";

export interface RequirimentExtracted
{
    fr: FunctionalRequirimentType[];
    nfr: NonFunctionalRequirimentType[];
    br: BuisinessRuleType[]
}

export function compareRequiriments(a: RequirimentsBaseClass, b: RequirimentsBaseClass): number
{
    if(a.identifier > b.identifier)
        { return 1; }
    if(a.identifier < b.identifier)
        { return -1; }

    return 0;
}

export default class RequirimentExtractor
{
    static extract(requiriments: RequirimentAgregationClass): RequirimentExtracted
    {
        const fr = requiriments.fr.sort(compareRequiriments);
        const nfr = requiriments.nfr.sort(compareRequiriments);
        const br = requiriments.br.sort(compareRequiriments);

        return { fr: fr, nfr: nfr, br: br };
    }
}

