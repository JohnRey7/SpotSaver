import Image from "next/image";
import Success from "~/public/success.svg";

export default function SuccessPaymentMethod() {
	return (
		<div>
			<Image src={Success} alt="" width={100} height={100} priority />
		</div>
	);
}
