type InputProps = {
	type: string;
	name: string;
	placeholder: string;
	disabled?: boolean;
};

export function Input({ type, name, placeholder, disabled }: InputProps) {
	return (
		<input
			type={type}
			name={name}
			placeholder={placeholder}
			required
			disabled={disabled}
			className="w-full text-lg font-medium"
		/>
	);
}

export function InputMiddleName({ type, name, placeholder }: InputProps) {
	return (
		<input
			type={type}
			name={name}
			maxLength={4}
			required
			placeholder={placeholder}
			className="w-full text-lg font-medium"
		/>
	);
}
