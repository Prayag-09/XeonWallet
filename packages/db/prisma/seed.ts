import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
	const alice = await prisma.user.upsert({
		where: { number: '8547979691' },
		update: {},
		create: {
			number: '8547979691',
			password: await bcrypt.hash('prayag', 10),
			name: 'prayag',
			Balance: {
				create: {
					amount: 2000,
					locked: 15000,
				},
			},
			OnRampTransaction: {
				create: {
					startTime: new Date(),
					status: 'Success',
					amount: 20000,
					token: 'token__1',
					provider: 'HDFC Bank',
				},
			},
		},
	});
	const bob = await prisma.user.upsert({
		where: { number: '9876543210' },
		update: {},
		create: {
			number: '9876543210',
			password: await bcrypt.hash('num', 10),
			name: 'num',
			Balance: {
				create: {
					amount: 15000,
					locked: 25000,
				},
			},
			OnRampTransaction: {
				create: {
					startTime: new Date(),
					status: 'Failure',
					amount: 20000,
					token: 'token__2',
					provider: 'HDFC Bank',
				},
			},
		},
	});
	console.log({ alice, bob });
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
