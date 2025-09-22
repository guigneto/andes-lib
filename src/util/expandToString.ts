// SNLE (String Null or Empty): valores nulos ou indefinidos
// EOL (End Of Line): representa uma quebra de linha (\n)
const SNLE = '$$SNLE$$'; 
const EOL = '\n'; 

const NEWLINE_REGEXP = /\r?\n/;

function toString(value: unknown): string {
    if (value === undefined || value === null) {
        return SNLE;
    }
    if (typeof value === 'string') {
        return value;
    }
    if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
        return String(value);
    }
    if (value instanceof Error) {
        return value.message;
    }
    if (typeof value === 'object') {
        try {
            return JSON.stringify(value);
        } catch {
            return Object.prototype.toString.call(value);
        }
    }
    return SNLE;
}

// substitution: texto que vamos adicionar
// current: texto que já temos
// align: essa função "alinha o texto"
function align(substitution: string, current: string): string {
    if (substitution === SNLE) {
        return SNLE;
    }
    const lines = current.split(NEWLINE_REGEXP);
    const lastLine = lines[lines.length - 1];
    const indent = lastLine.match(/^\s*/)?.[0] ?? '';
    return substitution.replace(/\n/g, '\n' + indent);
}

// findIndentation: encontra a menor identação (qnt de espaços à esquerda)
function findIndentation(lines: string[]): number {
    let indent = Infinity;
    for (const line of lines) {
        if (line.trim().length === 0) {
            continue;
        }
        // lineIndent: identação que encontramos na linha atual
        const lineIndent = line.match(/^\s*/)?.[0].length ?? 0; // mede qnts espaços tem no início da linha
        if (lineIndent < indent) {
            indent = lineIndent;
        }
        if (indent === 0) {
            break;
        }
    }
    // se nenhuma linha válida foi encontrada, retorna 0,
    // caso contrário, retorna a menor indentação encontrada
    return indent === Infinity ? 0 : indent;
}

// lineSep: separador de linha
// staticParts: partes estáticas do template (strings entre as partes dinâmicas)
// substitutions: valores dinâmicos inseridos no meio do template
function internalExpandToString(lineSep: string, staticParts: TemplateStringsArray, ...substitutions: unknown[]): string {
    let lines = substitutions
        .reduce((acc: string, subst: unknown, i: number) => acc + (subst === undefined ? SNLE : align(toString(subst), acc)) + (staticParts[i + 1] ?? ''), staticParts[0])
        .split(NEWLINE_REGEXP)
        .filter(l => l.trim() !== SNLE)
        .map(l => l.replace(SNLE, '').trimEnd());

    const containsLeadingLinebreak = lines.length > 1 && lines[0].trim().length === 0;
    lines = containsLeadingLinebreak ? lines.slice(1) : lines;

    const containsTrailingLinebreak = lines.length !== 0 && lines[lines.length-1].trimEnd().length === 0;
    lines = containsTrailingLinebreak ? lines.slice(0, lines.length-1) : lines;

    const indent = findIndentation(lines);
    return lines
        .map(line => line.slice(indent).trimEnd())
        .join(lineSep);
}


export function expandToString(staticParts: TemplateStringsArray, ...substitutions: unknown[]): string {
    return internalExpandToString(EOL, staticParts, ...substitutions);
}

export function expandWithNewLines(staticParts: TemplateStringsArray, ...substitutions: unknown[]): string {
    return expandToString(staticParts, ...substitutions) + EOL;
}