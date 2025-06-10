import './App.css'
import Wordsave from './components/Wordsave'
import AppRoutes from './routes/AppRoutes'
import LearnedWords from './components/LearnedWords'
import AddWord from './components/AddWord'
import Header from './components/Header'
import Register from './pages/Register'
import Login from './pages/Login'
function App() {

  return (
    <>
      <Header/>
      <Login />
      {/**<AppRoutes /> */}
    </>
  )
}

export default App
