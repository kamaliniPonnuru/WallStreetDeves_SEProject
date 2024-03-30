import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div id="app-wrapper"> 
      <div class="content">
        <Header />
      </div>


      <div className="footer mt-3">
        <Footer />
      </div>
    </div>
  );
}

export default App;
