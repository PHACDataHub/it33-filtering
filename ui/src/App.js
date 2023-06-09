import "./App.css";
import GetData from "./Components/GetData.js";
import GetByDrop from "./Components/GetByDrop";
import { Wordmark } from "./Components/Wordmark.tsx";
import { Phacsignature } from "./Components/PhacSig.tsx";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-sig">
          <Phacsignature />
        </div>
        <h1>DSCO ITSG33 Filter</h1>
      </header>

      <section class="alert alert-info">
        <h3>This is a work in progress.</h3>
        <p>Information may be incorrect or inaccurate.</p>
      </section>

      <div className="getData">
        <GetData />
      </div>
      <GetByDrop />
      <footer>
        <div className="footer-wm">
          <Wordmark textColor="black" />
        </div>
      </footer>
    </div>
  );
}

export default App;
