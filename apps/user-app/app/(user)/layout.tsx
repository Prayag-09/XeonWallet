import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { SidebarItem } from '../../components/SidebarItem';
import { authOptions } from '../lib/auth';

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}): Promise<JSX.Element> {
	const session = await getServerSession(authOptions);
	if (!session?.user) {
		redirect('/');
	}

	return (
		<div className='flex min-h-screen'>
			<aside className='w-72 border-r border-slate-300 pt-28 px-4'>
				<SidebarItem href='/dashboard' icon={<HomeIcon />} title='Home' />
				<SidebarItem
					href='/transfer'
					icon={<TransferIcon />}
					title='Transfer'
				/>
				<SidebarItem
					href='/transactions'
					icon={<TransactionsIcon />}
					title='Transactions'
				/>
				<SidebarItem
					href='/p2p'
					icon={<P2PTransferIcon />}
					title='P2P Transfer'
				/>
			</aside>
			<main className='flex-1'>{children}</main>
		</div>
	);
}

const Icon = ({ path }: { path: string }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		fill='none'
		viewBox='0 0 24 24'
		strokeWidth='1.5'
		stroke='currentColor'
		className='w-6 h-6'>
		<path strokeLinecap='round' strokeLinejoin='round' d={path} />
	</svg>
);

const HomeIcon = () => (
	<Icon path='m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25' />
);
const TransferIcon = () => (
	<Icon path='M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5' />
);
const TransactionsIcon = () => (
	<Icon path='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
);
const P2PTransferIcon = () => (
	<Icon path='m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25' />
);
