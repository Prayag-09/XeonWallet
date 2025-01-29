import prisma from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';
import { OnRampTransactions } from '../../../components/OnRampTransactions';

async function getTransactions(userId: number) {
	const [onRampTxns, sentP2PTxns, receivedP2PTxns] = await Promise.all([
		prisma.onRampTransaction.findMany({
			where: { userId },
			select: { startTime: true, amount: true, status: true, provider: true },
		}),
		prisma.p2pTransfer.findMany({
			where: { fromUserId: userId },
			select: { timestamp: true, amount: true, toUserId: true },
		}),
		prisma.p2pTransfer.findMany({
			where: { toUserId: userId },
			select: { timestamp: true, amount: true, fromUserId: true },
		}),
	]);

	const onRampTransactions = {
		success: onRampTxns.filter((t) => t.status === 'Success').map(t => ({ ...t, time: t.startTime })),
		processing: onRampTxns.filter((t) => t.status === 'Processing').map(t => ({ ...t, time: t.startTime })),
		failure: onRampTxns.filter((t) => t.status === 'Failure').map(t => ({ ...t, time: t.startTime })),
	};

	const sentTransactions = sentP2PTxns.map((t) => ({
		time: t.timestamp,
		amount: t.amount,
		status: 'Success',
		provider: t.toUserId.toString(),
	}));

	const receivedTransactions = receivedP2PTxns.map((t) => ({
		time: t.timestamp,
		amount: t.amount,
		status: 'Success',
		provider: t.fromUserId.toString(),
	}));

	return { onRampTransactions, sentTransactions, receivedTransactions };
}

export default async function TransactionsPage() {
	const session = await getServerSession(authOptions);
	if (!session?.user?.id) return <p>Unauthorized</p>;

	const userId = Number(session.user.id);
	const { onRampTransactions, sentTransactions, receivedTransactions } =
		await getTransactions(userId);

	return (
		<div className='flex flex-col gap-6'>
			<h1 className='text-4xl text-[#6a51a6] pt-8 mb-6 font-bold'>
				Transactions
			</h1>

			<section className='w-[80vw] px-10'>
				<h2 className='text-2xl text-[#6a51a6] font-bold mb-4'>
					P2P Transactions
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div>
						<h3 className='text-lg font-semibold mb-2'>Sent Transactions</h3>
						<OnRampTransactions transactions={sentTransactions} />
					</div>
					<div>
						<h3 className='text-lg font-semibold mb-2'>
							Received Transactions
						</h3>
						<OnRampTransactions transactions={receivedTransactions} />
					</div>
				</div>
			</section>

			<section className='w-[80vw] px-10'>
				<h2 className='text-2xl text-[#6a51a6] font-bold mb-4'>
					Wallet Transactions
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					<div>
						<h3 className='text-lg font-semibold mb-2'>Success</h3>
						<OnRampTransactions transactions={onRampTransactions.success} />
					</div>
					<div>
						<h3 className='text-lg font-semibold mb-2'>Processing</h3>
						<OnRampTransactions transactions={onRampTransactions.processing} />
					</div>
					<div>
						<h3 className='text-lg font-semibold mb-2'>Failed</h3>
						<OnRampTransactions transactions={onRampTransactions.failure} />
					</div>
				</div>
			</section>
		</div>
	);
}
