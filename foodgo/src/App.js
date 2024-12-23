import './App.css';
import Home from './screens/Home';
import {BrowserRouter as Router ,Routes,Route}from 'react-router-dom';
import Login from './screens/Login';
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';
import Address from './screens/Address';
//import Cart from './screens/Cart'
function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route  path="/" element={<Home />} />
            <Route  path="/login" element={<Login />} />
            <Route  path="/createuser" element={<Signup />} />
            <Route  path="/address" element={<Address/>} />            
           <Route  path="/myOrder" element={<MyOrder/>} />
          </Routes>
        </div>
      </Router>
      </CartProvider>
   
  );
}

export default App;
