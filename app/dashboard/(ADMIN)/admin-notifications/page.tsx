import Header from "~/components/Header";
import AdminNotifications from "~/components/admin/admin-notification";
import { baseUrl } from "~/constants";
import { validateRequest } from "~/lib/auth";
import { NotificationSelect } from "~/lib/schema";

export default async function AdminNotificationsPage() {
	const { user } = await validateRequest();

	let notifications: NotificationSelect[] = [];
	try {
		const response = await fetch(`${baseUrl}/api/notifications/`, {
			cache: "no-store",
		});
		const data = await response.json();
		notifications = data.notifications;
	} catch (error) {
		console.log(error);
	}

	return (
		<section className="w-full p-10">
			<Header title="Notifications" />

			<section className="mt-5">
				<AdminNotifications notifications={notifications} />
			</section>
		</section>
	);
}
