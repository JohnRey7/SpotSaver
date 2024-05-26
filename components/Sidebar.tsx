import Image from "next/image";
import Link from "next/link";
import logo from "~/public/logo.png";
import Logout from "./Logout";

const userPOV = [
	{ href: "/dashboard/profile", label: "Profile" },
	{ href: "/dashboard/parking-reservation", label: "Parking Reservation" },
	{ href: "/dashboard/generate-qr-code", label: "Generated QR Code" },
	{ href: "/dashboard/history", label: "History" },
	{ href: "/dashboard/notifications", label: "Notifications" },
] as const;

const adminPOV = [
	{ href: "/dashboard/report-and-analytics", label: "Report and Analytics" },
	{ href: "/dashboard/user-management", label: "User Management" },
	{ href: "/dashboard/admin-notifications", label: "Notifications" },
] as const;

type SidebarProps = { role: "USER" | "ADMIN" | null | undefined };

export default function Sidebar({ role }: SidebarProps) {
	return (
		<nav className="h-screen sticky top-0">
			<aside className="bg-yellow flex h-screen w-72 flex-col transition-transform sm:translate-x-0">
				<Image
					src={logo}
					alt="CIT IMAGE"
					width={250}
					height={250}
					priority
					className="mx-auto p-3"
				/>
				<section className="flex-1 overflow-auto">
					<div>
						<ul className="flex flex-1 flex-col gap-1.5 p-3">
							{role === "USER" && (
								<>
									{userPOV.map(({ href, label }) => (
										<Links key={href} href={href} label={label} />
									))}
								</>
							)}
							{role === "ADMIN" && (
								<>
									{adminPOV.map(({ href, label }) => (
										<Links key={href} href={href} label={label} />
									))}
								</>
							)}
						</ul>
					</div>
				</section>

				<footer className="p-5">
					<Logout />
				</footer>
			</aside>

			<div className="fixed bottom-0 left-0 right-0 top-0 z-30 bg-slate-900/20 transition-colors sm:hidden"></div>
		</nav>
	);
}

type LinksProps = {
	href: string;
	label: string;
};

function Links({ href, label }: LinksProps) {
	return (
		<Link
			key={href}
			href={href}
			className="hover-bg-red bg-darkgray flex items-center gap-3 p-3 text-slate-700 transition-colors"
		>
			<div className="mx-auto text-base">{label}</div>
		</Link>
	);
}
