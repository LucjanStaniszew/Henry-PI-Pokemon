import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import LandingPage from './Components/React/LandingPage';
import Home from './Components/React/Home';
import PokemonCreate from './Components/React/PokemonCreate'
import Details from './Components/React/Details'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = '/' element= {<LandingPage/>} />
          <Route path = '/home' element= {<Home/>} />
          <Route path = '/pokemons' element= {<PokemonCreate/>} />
          <Route path = '/pokemons/:id' element= {<Details />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
