import React from'react';
import Link from'next/link';

function HomePage() {
	return (
		<main>
			<h1>Página principal</h1>
			<Link href="/about">
				<a>Ir a <em>/about</em></a>
			</Link>
			<style>{`
				h1 { color: red; }
			`}</style>
		</main>
	);
}

export default HomePage;