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
