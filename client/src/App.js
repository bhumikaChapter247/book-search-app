import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import Search from './Search/search';
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewBook from './Details/viewBook';
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/book/:id' element={<ViewBook />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
