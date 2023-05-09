import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import Welcome from './screens/Welcome';
import Cadastro from './screens/Cadastro';
import { initializeApp } from 'firebase/app';


export const firebaseApp = initializeApp({
  apiKey: "AIzaSyAcFLtSRefVFLxy24K214wOphll862aSPM",
  authDomain: "bookstore-821a3.firebaseapp.com",
  projectId: "bookstore-821a3",

});

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Welcome />}/>
            <Route path='/cadastro' element={<Cadastro />}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

