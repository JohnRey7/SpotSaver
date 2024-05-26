import { useState } from "react";
import { ParkingSpotSelect } from "~/lib/schema";

export default function TotalParking({ parkingSpots }: { parkingSpots: ParkingSpotSelect[] }) {
	const [total, setTotal] = useState(0);

	const totalParking = parkingSpots.length;
	setTotal(totalParking);

	return <div>{total}</div>;
}
