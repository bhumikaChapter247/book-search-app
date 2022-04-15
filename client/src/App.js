import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import Search from './Search/search';
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewBook from './Details/viewBook';
import AppRoutes from './config/appRoutes';
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoutes.MAIN} element={<Home />} />
          <Route path={AppRoutes.SEARCH} element={<Search />} />
          <Route path={AppRoutes.DETAILS} element={<ViewBook />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
