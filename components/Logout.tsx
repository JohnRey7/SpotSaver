import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { lucia, validateRequest } from "~/lib/auth";
import Button from "./Button";

export default async function Logout() {
	return (
		<form
			action={LogoutAction}
			className="bg-darkgray hover-bg-red flex w-full flex-1 flex-col justify-center gap-0 overflow-hidden truncate"
		>
			<Button type="submit" className="hover-bg-red text-base text-black">
				Logout
			</Button>
		</form>
	);
}

interface ActionResult {
	error: string | null;
}

export async function LogoutAction(): Promise<ActionResult> {
	"use server";
	const { session } = await validateRequest();
	if (!session) {
		return {
			error: "Unauthorized",
		};
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/login");
}
