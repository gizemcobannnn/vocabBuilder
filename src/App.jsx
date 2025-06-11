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
function App() {

  return (
    <>
      <Header/>
      <Welldone />
      {/**<AppRoutes /> */}
    </>
  )
}

export default App
