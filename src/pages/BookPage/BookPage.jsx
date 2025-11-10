import Navigation from "../../components/Navigation/Navigation"
import Footer from "../../components/Footer/Footer"
import BookForm from "../../components/BookForm/BookForm"
import css from "./BookPage.module.css"

const BookPage = () => {
  return (
    <div>
        <div className={css.hero}>
          <Navigation />
        </div>

      <div className={css.container}>
        <h1 className={css.title}>Order Form</h1>
        <BookForm />
      </div>

      <Footer />
    </div>
  )
}

export default BookPage
