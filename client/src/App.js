import './App.css'; 
import { Route, Routes } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import Form from './components/CreateNewGame/Form';
import Detail from './components/Detail/Detail';
import { useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <div className="App">
      {useLocation().pathname !== '/' ? <NavBar /> : null}

      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/create' element={<Form />} />
        <Route path='/detail/:id' element={<Detail />} /> 
      </Routes> 
    </div>
  );
}

export default App;
