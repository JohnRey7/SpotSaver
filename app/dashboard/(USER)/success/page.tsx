import Image from "next/image";
import Link from "next/link";
import Header from "~/components/Header";
import Success from "~/public/success.svg";

export default function SuccessPaymentMethod() {
	return (
		<section className="w-full p-10">
			<Header title="Success" />
			<section className="flex h-[80vh] flex-col items-center justify-center gap-10">
				<Image src={Success} alt="" width={400} height={400} priority />
				<p className="text-xl">
					Go back to{" "}
					<Link href="/dashboard/parking-reservation">
						<b className="hover:text-red-800">Parking Reservation</b>
					</Link>
					.
				</p>
			</section>
		</section>
	);
}
