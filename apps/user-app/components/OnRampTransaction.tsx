import Card from '@repo/ui/card';

interface OnRampInterface {
	time: Date;
	amount: number;
	status: any;
	provider: string;
}

interface OnRampTransactionProps {
	transactions: OnRampInterface[];
}

const OnRampTransaction = ({ transactions }: OnRampTransactionProps) => {
	return (
		<Card title='Recent Transactions'>
			{!transactions.length ? (
				<div className='text-center pb-8 pt-8'>No Recent Transactions</div>
			) : (
				<div className='pt-2'>
					{transactions.map((transaction, index) => (
						<div className='flex justify-between' key={index}>
							<div>
								<div className='text-sm'>Received INR</div>
								<div className='text-slate-600 text-xs'>
									{transaction.time.toDateString()}
								</div>
							</div>
							<div className='flex flex-col justify-center'>
								+ Rs {transaction.amount / 100}
							</div>
						</div>
					))}
				</div>
			)}
		</Card>
	);
};

export default OnRampTransaction;
