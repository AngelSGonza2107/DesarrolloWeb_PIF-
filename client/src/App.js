import './App.css';
import Login from './Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Signup'
import ResetPass from './ResetPass';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/resetpass" element={<ResetPass />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
