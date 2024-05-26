"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, Fragment, useState } from "react";
import toast from "react-hot-toast";
import { ParkingSpotSelect } from "~/lib/schema";
import GCASH from "~/public/gcash.svg";
import MASTERCARD from "~/public/mastercard.svg";
import QRCode from "~/public/qr-code.png";
import VISA from "~/public/visa.svg";
import Button from "../../Button";
import ParkingOverviewModal from "./ParkingOverview";

type ReservationTableProps = {
	parkingspots: ParkingSpotSelect[];
	id: string;
};

const vehicleType = [
	{ name: "Car", label: "Car" },
	{ name: "Motorcycle", label: "Motorcycle" },
	{ name: "Bicycle", label: "Bicycle" },
] as const;

type reservationProps = {
	vehicle: string;
	parkingId: string;
	date: string;
	startTime: string;
};

type paymentMethodsProps = {
	amount: number;
	methodOfPayment: "gcash" | "visa" | "mastercard";
};

export default function ReservationTable({ parkingspots, id }: ReservationTableProps) {
	const [formData, setFormData] = useState<reservationProps>(); // Add this line
	const [paymentMethod, setPaymentMethod] = useState<paymentMethodsProps>(); // Add this line
	const [paymentOption, setPaymentOption] = useState<string>("");
	const router = useRouter();

	function handleReserve(formData: FormData) {
		const reservation = {
			parkingId: formData.get("parkingId") as string,
			vehicle: formData.get("vehicle") as string,
			date: formData.get("date") as string,
			startTime: formData.get("startTime") as string,
		};

		const paymentMethod = {
			amount: 50,
			methodOfPayment: formData.get("methodOfPayment") as "gcash" | "visa" | "mastercard",
		};

		setFormData(reservation as reservationProps);
		setPaymentMethod(paymentMethod as paymentMethodsProps);

		if (!(reservation.date && reservation.startTime)) {
			return toast.error("Please choose a date and time.");
		} else if (!reservation.date) {
			return toast.error("Please choose a date.");
		} else if (!reservation.startTime) {
			return toast.error("Please choose a time.");
		} else {
			(
				document.getElementById("handle-reservation-overview") as HTMLDialogElement
			).showModal();
		}
	}

	function handleParkingReservationOverview() {
		if (!paymentOption) {
			return toast.error("Please choose a payment method.");
		}

		(document.getElementById("handle-reservation-overview") as HTMLDialogElement).close();
		(document.getElementById("handle-parking-reserved") as HTMLDialogElement).showModal();
	}

	async function handleConfirmUpdateProfile() {
		const reservation = await fetch(`/api/reservations/`, {
			method: "POST",
			body: JSON.stringify({ userId: id, ...formData }),
		});

		const reservationData = await reservation.json();

		const payment = await fetch("/api/payments/", {
			method: "POST",
			body: JSON.stringify({
				userId: id,
				reservationId: reservationData.reservation.id,
				...paymentMethod,
			}),
		});

		if (reservation.ok && payment.ok) {
			(document.getElementById("handle-parking-reserved") as HTMLDialogElement).close();
			router.refresh();
			return toast.success("You have successfully reserved a parking slot.");
		}
	}

	const parkingLocation = parkingspots.find(
		(parking) => parking.id === parseInt(formData?.parkingId as string)
	)?.location;

	return (
		<>
			<form action={handleReserve}>
				{parkingspots
					.filter(({ availability }) => availability === true)
					.sort((a, b) => a.id - b.id)
					.map(({ id, location }) => (
						<div
							key={id}
							className="grid w-full grid-cols-5 rounded-xl p-3 text-center hover:bg-base-200"
						>
							<p>{`SLOT ${id}`}</p>
							<input type="hidden" name="parkingId" value={id} />
							<p>{location}</p>
							<p>50</p>
							<input type="date" id="start" name="date" min="2024-01-01" />
							<input type="time" id="appt" name="startTime" />
						</div>
					))}

				<div className="flex justify-between pt-5">
					<div className="dropdown dropdown-end">
						<select
							name="vehicle"
							required
							className="bg-red select w-full max-w-xs text-white"
						>
							<option value="">Choose Vehicle</option>
							{vehicleType.map(({ name, label }) => (
								<Fragment key={name}>
									<option value={name} className="py-3">
										{label}
									</option>
								</Fragment>
							))}
						</select>
					</div>
					<Button type="submit" className="bg-red px-5 py-3 hover:bg-base-300">
						Reserve
					</Button>
				</div>

				<ParkingOverviewModal
					id="handle-reservation-overview"
					title="Parking Reservation Overview"
					onConfirm={handleParkingReservationOverview}
					onClose={() =>
						(
							document.getElementById(
								"handle-reservation-overview"
							) as HTMLDialogElement
						).close()
					}
				>
					<div>
						<div className="flex items-center justify-between border-b-2">
							<div className="flex flex-col">
								<p>
									Slot: <b>{formData?.parkingId}</b>
								</p>
								<p>
									Location: <b>{parkingLocation}</b>
								</p>
								<p>
									Date: <b>{formData?.date}</b>
								</p>
							</div>
							<p>
								Price: <b>50</b>
							</p>
						</div>
						<div className="flex">
							<p className="ml-auto">
								Total Price: <b>50</b>
							</p>
						</div>

						<p className="mb-2 mt-5">
							<i>Choose a Payment Method</i>
						</p>

						<section className="flex justify-between">
							<RadioButton
								setPaymentOption={(value: string) =>
									setPaymentOption(value as "gcash" | "visa" | "mastercard")
								}
							/>

							{paymentOption === "gcash" && (
								<Image
									src={GCASH}
									alt="GCash svg"
									width={100}
									height={100}
									className="h-32 w-32"
								/>
							)}
							{paymentOption === "visa" && (
								<Image
									src={VISA}
									alt="Visa svg"
									width={100}
									height={100}
									className="h-32 w-32"
								/>
							)}
							{paymentOption === "mastercard" && (
								<Image
									src={MASTERCARD}
									alt="MasteerCard svg"
									width={100}
									height={100}
									className="h-32 w-32"
								/>
							)}
						</section>
					</div>
				</ParkingOverviewModal>

				<ParkingOverviewModal
					id="handle-parking-reserved"
					title="Parking Reserved"
					onConfirm={handleConfirmUpdateProfile}
					onClose={() =>
						(
							document.getElementById("handle-parking-reserved") as HTMLDialogElement
						).close()
					}
				>
					<div className="flex flex-col gap-5">
						<div className="flex items-center justify-center">
							<div className="flex gap-4">
								<p>
									Slot: <b>{formData?.parkingId}</b>
								</p>
								<p>
									Location: <b>{parkingLocation}</b>
								</p>
								<p>
									Date: <b>{formData?.date}</b>
								</p>
							</div>
						</div>
						<div className="flex flex-col items-center justify-between gap-5">
							<Image
								src={QRCode}
								alt="QR Code png"
								width={200}
								height={200}
								priority
							/>
						</div>
					</div>
				</ParkingOverviewModal>
			</form>
		</>
	);
}

function RadioButton({ setPaymentOption }: { setPaymentOption: (value: string) => void }) {
	return (
		<fieldset className="flex flex-col gap-3">
			<label className="flex gap-2 font-semibold">
				<input
					id="GCASH"
					type="radio"
					value="gcash"
					name="methodOfPayment"
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setPaymentOption(e.target.value)
					}
				/>
				GCASH
			</label>
			<label className="flex gap-2 font-semibold">
				<input
					id="VISA"
					type="radio"
					value="visa"
					name="methodOfPayment"
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setPaymentOption(e.target.value)
					}
				/>
				VISA
			</label>
			<label className="flex gap-2 font-semibold">
				<input
					id="MASTERCARD"
					type="radio"
					value="mastercard"
					name="methodOfPayment"
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setPaymentOption(e.target.value)
					}
				/>
				MASTERCARD
			</label>
		</fieldset>
	);
}
