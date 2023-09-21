import './App.css';
import Login from './paginas/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './paginas/Signup'
import ResetPass from './paginas/ResetPass';
import MainSite from './paginas/MainSite';
import Usuario from './paginas/Usuario';
import ConnectionTest from './ConnectionTest';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<MainSite />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/resetpass" element={<ResetPass />}></Route>
        <Route path="/usuario/:registro" element={<Usuario />}></Route>
        <Route path="/connection-test" element={<ConnectionTest />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
