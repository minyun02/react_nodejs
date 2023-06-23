import React from 'react'
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Registration() {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = data => {
    axios.post("http://localhost:3001/auth", data).then(() => {
      console.log(data);
    })
  }
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className='formContainer'>
          <label>Username; </label>
          <ErrorMessage name='username' component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="USERNAME..."
          />

          <label>password: </label>
          <ErrorMessage name='password' component="span" />
          <Field
            autocomplete="off"
            type="password"
            id="inputCreatePost"
            name="password"
            placeholder="PASSWORD..."
          />

          <button type='submit'>Sign up</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Registration