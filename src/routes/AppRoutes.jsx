import {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

export default function AppRoutes() {
  const Wordsave = lazy(()=>import('../components/Wordsave'))
  return (
    <>
      <Suspense fallback={null}>
        <Routes>
            <Route path="/*" element={<Wordsave />}></Route>
        </Routes>
      </Suspense>
    </>
  )
}
