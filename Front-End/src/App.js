import "./App.css";
import Header from "./Components/header/Header";
import Footer from "./Components/footer/Footer";

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
