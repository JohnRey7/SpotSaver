import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

export default function Button({ children, className, ...props }: ButtonProps) {
	return (
		<button type="submit" className={twMerge("rounded-xl px-5 py-2 text-white", className)} {...props}>
			{children}
		</button>
	);
}
