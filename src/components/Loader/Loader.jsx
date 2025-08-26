import { RingLoader } from "react-spinners";
import css from "./Loader.module.css"

export default function Loader() {
  return (
    <div className={css.loader}>
      <RingLoader 
        color="#338551"  
        size={50}
      />
    </div> 
  )
}