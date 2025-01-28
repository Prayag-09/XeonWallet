'use client';
import { Button } from '@repo/ui/button';
import { Card } from '@repo/ui/card';
import { TextInput } from '@repo/ui/textinput';
import { useState } from 'react';
import { p2pTransfer } from '../app/lib/actions/p2pTransfer';
import { useRouter } from 'next/navigation';

export function SendCard() {
	const [number, setNumber] = useState('');
	const [amount, setAmount] = useState('');
	const router = useRouter();

	const handleSend = async () => {
		if (!number.trim()) {
			alert('Please enter a valid number.');
			return;
		}
		if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
			alert('Please enter a valid amount.');
			return;
		}

		try {
			const res = await p2pTransfer(number.trim(), Number(amount) * 100);
			if (res) {
				alert(res.message);
			} else {
				router.push('/transfer');
			}
		} catch (e) {
			alert('Transaction failed: Insufficient funds or invalid details.');
		}
	};

	return (
		<div className='flex items-center justify-center h-screen'>
			<Card title='Send Money'>
				<div className='min-w-80 pt-2'>
					<TextInput
						placeholder='Enter recipient number'
						label='Number'
						onChange={(value) => setNumber(value)}
					/>
					<TextInput
						placeholder='Enter amount'
						label='Amount'
						onChange={(value) => setAmount(value)}
					/>
					<div className='pt-6 flex justify-center'>
						<Button onClick={handleSend}>Send</Button>
					</div>
				</div>
			</Card>
		</div>
	);
}
