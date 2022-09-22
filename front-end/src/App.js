import "./App.css";
import "react-toastify/dist/ReactToastify.css"

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
