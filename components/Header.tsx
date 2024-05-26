export default function Header({ title }: { title: string }) {
	return (
		<header>
			<p className="border-b-2 border-gray-200 pb-2 text-2xl font-bold">{title}</p>
		</header>
	);
}
