import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Header from "./Components/header/Header";
import Footer from "./Components/footer/Footer";

function App() {
  return (
    <>

      <div class="content">
        <Header />
      </div>

      <div className="footer mt-3" style={{marginTop:"30px",}}>
        <Footer />
      </div>
      <Routes>
          <Route path="/terms-of-use" element={<Home />} />
          <Route path="/privacy" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;