import { Route, Routes } from "react-router-dom";

import Navigation from "@/components/Navigation";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route element={<Navigation />} path="/"></Route>
    </Routes>
  );
}

export default App;
