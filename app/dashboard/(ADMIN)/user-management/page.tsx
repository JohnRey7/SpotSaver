import Header from "~/components/Header";
import Users from "~/components/admin/Users";
import { baseUrl } from "~/constants";
import { UserSelect } from "~/lib/schema";

export default async function UserManagementPage() {
	let users: UserSelect[] = [];
	try {
		const response = await fetch(`${baseUrl}/api/users/`, {
			cache: "no-cache",
		});
		const data = await response.json();
		users = data.users;
	} catch (error) {
		console.log(error);
	}

	return (
		<section className="w-full p-10">
			<Header title="Users" />

			<Users users={users} />
		</section>
	);
}
