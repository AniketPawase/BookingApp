import './App.css'
import {Route, Routes} from "react-router-dom";
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import Register from './pages/RegisterPage';
import axios from 'axios';
import { UserContextProvider } from './UserContext';


axios.defaults.baseURL='http://localhost:4000'

function App() {


  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout/>}>
            <Route index element={<IndexPage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/register" element={<Register />}/>
        </Route>
    </Routes>
    </UserContextProvider>
  );
}
 
export default App;
