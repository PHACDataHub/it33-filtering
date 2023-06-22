import "./App.css";
import GetData from "./Components/GetData.js";
import GetByDrop from "./Components/GetByDrop";
import { Wordmark } from "./Components/Wordmark.tsx";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Wordmark textColor="black" />
        <h1>DSCO IT33 Filter</h1>
      </header>

      <section class="alert alert-info">
        <h3>This is a work in progress.</h3>
        <p>Information may be incorrect or inaccurate.</p>
      </section>

      <div className="getData">
        <GetData />
      </div>
      <GetByDrop />
    </div>
  );
}

export default App;
