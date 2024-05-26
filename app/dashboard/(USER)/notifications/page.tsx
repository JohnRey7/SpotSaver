import Header from "~/components/Header";
import Notifications from "~/components/user/notifications";
import { baseUrl } from "~/constants";
import { validateRequest } from "~/lib/auth";
import { NotificationSelect, ParkingSpotSelect, PaymentSelect, ReservationSelect } from "~/lib/schema";

export default async function NotificationsPage() {
	const { user } = await validateRequest();

	let notifications: NotificationSelect[] = [];
	try {
		const response = await fetch(`${baseUrl}/api/notifications/${user?.id}`, {
			cache: "no-cache",
		});
		const data = await response.json();
		notifications = data.notifications;
	} catch (error) {
		console.log(error);
	}

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
			<Header title="Notifications" />

			<section className="mt-5">
				<Notifications notifications={notifications} payments={payments} />
			</section>
		</section>
	);
}
