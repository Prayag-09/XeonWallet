import express from 'express';
import { Request, Response } from 'express';
const app = express();

app.use(express.json());

app.post('/hdfc', (req : Request, res : Response) => {
    const paymentInfo = {
        token : req.body.token,
        userId : req.body.user_identifier,
        amount : req.body.amount
    }
});
