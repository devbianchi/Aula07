import fs from 'fs/promises'
import path from 'path'

export async function log(message: string): Promise<void> {
    const arquivo = path.join("src", "logs", "app.log")
    const pasta = path.join("src", "logs");
    const timestamp = new Date().toISOString();
    const mensagem = ("[" + timestamp + "] " + message + "\n");

    await fs.mkdir(pasta, {recursive: true});
    await fs.appendFile(arquivo, mensagem);
}

export async function lerLogs(): Promise<string[]> {
    const caminho = path.join("src", "logs", "app.log");
    try {
        const ler = await fs.readFile(caminho, "utf-8");
        const paraArray: string[] = ler
        .split("\n")
        .map(linha => linha.trim())
        .filter(Boolean);
        return paraArray;
    } catch (error) {
        return [];
    }
}


