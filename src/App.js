import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import Welcome from './screens/Welcome';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Welcome />}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
