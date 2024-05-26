"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { UserSelect } from "~/lib/schema";
import Button from "../Button";
import Modal from "../Modal";

type UserProps = {
	users: UserSelect[];
};

export default function Users({ users }: UserProps) {
	const [userId, setUserId] = useState("");
	const router = useRouter();

	function handleDeleteUser(id: string) {
		setUserId(id);
		(document.getElementById("delete_user") as HTMLDialogElement).showModal();
	}

	async function handleConfirmDeleteUser() {
		const response = await fetch(`/api/users/${userId}`, {
			method: "DELETE",
		});

		if (response.ok) {
            router.refresh();
			(document.getElementById("delete_user") as HTMLDialogElement).close();
			return toast.success("User deleted successfully");
		}
	}

	return (
		<>
			<form onSubmit={(e) => e.preventDefault()}>
				{users
					.filter((role) => role.role === "USER")
					.map((user) => {
						const { id, firstName, lastName } = user;

						return (
							<div key={user.id} className="py-5">
								<div className="bg-lightgray flex w-full items-center justify-between rounded-xl p-5">
									<p className="text-lg font-semibold text-[#aaaa]">
										{firstName + " " + lastName}
									</p>
									<Button onClick={() => handleDeleteUser(id)} className="bg-red">
										Delete
									</Button>
								</div>
							</div>
						);
					})}
			</form>
			<Modal id="delete_user" title="Deleting User!" onConfirm={handleConfirmDeleteUser}>
				<p>Are you sure you want to delete user?</p>
			</Modal>
		</>
	);
}
