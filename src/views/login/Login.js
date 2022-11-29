import React from 'react';
import ConnectionForm from "./partials/ConnectionForm";

const Login = () => {
  return (
    <section className={"section-login"}>
      <div className={"section-login-form"}>
        <ConnectionForm/>
      </div>
    </section>
  );
};

export default Login;
