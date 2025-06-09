import {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LearnedWords from '../components/LearnedWords';

export default function AppRoutes() {
  const Wordsave = lazy(()=>import('../components/Wordsave'))
  const LearnedWords = lazy(()=>import('../components/LearnedWords'))
  return (
    <>
      <Suspense fallback={null}>
        <Routes>
            <Route path="/*" element={<Wordsave />}></Route>
            <Route path="/learnedWords" element={<LearnedWords />}></Route>
        </Routes>
      </Suspense>
    </>
  )
}
