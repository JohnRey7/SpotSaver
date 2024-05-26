export default function LoginPage() {
	return (
		<section className="flex h-screen w-full flex-col items-center justify-center overflow-hidden">
			<p>Login</p>
			<form action="/api/auth">
				<button className="btn btn-error">Login with Google</button>
			</form>
		</section>
	);
}
