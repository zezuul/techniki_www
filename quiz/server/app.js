import express from 'express';
const app = express();
import cors from 'cors';
const port = 5000;

import { getQuestions, getQuestion, createQuestion, getAnswers, getAnswer } from './db.js';

app.use(cors());
app.use(express.json());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
})

app.get("/questions", async (req, res) => {
    const questions = await getQuestions();
    res.send(questions);
})

app.get("/questions/:id", async (req, res) => {
    const id = req.params.id;
    const question = await getQuestion(id);
    res.send(question);
})

app.post("/questions", async (req, res) => {
    const {title, contents} = req.body;
    const question = await createQuestion(title, contents);
    res.status(201).send(question); //send back info that question was created
})

app.get("/answers", async (req, res) => {
    const answers = await getAnswers();
    res.send(answers);
})

app.get("/answers/:id", async (req, res) => {
    const id = req.params.id;
    const answer = await getAnswer(id);
    res.send(answer);
})

app.listen(port, () => console.log('app is running'));