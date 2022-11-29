import React from 'react';


const InputTextWithLabelFormik = ({name, id ,  placeholder ,label, value, styleSelected, onChange, onBlur, errorMessage}) => {


  return (

    <div className={"form-row-label-input"}>
      <label htmlFor={name} className={"text-micro paragraph_bold color-dark-grey"}>{label}</label>
      <input id={id}
             name={name}
             type={"text"}
             placeholder={placeholder}
             className={styleSelected}
             onBlur={onBlur}
             onChange={onChange}
             value={value}
      />
      {errorMessage}
    </div>);
};
export default InputTextWithLabelFormik;

