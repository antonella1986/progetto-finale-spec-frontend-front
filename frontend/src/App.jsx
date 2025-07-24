import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GlobalProvider } from './context/GlobalContext'

import DefaultLayout from './layout/DefaultLayout'
import HomePage from './pages/HomePage'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import Favourites from './pages/Favourites'
import Comparator from './pages/Comparator'

function App() {

  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route Component={DefaultLayout}>
              <Route path='/' element={<HomePage />} />
              <Route path='/products' element={<ProductList />} />
              <Route path='/products/:id' element={<ProductDetail />} />
              <Route path='/favourites' element={<Favourites/>} />
              <Route path='/compare' element={<Comparator/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App