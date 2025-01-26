'use client';

import CustomButton from '@repo/ui/custombutton';
import Card from '@repo/ui/card';
import Select from '@repo/ui/select';
import InputBox from '@repo/ui/inputbox';
import { useState } from 'react';

const Banks = [
	{
		name: 'HDFC',
		redirect: 'https://netbanking.hdfcbank.com',
	},
	{
		name: 'Axis',
		redirect: 'https://www.axisbank.com/',
	},
];

const AddMoney = () => {
	const [redirectUrl, setRedirectUrl] = useState(Banks[0]?.redirect);

	return (
		<Card title='Add Money'>
			<InputBox
				label={'Amount'}
				placeholder={'Enter Amount'}
				onChange={() => {}}
			/>
			<span className='py-3 text-left'>
				<Select
					onSelect={(value) => {
						setRedirectUrl(
							Banks.find((bank) => bank.name === value)?.redirect || ''
						);
					}}
					options={Banks.map((bank) => ({
						key: bank.name,
						value: bank.name,
					}))}
				/>
				<div className='flex justify-center pt-4'>
					<CustomButton
						onClick={() => {
							window.location.href = redirectUrl || '';
						}}>
						Add Money
					</CustomButton>
				</div>
			</span>
		</Card>
	);
};

export default AddMoney;
