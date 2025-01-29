import prisma from '@repo/db/client';
import { AddMoney } from '../../../components/AddMoneyCard';
import { BalanceCard } from '../../../components/BalanceCard';
import { OnRampTransactions } from '../../../components/OnRampTransactions';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';

const getBalance = async () => {
	const session = await getServerSession(authOptions);
	if (!session?.user?.id) return { amount: 1000, locked: 1000 };

	const balance = await prisma.balance.findUnique({
		where: { userId: Number(session.user.id) },
	});

	return { amount: balance?.amount ?? 1000, locked: balance?.locked ?? 1000 };
};

const getReceiveP2PTransactions = async () => {
	const session = await getServerSession(authOptions);
	if (!session?.user?.id) return [];

	const txns = await prisma.p2pTransfer.findMany({
		where: { toUserId: Number(session.user.id) },
	});

	return txns.map((t) => ({
		time: t.timestamp,
		amount: t.amount,
		status: 'Success',
		provider: t.fromUserId.toString(),
	}));
};

export default async function TransferPage() {
	try {
		const [balance, transactions] = await Promise.all([
			getBalance(),
			getReceiveP2PTransactions(),
		]);

		return (
			<div className='w-full max-w-screen-xl mx-auto px-4'>
				<div className='text-4xl text-[#6a51a6] pt-8 mb-8 font-bold'>
					Transfer
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div>
						<AddMoney />
					</div>
					<div className='space-y-6'>
						<BalanceCard amount={balance.amount} locked={balance.locked} />
						<OnRampTransactions transactions={transactions} />
					</div>
				</div>
			</div>
		);
	} catch (error) {
		console.error('Error loading TransferPage:', error);
		return (
			<div className='text-center text-red-500'>
				Failed to load the page. Please try again later.
			</div>
		);
	}
}
