import { Route, Routes } from "react-router-dom";

import Navigation from "@/components/Navigation";

import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route element={<Navigation />} path="/">
        <Route element={<Home />} index />
      </Route>
    </Routes>
  );
}

export default App;
