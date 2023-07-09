import {Hero, Navbar,Upload,ChatGpt } from "./components";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/chat" element={<ChatGpt />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;