import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import { enUS } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import css from './OrderForm.module.css';

// Formik
const initialValues = {
  name: '',
  email: '',
  date: null,
  comment: '',
};

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  date: Yup.date()
    .nullable()
    .typeError('Invalid date format')
    .required('Date is required'),
});

// Створюємо кастомну локаль
const customLocale = {
  ...enUS,
  options: {
    ...enUS.options,
    weekStartsOn: 1, // понеділок першим
  },
  localize: {
    ...enUS.localize,
    day: (n) => {
      const shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      return shortDays[n];
    },
  },
};

// Реєструємо локаль під будь-якою назвою
registerLocale('enMonday', customLocale);

export default function OrderForm({ onSubmit }) {
  const handleSubmit = (values, actions) => {
    onSubmit(values);
    toast.success('Send is OK!!!');
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
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
            <DatePicker
              selected={values.date}
              onChange={(date) => setFieldValue('date', date)}
              placeholderText="Booking date"
              className={css.inputField}
              calendarClassName={css.myCalendar}
              dateFormat="yyyy-MM-dd"
              locale="enMonday" // використовуємо кастомну локаль
              minDate={new Date()} // ❗ забороняє минулі дати
            />
            <ErrorMessage
              name="date"
              component="div"
              className={css.errorMessage}
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
      )}
    </Formik>
  );
}
