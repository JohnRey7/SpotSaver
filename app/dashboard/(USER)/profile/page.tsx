import Header from "~/components/Header";
import Profile from "~/components/user/profile";
import { google, validateRequest } from "~/lib/auth";

export default async function UserProfilePage() {
	const { user } = await validateRequest();

	return (
		<section className="w-full p-10">
			<Header title="Personal Information" />

			<section className="flex flex-col gap-10">
				<Profile
					id={user?.id!}
					firstName={user?.firstName!}
					lastName={user?.lastName!}
					middleName={user?.middleName!}
					googleId={user?.googleId!}
					email={user?.email!}
					role={user?.role!}
				/>
			</section>
		</section>
	);
}
