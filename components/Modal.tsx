import { useRef } from "react";

type ModalProps = {
	id: string;
	title: string;
	children: React.ReactNode;
	onConfirm: () => void;
};

export default function Modal({ id, title, children, onConfirm }: ModalProps) {
	const modalRef = useRef<HTMLDialogElement>(null);

	return (
		<dialog id={id} className="modal" ref={modalRef}>
			<div className="modal-box">
				<h3 className="text-lg font-bold">{title}</h3>
				<div className="py-4">{children}</div>
				<div className="modal-action">
					<button className="btn" type="button" onClick={onConfirm}>
						Yes
					</button>
					<form method="dialog">
						<button className="btn" type="submit">
							Close
						</button>
					</form>
				</div>
			</div>
		</dialog>
	);
}
