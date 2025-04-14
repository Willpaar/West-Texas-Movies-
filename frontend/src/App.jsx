import Homepage from './pages/Homepage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return(
  <div>


    <BrowserRouter>

        <Routes>

          <Route path='/' element={<Homepage/>}/>

        </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App
