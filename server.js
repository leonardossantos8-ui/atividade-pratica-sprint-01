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