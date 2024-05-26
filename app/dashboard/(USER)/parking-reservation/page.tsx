import ReservationTable from "~/components/user/reservation/reservation-table";
import { baseUrl } from "~/constants";
import { validateRequest } from "~/lib/auth";
import { ParkingSpotSelect } from "~/lib/schema";

const tableHead = [
	{ name: "Slot", label: "Slot" },
	{ name: "Location", label: "Location" },
	{ name: "Price", label: "Price" },
	{ name: "Date", label: "Date" },
	{ name: "StartTime", label: "Start Time" },
] as const;

export default async function ParkingReservationPage() {
	const { user } = await validateRequest();

	let parkingSpots: ParkingSpotSelect[] = [];
	try {
		const response = await fetch(`${baseUrl}/api/parkingspots`, {
			cache: "no-store",
		});
		const data = await response.json();
		parkingSpots = data.parkingspots;
	} catch (error) {
		console.log(error);
	}

	return (
		<section className="w-full p-10">
			<header>
				<div className="flex items-center justify-between border-b-2 border-gray-200 pb-2 text-2xl font-bold">
					<span>Parking Reservation</span>
				</div>
			</header>

			<section>
				<div className="bg-red my-5 grid w-full grid-cols-5 rounded-xl">
					{tableHead.map(({ name, label }) => (
						<p key={name} className="py-3 text-center font-semibold text-white">
							{label}
						</p>
					))}
				</div>
				<ReservationTable parkingspots={parkingSpots} id={user?.id!} />
			</section>
		</section>
	);
}
