import Header from "~/components/Header";
import HistoryTable from "~/components/user/history-table";
import { baseUrl } from "~/constants";
import { validateRequest } from "~/lib/auth";
import { PaymentSelect } from "~/lib/schema";

const tableHead = [
	{ name: "Parking Spot", label: "Parking Spot" },
	{ name: "Location", label: "Location" },
	{ name: "Price", label: "Price" },
	{ name: "Date", label: "Date" },
] as const;

export default async function HistoryPage() {
	const { user } = await validateRequest();

	let payments: PaymentSelect[] = [];
	try {
		const response = await fetch(`${baseUrl}/api/payments`, {
			cache: "no-cache",
		});
		const data = await response.json();
		payments = data.payments;
	} catch (error) {
		console.log(error);
	}

	return (
		<section className="w-full p-10">
			<Header title="Reservation and Payment History" />

			<section>
				<div className="bg-red mt-5 grid w-full grid-cols-4 rounded-xl">
					{tableHead.map(({ name, label }) => (
						<p key={name} className="py-3 text-center font-semibold text-white">
							{label}
						</p>
					))}
				</div>
			</section>
			<HistoryTable payments={payments} id={user?.id!} />
		</section>
	);
}
