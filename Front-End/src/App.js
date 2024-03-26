import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer";

function App() {
  return (
    <>

      <div class="content" style={{marginBottom:30}}>
        <Header />
      </div>

      <div className="footer mt-3" style={{marginTop:30}}>
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