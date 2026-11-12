import express from "express"

const app = express()
const porta = 3000

app.get('/', (req, res) => {
  res.send('Servidor Node.js com Express funcionando!')
})


app.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`)
})

app.get('/boas-vindas', (req, res) => {
  res.send('Bem-vindo ao servidor Node.js com Express!')
})

app.get('/status', (req, res) => {
  res.json({ status: 'Servidor online!' })
})

app.get('/escola', (req, res) => {
  res.json({nome: 'Escola Horizonte', cidade: 'Campinas', tipo_instituicao: 'Instituição de ensino fictícia'})
})

app.get('/cursos', (req, res) => {
  res.json([
    { id: 1, nome: 'Informática' },
    { id: 2, nome: 'Administração' },
    { id: 3, nome: 'Arquitetura' }
  ])
})

app.get('/professor', (req, res) => {
  res.json({ nome: 'Mariana Costa', disciplina: 'Arquitetura' })
})

const ajudas = [
    {status: "Status do servidor",
     informacao: "informações importantes",
     cursos: "Ver os cursos disponiveis",
     professor: "Informações sobre o professor"
    }
];


app.get ("/ajuda", (req,res) => {
    res.json (ajudas)
});



const mensagens = [
{ id: 1, usuario: "Ana", texto: "Bom dia!" },
{ id: 2, usuario: "Pedro", texto: "Olá!" },
{ id: 3, usuario: "Maria", texto: "Tudo bem?" },
{ id: 4, usuario: "Lucas", texto: "Como vai?" },
{ id: 5, usuario: "Carla", texto: "Até logo!" }
];
function listarMensagens() { return mensagens; }
app.get("/", (req, res) => res.send("Servidor rodando!"));
app.get("/status", (req, res) => res.json({ status: "online", sprint: 2}));
app.get("/sobre", (req, res) => res.send("Projeto Mensageiro Local"));
app.get("/mensagens", (req, res) => res.json (listarMensagens()));
app.get("/mensagens/:id", (req, res) => {
const mensagem = mensagens.find(m => m.id === Number(req.params.id));
if (!mensagem) return res.status(404).json({ erro: "Não encontrada" });
res.json(mensagem);
});
app.get("/total-mensagens", (req, res) => res.json({ total: mensagens.length}));
app.listen(porta, "0.0.0.0", () => {
console.log(`Servidor em http://localhost:${porta}`); });

function consultar (falhar = false) {
return new Promise((resolve, reject) => {
setTimeout(() => {
falhar
? reject(new Error('Falhou'))
: resolve(mensagens);
}, 1000);
});
}

app.get("/mensagens-async", async (req, res) => {
try {
res.json(await consultar());
} catch (erro) {
res.status(500).json({
erro: "Falha na consulta"
});
}
});

app.get("/mensagens-erro", async (req, res) => {
try {
res.json(await consultar(true));
} catch (erro) {
res.status(500).json({
erro: "Falha simulada"
});
}
});

// — [SPRINT 01 - BASE: Express e ES Modules - mantido da primeira aula] —
import express from "express";

// — [SPRINT 04 - NOVO] —
// Módulo que lê e grava as mensagens em arquivo JSON.
import { lerMensagens, salvarMensagens } from "./store.js";

const app = express();
const PORT = 3000;

// — [SPRINT 01 - ROTAS HERDADAS: /, /status, /sobre] —
// Rotas da Sprint 01 - continuam disponíveis.
app.get("/", (req, res) => res.send("Servidor rodando! 🚀"));
app.get("/status", (req, res) => res.json({ status: "online", sprint: 4 }));
app.get("/sobre", (req, res) => res.send("Mensageiro Local com Node.js, Express e ES Modules."));

// — [SPRINT 04 - ROTAS ALTERADAS PARA USAR ARQUIVOS] —
app.get("/mensagens", async (req, res) => {
  try { res.json(await lerMensagens()); }
  catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Não foi possível ler as mensagens." });
  }
});

app.get("/mensagens/:id", async (req, res) => {
  try {
    const lista = await lerMensagens();
    const mensagem = lista.find(m => m.id === Number(req.params.id));
    if (!mensagem) return res.status(404).json({ erro: "Mensagem não encontrada." });
    res.json(mensagem);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Falha ao consultar mensagem." });
  }
});

app.get("/total-mensagens", async (req, res) => {
  try { res.json({ total: (await lerMensagens()).length }); }
  catch (erro) { res.status(500).json({ erro: "Falha na contagem." }); }
});

// Rota TEMPORÁRIA: apenas para aprender escrita em arquivo.
// GET não deve modificar dados numa API real; será removida na Sprint 05.
app.get("/exemplo-salvar", async (req, res) => {
  try {
    const lista = await lerMensagens();
    lista.push({ id: Date.now(), usuario: "Exemplo", texto: "Gravado em arquivo!" });
    await salvarMensagens(lista);
    res.json({ aviso: "Exemplo didatico gravado", total: lista.length });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao gravar arquivo." });
  }
});

// GET modifica dados somente para esta demonstração; em uma API real, use POST.
let filaGravacoes = Promise.resolve();
app.get("/gravar-mensagem-correta", (req, res) => {
    const tarefa = filaGravacoes.then(async () => {
        const lista = await lerMensagens();
        const id = lista.reduce((maior, mensagem) => Math.max(maior, Number(mensagem.id) || 0), 0) + 1;
        const mensagem = { id, usuario: "Exemplo", texto: "Gravando em arquivo!"};
        await salvarMensagens([...lista, mensagem]);
        return { aviso: "Mensagem gravada com sucesso!", mensagem, total: lista.length + 1 };
    });
    filaGravacoes = tarefa.catch(() => {});
    tarefa.then(resulta => res.json(resultado)).catch(erro => {
        console.error(erro);
        res.status(500).json({ erro: "Erro ao gravar arquivo." });
    });
});

// — [SPRINT 01 - SERVIDOR: iniciado na porta 3000; mantido ao longo das aulas] —
app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
}); 
