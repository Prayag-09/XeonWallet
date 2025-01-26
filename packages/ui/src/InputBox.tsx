'use client';

interface inputBoxInterface {
	label: string;
	onChange: (value: string) => void;
	placeholder: string;
}

const InputBox = ({ label, placeholder, onChange }: inputBoxInterface) => {
	return (
		<div className='pt-2'>
			<label className='block mb-2 text-sm font-medium text-black'>
				{label}
			</label>
			<input
				onChange={(e) => onChange(e.target.value)}
				type='text'
				placeholder={placeholder}></input>
		</div>
	);
};

export default InputBox;
