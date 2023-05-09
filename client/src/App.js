import './App.css'; 
import { Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import Form from './components/Form';
import Detail from './components/Detail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/create' element={<Form />} />
        <Route path='/detail/:id' element={<Detail />} /> // Ver despues
      </Routes> 
    </div>
  );
}

export default App;
