import Homepage from './pages/Homepage.jsx'
import Login from './pages/Login.jsx'
import Upcoming from './pages/Upcoming.jsx'
import Search from './pages/Search.jsx'
import Browse from './pages/Browse.jsx'
import Profile from './pages/Profile.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return(
  <div>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Upcoming' element={<Upcoming/>}/>
          <Route path='/Search' element={<Search/>}/>
          <Route path='/Browse' element={<Browse/>}/>
          <Route path='/Profile' element={<Profile/>}/>
        </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App
