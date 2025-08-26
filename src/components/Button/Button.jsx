import css from "./Button.module.css";

const Button = ({ text, onClick, type = "button", className = "" }) => {
  return (
    <button
      className={`${css.button} ${className}`} 
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
