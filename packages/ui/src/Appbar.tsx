import { Button } from './button';

interface AppbarProps {
	user?: {
		name?: string | null;
	};
	onSignin: () => void;
	onSignout: () => void;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
	return (
		<div className='flex justify-between items-center bg-white dark:bg-gray-900 text-black dark:text-white shadow-md border-b border-gray-300 dark:border-gray-700 px-6 py-3'>
			<div className='text-2xl font-semibold'>Xeon Wallet</div>
			<div className='px-4 py-2'>
				<Button onClick={user ? onSignout : onSignin}>
					{user ? 'Logout' : 'Login'}
				</Button>
			</div>
		</div>
	);
};
