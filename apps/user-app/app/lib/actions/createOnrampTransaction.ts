'use server';

import prisma from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';

export async function createOnRampTransaction(
	provider: string,
	amount: number
) {
	const session = await getServerSession(authOptions);

	if (!session?.user || !session.user?.id) {
		return {
			message: 'Unauthenticated request',
		};
	}

	if (!amount || amount <= 0) {
		throw new Error('Invalid Amount');
	}

	try {
		const token = (Math.random() * 1000000).toFixed(0);

		await prisma.onRampTransaction.create({
			data: {
				provider,
				status: 'Processing',
				startTime: new Date(),
				token: token,
				userId: Number(session.user.id),
				amount,
			},
		});

		await prisma.balance.update({
			where: {
				userId: Number(session.user.id),
			},
			data: {
				amount: {
					increment: amount,
				},
			},
		});

		return {
			message: 'Transaction created successfully and balance updated',
			token,
		};
	} catch (error) {
		console.error('Error creating on-ramp transaction:', error);
	}
}
