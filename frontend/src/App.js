import logo from './logo.svg';
import './App.css';
import Navbar from './shared/Navbar';
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    </BrowserRouter>

  );
}

export default App;
