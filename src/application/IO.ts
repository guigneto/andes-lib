import { mkdirSync, PathLike, writeFileSync } from "fs";


export default function createFolderAndFile(targetFolder: PathLike, fileName: string, fileContent: string): void
{
    mkdirSync(targetFolder, {recursive: true});
    writeFileSync(`${targetFolder}/${fileName}`, fileContent);
}

