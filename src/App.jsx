import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useState } from "react";

function App() {
  const [len, setLen] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [pass, setPass] = useState("");

  const passRef = useRef(null); //useRef hook

  const passGen = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (char) str += "!@#$%^&*-_+=[]{}~`";

    let p = "";
    for (let i = 0; i < len; i++) {
      let c = Math.floor(Math.random() * str.length);
      p += str[c];
    }
    setPass(p);
  }, [len, number, char]);

  const copyPassToClip = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(pass);
  }, [pass]);

  useEffect(() => {
    passGen();
  }, [len, number, char]);

  return (
    <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={pass}
          className="outline-none w-full py-1 px-3 bg-white text-black"
          placeholder="Password"
          readOnly
          ref={passRef}
        />
        <button
          onClick={copyPassToClip}
          className="cursor-pointer outline-none bg-blue-700 text-white px-3 py-2 shrink-0"
        >
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={50}
            value={len}
            className="cursor-pointer"
            onChange={(e) => {
              setLen(e.target.value);
            }}
          />
          <label>Length: {len}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            className="cursor-pointer"
            type="checkbox"
            defaultChecked={number}
            id="numberInput"
            onChange={() => {
              setNumber((prev) => !prev);
            }}
          />
          <label className="cursor-pointer" htmlFor="numberInput">
            Numbers
          </label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            className="cursor-pointer"
            type="checkbox"
            defaultChecked={char}
            id="charInput"
            onChange={() => {
              setChar((prev) => !prev);
            }}
          />
          <label className="cursor-pointer" htmlFor="charInput">
            Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
