import { useState } from 'react'
import Homepage from './pages/Homepage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Itempage from './pages/Itempage'
function App() {
  return(
  <div>


    <BrowserRouter>

        <Routes>

          <Route path='/' element={<Homepage/>}/>
          <Route path='/item/:id' element={<Itempage/>}/>

        </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App
