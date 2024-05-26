import { formatDateTime } from "~/lib/helper";
import { NotificationSelect, PaymentSelect } from "~/lib/schema";

type NotificationsProps = {
	notifications: NotificationSelect[];
	payments: PaymentSelect[];
};

export default function Notifications({ notifications, payments }: NotificationsProps) {
	function toBeConinuedString(text: string) {
		return text.substring(0, 50) + "...";
	}

	return (
		<div>
			{notifications
				.sort((a, b) => b.id - a.id)
				.map(({ id, type, timestamp }) => {
					const { formattedDate, formattedTime } = formatDateTime(timestamp);

					return (
						<div
							key={id}
							className="bg-lightgray dropdown dropdown-hover mb-3 w-full rounded-md p-3 hover:bg-[#c7c7c7]"
						>
							<section className="flex justify-between">
								<div>
									<div className="px-4 py-2">
										{type === "RESERVE" && (
											<>
												{toBeConinuedString(
													"Reminder! You have a reservation at"
												)}
											</>
										)}
										{type === "REGISTER" && (
											<>
												{toBeConinuedString(
													"Welcome to SpotSaver! We are delighted to"
												)}
											</>
										)}
										{type === "CANCEL" && (
											<>{toBeConinuedString("Your reservation at")}</>
										)}
									</div>
									{type === "RESERVE" && (
										<p
											tabIndex={0}
											className="dropdown-content z-[1] w-full rounded-lg bg-white px-5 py-4 shadow-xl"
										>
											Reminder! You have a reservation at{" "}
											<b>
												<i>{formattedDate}</i>
											</b>{" "}
											at{" "}
											<b>
												<i>{formattedTime}</i>
											</b>
											. We look forward to seeing you!
										</p>
									)}
									{type === "REGISTER" && (
										<p
											tabIndex={0}
											className="dropdown-content z-[1] w-full rounded-lg bg-white px-5 py-4 shadow-xl"
										>
											<b>Welcome to SpotSaver!</b> We are delighted to have
											you here. Explore our services and find the best spots
											tailored just for you.
										</p>
									)}
									{type === "CANCEL" && (
										<p
											tabIndex={0}
											className="dropdown-content z-[1] w-full rounded-lg bg-white px-5 py-4 shadow-xl"
										>
											Your reservation at{" "}
											<b>
												<i>{formattedDate}</i>
											</b>{" "}
											at{" "}
											<b>
												<i>{formattedTime}</i>
											</b>{" "}
											has been successfully canceled. We hope to serve you in
											the future
										</p>
									)}
								</div>
							</section>
						</div>
					);
				})}
		</div>
	);
}
