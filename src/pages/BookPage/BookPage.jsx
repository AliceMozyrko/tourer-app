import Navigation from "../../components/Navigation/Navigation"
import Footer from "../../components/Footer/Footer"
import BookForm from "../../components/BookForm/BookForm"
import css from "./BookPage.module.css"

const BookPage = ({language, setLanguage, t}) => {
  return (
    <div>
        <div className={css.hero}>
          <Navigation language={language} setLanguage={setLanguage} t={t}/>
        </div>

      <div className={css.container}>
        <h1 className={css.title}>{t.booking.title}</h1>
        <BookForm t={t}/>
      </div>

      <Footer t={t}/>
    </div>
  )
}

export default BookPage
