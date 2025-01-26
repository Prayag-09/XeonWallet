import express from 'express';
import e, { Request, Response } from 'express';
import db from '@repo/db/client';
const app = express();

app.use(express.json());

interface paymentInterface {
	token: string;
	userId: string;
	amount: string;
}
app.post('/hdfc', async (req: Request, res: Response) => {
	const paymentInfo: paymentInterface = {
		token: req.body.token,
		userId: req.body.user_identifier,
		amount: req.body.amount,
	};

	try {
		await db.balance.updateMany({
			where: {
				userId: Number(paymentInfo.userId),
			},
			data: {
				amount: {
					increment: Number(paymentInfo.amount),
				},
			},
		});

		await db.onRampTransaction.updateMany({
			where: {
				token: paymentInfo.token,
			},
			data: {
				status: 'Success',
			},
		});

		// Very important
		res.status(200).send('Transaction Captured !!');
	} catch (error) {
		console.error(error);
		res.status(411).json({
			message: 'Error while processing webhook',
			error: error,
		});
	}
});

app.listen(3000, () => console.log('Server running on 4000'));
