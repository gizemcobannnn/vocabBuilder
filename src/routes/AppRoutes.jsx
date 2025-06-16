import {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LearnedWords from '../components/LearnedWords';
import Training from '../pages/Training';

export default function AppRoutes() {
  const Register = lazy(()=>import("../pages/Register"))
  const Login = lazy(()=>import("../pages/Login"))
  const Wordsave = lazy(()=>import('../components/Wordsave'))
  const LearnedWords = lazy(()=>import('../components/LearnedWords'))
  const Dictinory = lazy(()=>import('../pages/Dictionary'))
  const Recomment = lazy(()=>import('../pages/Recommend'))
  const Training = lazy(()=>import('../pages/Training'))
  return (
    <>
      <Suspense fallback={null}>
        <Routes>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/addWord" element={<Wordsave />}></Route>
            <Route path="/learnedWords" element={<LearnedWords />}></Route>
            <Route path="/dictionary" element={<Dictinory />}></Route>
            <Route path="/recommend" element={<Recomment />}></Route>
            <Route path="/training" element={<Training/>}></Route>
            <Route path="/*" element={<Dictinory/>}></Route>
        </Routes>
      </Suspense>
    </>
  )
}
