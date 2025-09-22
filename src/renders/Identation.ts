/**
 * @function identate -> essa função adiciona o caracter '\t' (tab) para identar string no texto.
 * @param times -> número inteiro de quantos tab serão adicionados 
 * @returns uma string somente com a quantidade de tabs solicitada.
 */
export function identate(times: number = 0): string
{
    return '\t'.repeat(times);
}

