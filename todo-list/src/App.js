import "./App.css";
import Todos from "./components/Todos";
import Header from "./components/Header";
function App() {
  return (
    <div className="App">
      <Header />

      <Todos />
    </div>
  );
}

export default App;
