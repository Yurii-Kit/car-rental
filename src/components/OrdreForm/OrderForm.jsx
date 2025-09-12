import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './OrderForm.module.css';

// Formik
const initialValues = {
  name: '',
  email: '',
  date: '',
  comment: '',
};

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  date: Yup.date().nullable().typeError('Invalid date format'),
});
export default function OrderForm({ onSubmit }) {
  const handleSubmit = (values, actions) => {
    onSubmit(values);
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formField}>
          <Field
            type="text"
            name="name"
            className={css.inputField}
            placeholder="Name*"
          />
          <ErrorMessage
            name="name"
            component="div"
            className={css.errorMessage}
          />
        </div>
        <div className={css.formField}>
          <Field
            type="email"
            name="email"
            className={css.inputField}
            placeholder="Email*"
          />
          <ErrorMessage
            name="email"
            component="div"
            className={css.errorMessage}
          />
        </div>
        <div className={css.formField}>
          <Field
            type="date"
            name="date"
            className={css.inputField}
            placeholder="Booking date"
          />
        </div>
        <div className={css.formField}>
          <Field
            as="textarea"
            name="comment"
            className={css.inputField}
            placeholder="Comment"
          />
        </div>
        <button type="submit" className={css.formBtn}>
          Send
        </button>
      </Form>
    </Formik>
  );
}
