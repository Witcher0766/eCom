
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Header, Footer } from './components';
import { Home, Contact, Login, Register, Reset, Admin, Cart} from './pages';
import './App.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminOnlyRoute from './components/adminOnlyRoute/AdminOnlyRoute';
import ProductDetails from './components/product/productDetails/ProductDetails';
import CheckoutDetails from './pages/checkout/CheckoutDetails';
import Checkout from './pages/checkout/Checkout';
import CheckoutSuccess from './pages/checkout/CheckoutSuccess';
import OrderHistory from './pages/orderHistory/OrderHistory';
import OrderDetails from './components/admin/orderDetails/OrderDetails';
import NotFound from './pages/notfound/NotFound';


function App() {
  return (
    <>
    <BrowserRouter>
    <ToastContainer/>
    <Header/>
    <Routes>
      <Route path='/' element={ <Home/> } />
      <Route path='/contact' element={ <Contact/> } />
      <Route path='/login' element={ <Login/> } />
      <Route path='/register' element={ <Register/> } />
      <Route path='/reset' element={ <Reset/> } />

      <Route path='/admin/*' element={
        <AdminOnlyRoute>
         <Admin/> 
         </AdminOnlyRoute>
         } />
      <Route path='/product-details/:id' element={ <ProductDetails/> } />

      <Route path='/cart' element={ <Cart/> } />
      <Route path='/checkout-details' element={ <CheckoutDetails/> } />
      <Route path='/checkout' element={ <Checkout /> } />
      <Route path='/checkout-success' element={ <CheckoutSuccess /> } />
      <Route path='/order-history' element={ <OrderHistory /> } />
      <Route path="/order-details/:id" element={<OrderDetails />} />
      <Route path="*" element={<NotFound />} />

    </Routes>
    <Footer />
    </BrowserRouter>
    </>
  );
}

export default App;
