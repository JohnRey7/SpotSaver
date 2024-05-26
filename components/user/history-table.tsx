"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { baseUrl } from "~/constants";
import { formatDateTime } from "~/lib/helper";
import { PaymentSelect } from "~/lib/schema";
import Button from "../Button";
import Modal from "../Modal";

type HistoryTableProps = {
	payments: PaymentSelect[];
	id: string;
};

export default function HistoryTable({ payments, id }: HistoryTableProps) {
	const [selectPaymentId, setSelectPaymentId] = useState(0);
	const router = useRouter();

	function handleDeleteNotification() {
		(document.getElementById("my_modal_1") as HTMLDialogElement).showModal();
	}

	async function handleConfirmUpdateProfile() {
		const reponse = await fetch(`${baseUrl}/api/payments/${selectPaymentId}`, {
			method: "DELETE",
		});

		if (reponse.ok) {
			router.refresh();
			(document.getElementById("my_modal_1") as HTMLDialogElement).close();
			return toast.success("Payment has been successfully cancelled.");
		}
	}

	return (
		<>
			<form action={handleDeleteNotification}>
				{payments.map(
					({
						id,
						amount,
						methodOfPayment,
						paymentDate,
						// @ts-ignore
						reservation,
					}) => {
						const { formattedDate, formattedTime } = formatDateTime(paymentDate);

						return (
							<div
								key={id}
								className="grid w-full grid-cols-4 items-center gap-5 border-b-2 border-gray-400 py-4 text-center"
							>
								<DisplayText text={`SLOT ${reservation.parkingSpot.id}`} />
								<DisplayText text={reservation.parkingSpot.location} />
								<DisplayText text={amount} />
								<p className="bg-lightgray rounded-xl p-4 font-semibold text-[#aaaaaa] shadow-md">
									{formattedDate + " " + formattedTime}
								</p>
								<p className="bg-lightgray col-span-3 rounded-xl p-4 font-semibold text-[#aaaaaa] shadow-md">
									Paid through {methodOfPayment.toUpperCase()}
								</p>
								<Button
									onClick={() => setSelectPaymentId(id)}
									className="bg-yellow p-4 font-extrabold text-[#800000]"
								>
									Cancel
								</Button>
							</div>
						);
					}
				)}
			</form>
			<Modal id="my_modal_1" title="Hello!" onConfirm={handleConfirmUpdateProfile}>
				<p>Are you sure you want to cancel reservation?</p>
			</Modal>
		</>
	);
}

function DisplayText({ text }: { text: string | number }) {
	return (
		<p className="bg-lightgray rounded-xl p-4 font-semibold text-[#aaaaaa] shadow-md">{text}</p>
	);
}
