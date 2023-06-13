import './App.css';
import GetData from './Components/GetData.js'
import GetByDrop from './Components/GetByDrop';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <h1>DSCO IT33 Filter</h1>
      </header>
      <GetData/>
      <hr></hr>
      <GetByDrop/>
    </div>
  );
}

export default App;
