import express from 'express';
const app = express();
import cors from 'cors';
const port = 5000;

import { getQuestions, getQuestion, getLastQuestionId, getAnswers, getAnswer, postScoreboard, getScoreboard, addQuestionWithAnswers } from './db.js';

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

app.get("/lastQuestionId", async (req, res) => {
    try {
        const lastQuestionId = await getLastQuestionId();
        res.send(lastQuestionId.toString());
    } catch (error) {
        res.status(500).send('Error getting last question ID');
    }
});

app.post("/questions", async (req, res) => {
    const { question_text, answers } = req.body; //answers = [{ answer_text: '', is_correct: 1 }]
    try {
        const newQuestion = await addQuestionWithAnswers(question_text, answers);
        res.status(201).send(newQuestion);
    }catch (error) {
        res.status(500).send('Error creating question with answers');
    }
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

app.post("/saveUserResult", async (req, res) => {
    const { username, score } = req.body;
    const question = await postScoreboard(username, score);
    res.status(200).send('User result saved successfully.');
});

app.get("/scoreboard", async (req, res) => {
    const scores = await getScoreboard();
    res.send(scores);
})

app.listen(port, () => console.log('app is running'));