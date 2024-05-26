import React, { ReactNode } from 'react'

export function Label({ children }: { children: ReactNode }) {
	return <label className="input w-full flex items-center gap-2">{children}</label>;
}

export function MiddleNameLabel({ children }: { children: ReactNode }) {
	return (
		<label className="input w-20 flex items-center gap-2">
			{children}
		</label>
	);
}