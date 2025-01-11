import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (characters) str += "!@#$%^&*()_+";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass = str.charAt(char) + pass;
    }
    setPassword(pass);
  }, [number, characters, length, setPassword]);

  const passRef = useRef(null);


  const copyToClipboard = useCallback(() => {
    passRef.current?.select();
    // passRef.current?.setSelectionRange(0,5)
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, number, characters, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto my-8 px-4 py-3 rounded-lg shadow-md justify-center text-orange-500 bg-gray-800">
      <h1 className="text-white text-center my-3">Password Generator </h1>
      <div className="flex shadow-md overflow-hidden  rounded-md">
        <input
          type="text"
          value={password}
          placeholder="password"
          className="outline-none w-full py-1 px -3 "
          readOnly
          ref={passRef}
        ></input>
        <button
          onClick={copyToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
        >
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={number}
            onChange={(e) => setNumber((prev) => !prev)}
          />
          <label>Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={characters}
            onChange={(e) => setCharacters((prev) => !prev)}
          />
          <label>Character</label>
        </div>
      </div>
    </div>
  );
}

export default App;
length: 8
number: false
characters: false
password: "Q3t8Q8Z1"
passwordGenerator:  passwordGenerator()
passRef: {current: input}
