import { Route, Routes } from "react-router-dom";

import Navigation from "@/components/Navigation";
import SignFormWrapper from "@/components/SignFormWrapper";
import Home from "@/pages/Home";
import NewAccount from "@/pages/NewAccount";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import UnitPage from "@/pages/UnitPage";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route element={<Navigation />} path="/">
        <Route element={<Home />} index />
        <Route element={<UnitPage unitName="length" />} path="/length" />
      </Route>
      <Route element={<SignFormWrapper />} path="/account">
        <Route element={<SignIn />} path="/account/signin" />
        <Route element={<SignUp />} path="/account/signup" />
        <Route element={<NewAccount />} path="/account/new" />
      </Route>
    </Routes>
  );
}

export default App;
