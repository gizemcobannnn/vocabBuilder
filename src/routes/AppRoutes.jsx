import {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LearnedWords from '../components/LearnedWords';
import Training from '../pages/Training';

export default function AppRoutes() {
  const Wordsave = lazy(()=>import('../components/Wordsave'))
  const LearnedWords = lazy(()=>import('../components/LearnedWords'))
  const Dictinory = lazy(()=>import('../pages/Dictionary'))
  const Recomment = lazy(()=>import('../pages/Recommend'))
  const Training = lazy(()=>import('../pages/Training'))
  return (
    <>
      <Suspense fallback={null}>
        <Routes>
            <Route path="/*" element={<Wordsave />}></Route>
            <Route path="/learnedWords" element={<LearnedWords />}></Route>
            <Route path="/dictionary" element={<Dictinory />}></Route>
            <Route path="/recommend" element={<Recomment />}></Route>
            <Route path="/training" element={<Training/>}></Route>
        </Routes>
      </Suspense>
    </>
  )
}
