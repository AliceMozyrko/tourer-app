import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../components/Loader/Loader";


const HomePage = lazy(() => import("../pages/HomePage/HomePage"))
const BookPage = lazy(() => import("../pages/BookPage/BookPage"))


function App() {
  return (
    <div>
      <Suspense fallback={<Loader />} >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book" element={<BookPage />} />
        </Routes>
      </Suspense>     
    </div> 
  )
}

export default App
