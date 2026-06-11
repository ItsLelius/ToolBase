import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MainPage from "./pages/MainPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}