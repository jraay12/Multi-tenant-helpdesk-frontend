
import './App.css'
import { Route, Routes } from 'react-router'
import LoginPage from './features/auth/pages/LoginPage'

function App() {

  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/login' element={<LoginPage />}/>
    </Routes>
  )
}

export default App
