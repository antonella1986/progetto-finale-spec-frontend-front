import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GlobalProvider } from './context/GlobalContext'

import DefaultLayout from './layout/DefaultLayout'
import HomePage from './pages/HomePage'
import ProductList from './pages/ProductList'

function App() {

  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route Component={DefaultLayout}>
              <Route path='/' element={<HomePage />} />
              <Route path='/ProductList' element={<ProductList />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App