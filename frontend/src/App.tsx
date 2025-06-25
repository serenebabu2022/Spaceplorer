import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/HomePage/HomePage";
import ApodGallery from "./pages/ApodGallery/ApodGallery";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exploreAPOD" element={<ApodGallery />} />
      </Routes>
    </BrowserRouter>
  );
}
