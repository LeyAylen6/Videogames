import './App.css'; 
import { Route, Routes } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import Form from './components/CreateNewGame/Form';
import Detail from './components/Detail/Detail';
import MyGames from './components/MyGames/MyGames';
import { useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import { useSelector } from 'react-redux';
import Error from './components/Error/Error';

function App() {
  const message = useSelector(state => state.message)

  return (
    <div className="App">
      
      {message ? <Error error={message} /> : null}

      <div>
        {useLocation().pathname !== '/' ? <NavBar /> : null}
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/home' element={<Home />} />
          <Route path='/create' element={<Form />} />
          <Route path='/detail/:id' element={<Detail />} /> 
          <Route path='/mygames' element={<MyGames />} /> 
        </Routes> 
      </div>
    </div>

  );
}

export default App;
