import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GlobalProvider } from './context/GlobalContext'

import './App.css'
import DefaultLayout from './layout/DefaultLayout'
import HomePage from './pages/HomePage'

function App() {

  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route Component={DefaultLayout}>
              <Route path='/' element={<HomePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App