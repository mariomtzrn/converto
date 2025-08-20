import { Route, Routes } from "react-router-dom";

import Navigation from "@/components/Navigation";
import SignFormWrapper from "@/components/SignFormWrapper";
import Home from "@/pages/Home";
import SignIn from "@/pages/SignIn";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route element={<Navigation />} path="/">
        <Route element={<Home />} index />
      </Route>
      <Route element={<SignFormWrapper />} path="/account">
        <Route element={<SignIn />} path="/account/signin" />
      </Route>
    </Routes>
  );
}

export default App;
