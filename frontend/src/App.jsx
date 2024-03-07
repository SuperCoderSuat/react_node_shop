import './App.scss'
import Navbar from './components/navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Shop from './pages/shop/Shop'
import ShopCategory from './pages/shop_category/ShopCategory'
import Product from './pages/product/Product'
import Cart from './pages/cart/Cart'
import LoginSignup from './pages/login_signup/LoginSignup'
import Footer from './components/footer/Footer'
import men_banner from './assets/images/banner_mens.png'
import women_banner from './assets/images/banner_women.png'
import kids_banner from './assets/images/banner_kids.png'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />}/>
          <Route path='/mens' element={<ShopCategory banner={men_banner} category="men"/>}/>
          <Route path='/womens' element={<ShopCategory banner={women_banner} category="women"/>}/>
          <Route path='/kids' element={<ShopCategory banner={kids_banner} category="kid"/>}/>
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />}/>
          </Route>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/login' element={<LoginSignup />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
