import './App.css'
import Wordsave from './components/Wordsave'
import AppRoutes from './routes/AppRoutes'
import LearnedWords from './components/LearnedWords'
import AddWord from './components/AddWord'
import Header from './components/Header'
import Register from './pages/Register'
import Login from './pages/Login'
import Recommend from './pages/Recommend'
import Dictionary from './pages/Dictionary'
import Welldone from './components/Welldone'
import Training from './pages/Training'
import SideMenu from './components/SideMenu'
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <>
      <Header/>
      <ToastContainer position="top-right" autoClose={2000}  />
      <AppRoutes />
      {/**<AppRoutes /> */}
    </>
  )
}

export default App
