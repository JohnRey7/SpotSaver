export default function LoginPage() {
	return (
		<section className="flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[url('/cit.png')] bg-cover bg-center">
			<div className="bg-white bg-opacity-80 p-10 rounded-lg w-96 shadow-lg flex flex-col items-center">
				<p className="text-2xl mb-4">SpotSaver</p>
				<form action="/api/auth" className="w-full">
					<button className="btn btn-error w-full">Login with Google</button>
				</form>
			</div>
		</section>
	);
}
