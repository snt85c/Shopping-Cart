import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPath from "./NoPath";
import SecondPage from "./SecondPage";
import Third from "./Third";
import Fourth from "./Fourth";
import { useState } from "react";

export default function Main() {
  const [suggest, setSuggest] = useState([]);
  let [onScreen, setOnScreen] = useState([]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route
              path="main"
              element={
                <SecondPage
                  suggest={suggest}
                  setSuggest={setSuggest}
                  onScreen={onScreen}
                  setOnScreen={setOnScreen}
                />
              }
            />
              <Route path="/third" element={<Third data={onScreen}/>} />
              <Route path="/fourth" element={<Fourth />} />
          </Route>
          <Route path="*" element={<NoPath />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
