import Header from "~/components/Header";
import LChart from "~/components/admin/UserChart";
import { baseUrl } from "~/constants";
import { ParkingSpotSelect } from "~/lib/schema";

export default async function ReportAndAnalyticsPage() {
	let parkingSpots: ParkingSpotSelect[] = [];
	try {
		const response = await fetch(`${baseUrl}/api/parkingspots`, {
			cache: "no-cache",
		});
		const data = await response.json();
		parkingSpots = data.parkingspots;
	} catch (error) {
		console.log(error);
	}

	const available = (parkingSpots.filter((p) => p.availability === true).length / parkingSpots.length) * 100
	const notAvailable = (parkingSpots.filter((p) => p.availability === false).length / parkingSpots.length) * 100

	return (
		<section className="w-full p-10">
			<Header title="Parking Management" />

			<section className="flex gap-10 py-8">
				<section className="w-full shadow-lg">
					<div className="p-5">
						<div className="flex items-center justify-between border-b-2">
							<div>
								<p>Available</p>
								<p>Parking Lot</p>
							</div>
							<div className="w-32">
								{/* <availableParking parkingSpots={parkingSpots} /> */}
								<p
									className="radial-progress text-primary"
									// @ts-ignore
									style={{ "--value": 70 }}
									role="progressbar"
								>
									{available}
								</p>
							</div>
						</div>
						<div>
							<p>Available Slots: {available}</p>
							<p>Recently Updated: DATE AND TIME</p>
						</div>
					</div>
				</section>
				<section className="w-full shadow-lg">
					<div className="p-5">
						<div className="flex items-center justify-between border-b-2">
							<div>
								<p>Available</p>
								<p>Parking Lot</p>
							</div>
							<div className="w-32">
								<p
									className="radial-progress text-primary"
									// @ts-ignore
									style={{ "--value": 70 }}
									role="progressbar"
								>
									{notAvailable}
								</p>
							</div>
						</div>
						<div>
							<p>Available Slots: {notAvailable}</p>
							<p>Recently Updated: DATE AND TIME</p>
						</div>
					</div>
				</section>
			</section>

			<div className="h-96">
				<LChart />
			</div>
		</section>
	);
}
