import express from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express();

// Necessário para lidar com JSON no corpo da requisição
app.use(express.json()); 

// 1) Rota Criar
app.post('/usuarios', async (request, response) => {
    // Salvar os usuários dentro da variável users
    await prisma.user.create({
        data: {
            email: request.body.email,
            name: request.body.name,
            age: request.body.age
        }
    });

    // Retornar uma resposta de status 201 = sucesso e criei o que você pediu para eu criar + mostra o usuário criado
    response.status(201).json(request.body);
});

// 2) Rota Listar
app.get('/usuarios', async (request, response) => {

    let users = []

    if (request.query) {
        users = await prisma.user.findMany({
            where: {
                name: request.query.name,
                email: request.query.email,
                age: request.query.age
            }
        })
    } else {
        users = await prisma.user.findMany();
    }

    // Retornar uma lista com todos os usuários
    response.status(200).json(users);
});

// 3) Rota Editar
app.put('/usuarios/:id', async (request, response) => {
    // editar os usuários 
    await prisma.user.update({
        where: {
            id: request.params.id
        },
        data: {
            email: request.body.email,
            name: request.body.name,
            age: request.body.age
        }
    });

    // Retornar uma resposta de status 201 = sucesso e criei o que você pediu para eu criar + mostra o usuário criado
    response.status(201).json(request.body);
});

// 4) Rota Deletar
app.delete('/usuarios/:id', async (request, response) => {
    await prisma.user.delete({
        where: {
            id: request.params.id
        }
    })

    // Retornar uma mensagem do usuário deletado
    response.status(200).json({ message: "Usuário deletado com sucesso!" });
});

// Responsável por informar ao servidor onde ele vai rodar: Inicia o servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

/*
    OBJETIVO PRINCIPAL: Criar a API de Usuários

    - Criar um usuário
    - Listar todos os usuários
    - Editar um usuário
    - Deletar um usuário
*/