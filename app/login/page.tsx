"use client";

import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
	const [isLogin, setIsLogin] = useState(true);

	return (
		<section className="flex h-screen w-full items-center justify-center overflow-hidden bg-[url('/bg.png')] bg-cover bg-center relative">
			{/* Animated background elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute top-20 left-10 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl"></div>
				<div className="absolute bottom-10 right-10 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
			</div>

			{/* Main container */}
			<div className="relative z-10 flex gap-12 items-center justify-between w-full px-8 max-w-7xl mx-auto">
				{/* Form Card - Left Side */}
				<div className="bg-white/75 backdrop-blur-lg p-6 rounded-3xl shadow-2xl flex flex-col items-center w-full max-w-md border border-white/20 flex-shrink-0">
					{/* Logo container */}
					<div className="mb-6 p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl">
						<Image
							src="/logo.png"
							alt="SpotSaver Logo"
							width={60}
							height={60}
							className="object-contain"
						/>
					</div>

					{/* Brand title */}
					<h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
						SpotSaver
					</h1>

					{/* Tabs */}
					<div className="flex gap-0 mb-6 w-full bg-gray-100 p-1 rounded-lg">
						<button
							onClick={() => setIsLogin(true)}
							className={`flex-1 py-3 font-semibold rounded-md transition-all duration-300 ${
								isLogin
									? "bg-white text-indigo-600 shadow-lg"
									: "text-gray-600 hover:text-gray-900"
							}`}
						>
							Login
						</button>
						<button
							onClick={() => setIsLogin(false)}
							className={`flex-1 py-3 font-semibold rounded-md transition-all duration-300 ${
								!isLogin
									? "bg-white text-indigo-600 shadow-lg"
									: "text-gray-600 hover:text-gray-900"
							}`}
						>
							Sign Up
						</button>
					</div>

					{/* Content */}
					{isLogin ? (
						<form action="/api/auth" className="w-full flex flex-col gap-4">
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Email Address
									</label>
									<input
										type="email"
										placeholder="you@example.com"
										className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition bg-white hover:border-gray-400"
									/>
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Password
									</label>
									<input
										type="password"
										placeholder="••••••••"
										className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition bg-white hover:border-gray-400"
									/>
								</div>
							</div>

							<button
								type="submit"
								className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 mt-6"
							>
								Login
							</button>

							<div className="relative my-4">
								<div className="absolute inset-0 flex items-center">
									<div className="w-full border-t border-gray-300"></div>
								</div>
								<div className="relative flex justify-center text-sm">
									<span className="px-2 bg-white text-gray-600">Or continue with</span>
								</div>
							</div>

							<button
								type="button"
								className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300"
							>
								🔐 Login with Google
							</button>

							<p className="text-center text-gray-600 text-sm mt-4">
								Don't have an account?{" "}
								<button
									type="button"
									onClick={() => setIsLogin(false)}
									className="text-indigo-600 font-semibold hover:underline"
								>
									Sign up
								</button>
							</p>
						</form>
					) : (
						<form className="w-full flex flex-col gap-4">
							<div className="space-y-4">
								<div className="grid grid-cols-2 gap-3">
									<div>
										<label className="block text-sm font-semibold text-gray-700 mb-2">
											First Name
										</label>
										<input
											type="text"
											placeholder="John"
											className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition bg-white hover:border-gray-400"
										/>
									</div>
									<div>
										<label className="block text-sm font-semibold text-gray-700 mb-2">
											Last Name
										</label>
										<input
											type="text"
											placeholder="Doe"
											className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition bg-white hover:border-gray-400"
										/>
									</div>
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Email Address
									</label>
									<input
										type="email"
										placeholder="you@example.com"
										className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition bg-white hover:border-gray-400"
									/>
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Password
									</label>
									<input
										type="password"
										placeholder="••••••••"
										className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition bg-white hover:border-gray-400"
									/>
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">
										Confirm Password
									</label>
									<input
										type="password"
										placeholder="••••••••"
										className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition bg-white hover:border-gray-400"
									/>
								</div>
							</div>

							<button
								type="button"
								className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 mt-6"
							>
								Create Account
							</button>

							<p className="text-center text-gray-600 text-sm mt-4">
								Already have an account?{" "}
								<button
									type="button"
									onClick={() => setIsLogin(true)}
									className="text-indigo-600 font-semibold hover:underline"
								>
									Login
								</button>
							</p>
						</form>
					)}
				</div>

				
					
						
			</div>
		</section>
	);
}
