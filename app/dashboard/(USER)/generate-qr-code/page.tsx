import Image from "next/image";
import Header from "~/components/Header";
import QRCode from "~/public/qr-code.png";

export default function GenerateQRCode() {
	return (
		<section className="w-full p-10">
			<Header title="Personal Information" />

			<div className="">
				<Image
					src={QRCode}
					alt="QR Code png"
					width={300}
					height={300}
					priority
					className="border-b-4 border-gray-200 shadow-lg"
				/>
			</div>
		</section>
	);
}
