import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
	const [length, setLength] = useState(8);
	const [numbersAllowed, setNumbersAllowed] = useState(false);
	const [charactersAllowed, setCharactersAllowed] = useState(false);
	const [password, setPassword] = useState("");

	// useRef hook
	const passwordRef = useRef(null);

	const copyToClipboard = useCallback(() => {
		alert("Password copied to clipboard!");
		passwordRef.current?.select();
		window.navigator.clipboard.writeText(password);
	}, [password]);

	const passwordGenerator = useCallback(() => {
		let pass = "";
		let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvqxyz";
		if (numbersAllowed) str += "0123456789";
		if (charactersAllowed) str += "!@#$%^&*()-_=+[{]}~";

		for (let i = 1; i < length; i++) {
			let char = str.charAt(Math.floor(Math.random() * str.length + 1));
			pass += char;
		}

		setPassword(pass);
	}, [length, numbersAllowed, charactersAllowed, setPassword]);

	useEffect(() => {
		passwordGenerator();
	}, [length, numbersAllowed, charactersAllowed, passwordGenerator]);
	return (
		<>
			<div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-blue-300 bg-gray-800">
				<h1 className="text-white text-center py-2">
					Password Generator
				</h1>
				<div className="flex shadow rounded-lg overflow-hidden mb-4 text-blue-900">
					<input
						type="text"
						value={password}
						className="outline-none w-full py-1 px-3"
						placeholder="Password"
						readOnly
						ref={passwordRef}
					/>
					<button
						className="outline-none bg-slate-500 px-3 py-0.5 shrink-0 text-slate-200"
						onClick={copyToClipboard}
					>
						Copy
					</button>
				</div>
				<div className="flex justify-start text-sm gap-x-2">
					<div className="flex items-center gap-x-1">
						<input
							type="range"
							min={6}
							max={20}
							value={length}
							className="cursor-pointer"
							onChange={(e) => {
								setLength(e.target.value);
							}}
						/>
						<label>Length: {length}</label>
					</div>
					<div className="flex items-center gap-x-1">
						<input
							type="checkbox"
							defaultChecked={numbersAllowed}
							onChange={() => {
								setNumbersAllowed((prev) => !prev);
							}}
						/>
						<label>Numbers</label>
					</div>
					<div className="flex items-center gap-x-1">
						<input
							type="checkbox"
							defaultChecked={charactersAllowed}
							id="characterInput"
							onChange={() => {
								setCharactersAllowed((prev) => !prev);
							}}
						/>
						<label>Characters</label>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
