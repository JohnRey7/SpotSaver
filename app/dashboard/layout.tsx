import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Sidebar from "~/components/Sidebar";
import { validateRequest } from "~/lib/auth";

type LayoutProps = {
	children: ReactNode;
	params: {
		url: string;
	};
};

export default async function layout({ children, params }: LayoutProps) {
	const { user } = await validateRequest();

	if (!user) {
		return redirect("/login");
	}

	return (
		<div className="flex">
			<Sidebar role={user?.role} />
			{children}
		</div>
	);
}
