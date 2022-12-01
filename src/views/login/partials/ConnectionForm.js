import React from 'react';
import {LoginValidationSchema} from "../../../schemas/login/LoginValidationSchema";
import {useFormik} from "formik";
import InputTextWithLabelFormik from "../../../components/atoms/InputTextWithLabelFormik";
import ButtonWithOnClickAction from "../../../components/atoms/ButtonWithOnClickAction";

const ConnectionForm = () => {

  const onSubmit = (values) => {
    localStorage.setItem("pseudo", values.pseudonyme);
    localStorage.setItem("role", ["CONNECTED"]);
    window.location.reload();
  }


  const {handleChange, values, touched, isSubmitting, errors, handleBlur, handleReset, handleSubmit} = useFormik({
    initialValues: {
      pseudonyme: ""
    }, validationSchema: LoginValidationSchema, onSubmit,
  });

  return (
    <div className="login-form">

      <div className={"login-form-title"}>
        <h4>Connexion</h4>
      </div>

      <div className="login-form-container">
        <form onSubmit={handleSubmit}>
          <div className={"form-row-element form-row-single-element"}>
            <InputTextWithLabelFormik
              id={"pseudonyme"}
              errorMessage={errors.pseudonyme && touched.pseudonyme &&
                <p className={"text-primary color-error"}>{errors.pseudonyme}</p>}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.pseudonyme}
              label={"pseudonyme"}
              placeholder={"Pseudonyme"}
              name={"pseudonyme"}
              styleSelected={"input-text-custom-secondary " + (errors.pseudonyme && touched.pseudonyme ? "input-error" : "")}
            />
          </div>
          <ButtonWithOnClickAction
            title={"Suivant"}
            isActive={!isSubmitting}
            onClick={handleReset}
            styleButton={"btn-default btn-default-primary color-primary btn-default-full-width"}
          />
        </form>
      </div>
    </div>
  );
};

export default ConnectionForm;
