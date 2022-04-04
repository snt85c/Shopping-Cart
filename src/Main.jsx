import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPath from "./NoPath";
import First from "./First";
import Second from "./Second";
import Third from "./Third";
import { useState } from "react";
import Navbar from "./Navbar";
import "./index.css";

export default function Main() {
  const [suggest, setSuggest] = useState([]);
  let [onScreen, setOnScreen] = useState([]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <First
                suggest={suggest}
                setSuggest={setSuggest}
                onScreen={onScreen}
                setOnScreen={setOnScreen}
              />
            }
          />
            <Route path="second" element={<Second data={onScreen} />} />
            <Route path="third" element={<Third  />} />

          <Route path="*" element={<NoPath />} />
        </Routes>
        <div className="flex justify-center items-center h-6 p-2 bg-gray-900">Created by Snt</div>
      </BrowserRouter>
    </>
  );
}
