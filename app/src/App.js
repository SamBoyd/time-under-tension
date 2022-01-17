import logo from './logo.svg';
import './App.css';
import {Provider} from "react-redux";
import Workout from "./components/workout";
import store from "./store"

function App() {
  return (
      <Provider store={store}>
        <div className="App">
          <Workout />
        </div>
      </Provider>
  );
}

export default App;
