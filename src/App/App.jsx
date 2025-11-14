import { useState } from "react";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import en from "../locales/eng.json";
import uk from "../locales/uk.json";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"))
const BookPage = lazy(() => import("../pages/BookPage/BookPage"))


function App() {
  const [language, setLanguage] = useState("en");

  const t = language === "en" ? en : uk;

    return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage 
              language={language}
              setLanguage={setLanguage}
              t={t}
            />
          } 
        />

        <Route 
          path="/book" 
          element={
            <BookPage 
              language={language}
              setLanguage={setLanguage}
              t={t}
            />
          } 
        />
      </Routes>
    </Suspense>
  );
}

export default App
