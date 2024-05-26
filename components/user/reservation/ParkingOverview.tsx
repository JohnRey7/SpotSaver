import { useRef } from "react";

type ParkingOverviewModalProps = {
	id: string;
	title: string;
	children: React.ReactNode;
	onConfirm: () => void;
	onClose: () => void;
};

export default function ParkingOverviewModal({
	id,
	title,
	children,
	onConfirm,
	onClose,
}: ParkingOverviewModalProps) {
	const modalRef = useRef<HTMLDialogElement>(null);

	return (
		<dialog id={id} className="modal" ref={modalRef}>
			<div className="modal-box">
				<h3 className="text-lg font-bold">{title}</h3>
				<div className="py-4">{children}</div>
				<div className="modal-action justify-center">
					<button type="submit" onClick={onConfirm} className="btn">
						Yes
					</button>
					<button
						type="button"
						onClick={onClose}
						className="btn"
					>
						Close
					</button>
				</div>
			</div>
		</dialog>
	);
}
