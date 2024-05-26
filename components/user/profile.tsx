"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";
import toast from "react-hot-toast";
import { UserSelect } from "~/lib/schema";
import Button from "../Button";
import { Input, InputMiddleName } from "../Input";
import { Label, MiddleNameLabel } from "../Label";
import Modal from "../Modal";

type FormDataProps = {
	firstName: string;
	lastName: string;
	middleName: string;
};

export default function Profile({ id, firstName, lastName, middleName, email }: UserSelect) {
	const formRef = useRef<HTMLFormElement>(null);
	const router = useRouter();

	function handleUpdateProfile(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		(document.getElementById("my_modal_1") as HTMLDialogElement).showModal();
	}

	async function handleConfirmUpdateProfile() {
		if (formRef.current) {
			const formData: FormDataProps = {
				firstName: formRef.current.firstName.value as string,
				lastName: formRef.current.lastName.value as string,
				middleName: formRef.current.middleName.value as string,
			};

			const response = await fetch(`/api/users/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				(document.getElementById("my_modal_1") as HTMLDialogElement).close();
				return toast.success("Profile updated successfully!");
			}
		}
	}

	async function handleDeleteProfile() {
		const response = await fetch(`/api/users/${id}`, {
			method: "DELETE",
		});

		if (response.ok) {
			toast.success("Profile deleted successfully!");
			router.push("/login");
		} else {
			toast.error("Failed to delete profile!");
		}
	}

	return (
		<>
			<form ref={formRef} onSubmit={handleUpdateProfile}>
				<section className="mt-7 grid grid-cols-3 gap-5">
					<Label>
						<Input type="text" name="firstName" placeholder={firstName!} />
					</Label>
					<Label>
						<Input type="text" name="lastName" placeholder={lastName!} />
					</Label>
					<MiddleNameLabel>
						<InputMiddleName
							type="text"
							name="middleName"
							placeholder={middleName || "M.I."}
						/>
					</MiddleNameLabel>
					<Label>
						<Input type="email" name="email" placeholder={email} disabled={true} />
					</Label>
				</section>

				<footer className="mt-20 flex justify-between">
					<Button type="submit" className="bg-green">
						Save
					</Button>

					<Button type="button" onClick={handleDeleteProfile} className="bg-red">
						Delete Profile
					</Button>
				</footer>
			</form>
			<Modal id="my_modal_1" title="Hello!" onConfirm={handleConfirmUpdateProfile}>
				<p>Are you sure you want to udpate?</p>
			</Modal>
		</>
	);
}
