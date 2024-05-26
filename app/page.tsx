import { redirect } from "next/navigation";
import { validateRequest } from "~/lib/auth";

export default async function Home() {
	const { user } = await validateRequest();

	if (user?.role === "ADMIN") {
		return redirect("/dashboard/report-and-analytics");
	} else if(user?.role === "USER") {
		return redirect("/dashboard/profile");
	}

	return <main>Hello world</main>;
}
