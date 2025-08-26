import { AiOutlinePercentage } from "react-icons/ai";
import css from "./Sales.module.css"

const Sales = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}><AiOutlinePercentage size={35}/>Sales</h1>
    </div>
  )
}

export default Sales