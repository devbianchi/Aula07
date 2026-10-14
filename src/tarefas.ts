import fs from "fs/promises";

interface Tarefa { id: number; titulo: string; concluida: boolean; }

export async function lerTarefas(caminho: string): Promise<Tarefa[]> {
  try {
    const dados = await fs.readFile(caminho, "utf-8");
    return JSON.parse(dados);
  } catch {
    return [];   // arquivo ainda não existe
  }
}

async function salvarTarefas(caminho: string, tarefas: Tarefa[]): Promise<void> {
  await fs.writeFile(caminho, JSON.stringify(tarefas, null, 2), "utf-8");
}

export async function adicionar(caminho: string, titulo: string): Promise<Tarefa> {
  const tarefas = await lerTarefas(caminho);
  const nova: Tarefa = { id: tarefas.length + 1, titulo, concluida: false };
  tarefas.push(nova);
  await salvarTarefas(caminho, tarefas);
  return nova;
}

export async function concluir(id: number, caminho: string): Promise<Tarefa | null> {
    const tarefas = await lerTarefas(caminho);
    const tarefaConcluida = tarefas.find(tarefa => tarefa.id === id);

    if (!tarefaConcluida) {
        return null;
    }

    tarefaConcluida.concluida = true;
    await salvarTarefas(caminho, tarefas);
    return tarefaConcluida;
}

export async function remover(id: number, caminho: string): Promise<Tarefa | null> {
    const tarefas = await lerTarefas(caminho);
    const tarefaRemovida = tarefas.find(tarefa => tarefa.id === id);

    if (!tarefaRemovida) {
        return null;
    }

    const novaListaTarefas = tarefas.filter(tarefa => tarefa !== tarefaRemovida);
    await salvarTarefas(caminho, novaListaTarefas);
    return tarefaRemovida;
}

async function buscarComSeguranca(caminho: string): Promise<string | null> {
    try {
        const dados = await fs.readFile(caminho, "utf-8");
        return dados;
    } catch {
        return null;
    }
}
