import prisma from '@repo/db/client';
import { AddMoney } from '../../../components/AddMoneyCard';
import { BalanceCard } from '../../../components/BalanceCard';
import { OnRampTransactions } from '../../../components/OnRampTransactions';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';

async function getBalance() {
	try {
		const session = await getServerSession(authOptions);

		if (!session || !session.user?.id) {
			console.error('User session not found.');
			return { amount: 1000, locked: 1000 };
		}

		const balance = await prisma.balance.findUnique({
			where: {
				userId: Number(session.user.id),
			},
		});

		return {
			amount: balance?.amount || 1000,
			locked: balance?.locked || 1000,
		};
	} catch (error) {
		console.error('Error fetching balance:', error);
		return { amount: 1000, locked: 1000 }; // Fallback balance values
	}
}

async function getReceiveP2PTransactions() {
	try {
		const session = await getServerSession(authOptions);

		if (!session || !session.user?.id) {
			console.error('User session not found.');
			return []; // Default empty transaction list
		}

		const txns = await prisma.p2pTransfer.findMany({
			where: {
				toUserId: Number(session.user.id),
			},
		});

		return txns.map((t) => ({
			time: t.timestamp,
			amount: t.amount,
			status:"Success",
			provider: t.fromUserId.toString(),
		}));
	} catch (error) {
		console.error('Error fetching transactions:', error);
		return []; // Fallback to empty transaction list
	}
}

export default async function TransferPage() {
	try {
		const balance = await getBalance();
		const transactions = await getReceiveP2PTransactions();

		return (
			<div className='w-screen'>
				<div className='text-4xl text-[#6a51a6] pt-8 mb-8 font-bold'>
					Transfer
				</div>
				<div className='grid grid-cols-1 gap-4 md:grid-cols-2 p-4'>
					<div>
						<AddMoney />
					</div>
					<div>
						<BalanceCard amount={balance.amount} locked={balance.locked} />
						<div className='pt-4'>
							<OnRampTransactions transactions={transactions} />
						</div>
					</div>
				</div>
			</div>
		);
	} catch (error) {
		console.error('Error rendering TransferPage:', error);
		return (
			<div className='text-center text-red-500'>
				Failed to load the page. Please try again later.
			</div>
		);
	}
}
