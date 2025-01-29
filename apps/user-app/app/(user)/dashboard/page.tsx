export default function Dashboard() {
	return (
		<div className='min-h-screen bg-gray-50 p-6'>
			<div className='max-w-7xl mx-auto'>
				{/* Dummy Data Banner */}
				<div className='bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md mb-6'>
					<p className='text-sm font-medium'>
						⚠️ This dashboard displays dummy data for demonstration purposes
						only.
					</p>
				</div>

				{/* Header */}
				<header className='mb-8'>
					<h1 className='text-3xl font-bold text-gray-800'>Dashboard</h1>
					<p className='text-gray-600 mt-2'>
						Welcome back! Here’s an overview of your account (dummy data).
					</p>
				</header>

				{/* User Stats */}
				<section className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
					<div className='bg-white shadow-md rounded-lg p-4'>
						<h2 className='text-lg font-medium text-gray-800'>Total Balance</h2>
						<p className='text-2xl font-bold text-green-600 mt-2'>₹12,345</p>
						<p className='text-xs text-gray-500'>* Dummy Data</p>
					</div>
					<div className='bg-white shadow-md rounded-lg p-4'>
						<h2 className='text-lg font-medium text-gray-800'>
							Monthly Transactions
						</h2>
						<p className='text-2xl font-bold text-blue-600 mt-2'>57</p>
						<p className='text-xs text-gray-500'>* Dummy Data</p>
					</div>
					<div className='bg-white shadow-md rounded-lg p-4'>
						<h2 className='text-lg font-medium text-gray-800'>
							Pending Requests
						</h2>
						<p className='text-2xl font-bold text-red-600 mt-2'>4</p>
						<p className='text-xs text-gray-500'>* Dummy Data</p>
					</div>
				</section>

				{/* Recent Activity */}
				<section className='bg-white shadow-md rounded-lg p-6 mb-8'>
					<h2 className='text-xl font-bold text-gray-800 mb-4'>
						Recent Activity
					</h2>
					<ul className='space-y-4'>
						<li className='flex justify-between items-center'>
							<div>
								<p className='font-medium text-gray-700'>Sent ₹500 to John</p>
								<p className='text-sm text-gray-500'>2 hours ago</p>
							</div>
							<p className='text-sm font-medium text-gray-600'>₹500</p>
						</li>
						<li className='flex justify-between items-center'>
							<div>
								<p className='font-medium text-gray-700'>
									Received ₹1,000 from Jane
								</p>
								<p className='text-sm text-gray-500'>1 day ago</p>
							</div>
							<p className='text-sm font-medium text-green-600'>₹1,000</p>
						</li>
						<li className='flex justify-between items-center'>
							<div>
								<p className='font-medium text-gray-700'>
									Paid ₹300 for groceries
								</p>
								<p className='text-sm text-gray-500'>3 days ago</p>
							</div>
							<p className='text-sm font-medium text-gray-600'>₹300</p>
						</li>
					</ul>
					<p className='text-xs text-gray-500 mt-4'>
						* Recent activity data is for demonstration purposes.
					</p>
				</section>

				{/* Widgets Placeholder */}
				<section>
					<h2 className='text-xl font-bold text-gray-800 mb-4'>
						Quick Actions
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						<div className='bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center'>
							<p className='text-gray-500'>Add Widget</p>
						</div>
						<div className='bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center'>
							<p className='text-gray-500'>Add Widget</p>
						</div>
						<div className='bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center'>
							<p className='text-gray-500'>Add Widget</p>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
