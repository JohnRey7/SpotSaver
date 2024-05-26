import { formatDateTime } from "~/lib/helper";
import { NotificationSelect } from "~/lib/schema";

type NotificationsProps = {
	notifications: NotificationSelect[];
};

export default function AdminNotifications({ notifications }: NotificationsProps) {
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
													"A user has reserved a slot for"
												)}
											</>
										)}
										{type === "CANCEL" && (
											<>
												{toBeConinuedString(
													"A user has canceled their reservation for"
												)}
											</>
										)}
									</div>
									{type === "RESERVE" && (
										<p
											tabIndex={0}
											className="dropdown-content z-[1] w-full rounded-lg bg-white px-5 py-4 shadow-xl"
										>
											A user has reserved a slot for{" "}
											<b>
												<i>{formattedDate}</i>
											</b>
											, at{" "}
											<b>
												<i>{formattedTime}</i>
											</b>.
										</p>
									)}
									{type === "CANCEL" && (
										<p
											tabIndex={0}
											className="dropdown-content z-[1] w-full rounded-lg bg-white px-5 py-4 shadow-xl"
										>
											A user has canceled their reservation for{" "}
											<b>
												<i>{formattedDate}</i>
											</b>{" "}
											at{" "}
											<b>
												<i>{formattedTime}</i>
											</b>
											.
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
