'use client';
import { Button } from '@repo/ui/button';
import { Card } from '@repo/ui/card';
import { Select } from '@repo/ui/select';
import { useState } from 'react';
import { TextInput } from '@repo/ui/textinput';
import { createOnRampTransaction } from '../app/lib/actions/createOnrampTransaction';

const SUPPORTED_BANKS = [
	{
		name: 'HDFC Bank',
		redirectUrl: 'https://netbanking.hdfcbank.com',
	},
	{
		name: 'Axis Bank',
		redirectUrl: 'https://www.axisbank.com/',
	},
];

export const AddMoney = () => {
	const [selectedBank, setSelectedBank] = useState(SUPPORTED_BANKS[0]);
	const [amount, setAmount] = useState<number | null>(null);

	const handleAddMoney = async () => {
		if (!amount || amount <= 0) {
			alert('Please enter a valid amount.');
			return;
		}
		try {
			if (selectedBank) {
				await createOnRampTransaction(selectedBank.name, amount * 100);
			} else {
				alert('Please select a bank.');
				return;
			}
			if (selectedBank) {
				window.location.href = selectedBank.redirectUrl;
			} else {
				alert('Please select a bank.');
			}
		} catch (error) {
			console.error('Error creating transaction:', error);
			alert('Failed to create transaction. Please try again.');
		}
	};

	return (
		<Card title="Add Money">
			<div className="w-full">
				<TextInput
					label="Amount"
					placeholder="Enter amount"
					onChange={(val) => setAmount(Number(val))}
				/>
				<div className="py-4 text-left">Bank</div>
				<Select
					onSelect={(value) => {
						const bank = SUPPORTED_BANKS.find((x) => x.name === value);
						if (bank) {
							setSelectedBank(bank);
						}
					}}
					options={SUPPORTED_BANKS.map((bank) => ({
						key: bank.name,
						value: bank.name,
					}))}
				/>
				<div className="flex justify-center pt-4">
					<Button onClick={handleAddMoney}>Add Money</Button>
				</div>
			</div>
		</Card>
	);
};