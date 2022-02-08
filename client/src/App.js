import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import LandingPage from './Components/React/LandingPage';
import Home from './Components/React/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = '/' element= {<LandingPage/>} />
          <Route path = '/home' element= {<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
