import "./App.css";
import GetData from "./Components/GetData.js";
import GetByDrop from "./Components/GetByDrop";
import { Wordmark } from "./Components/Wordmark.tsx";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Wordmark textColor="white" />
        <h1>DSCO IT33 Filter</h1>
      </header>
      <GetData />
      <hr></hr>
      <GetByDrop />
    </div>
  );
}

export default App;
