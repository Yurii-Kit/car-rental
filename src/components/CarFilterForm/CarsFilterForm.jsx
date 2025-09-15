// CarsFilterForm.jsx
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { setFilter } from '../../redux/filters/slice';
import { fetchFilteredCars } from '../../redux/cars/operations';
import { customStyles } from './CustomsStylesForm';
import css from './CarsFilterForm.module.css';
import Select, { components } from 'react-select';
import clsx from 'clsx';
import { useId } from 'react';

const DropdownIndicator = (props) => {
  const { menuIsOpen } = props.selectProps;

  return (
    <components.DropdownIndicator {...props}>
      <svg
        width="16"
        height="16"
        style={{
          transform: menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease',
        }}
      >
        <use xlinkHref="#icon-chevron-down" />
      </svg>
    </components.DropdownIndicator>
  );
};

// Хелпери для форматування
const formatNumber = (value) => {
  if (!value) return '';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const parseNumber = (value) => {
  return value.replace(/,/g, ''); // забираємо коми перед збереженням
};

export default function CarsFilterForm({ brands }) {
  const dispatch = useDispatch();
  // const filters = useSelector(selectFilterState);
  const fieldId = useId();

  const brandOptions = (brands || []).map((b) => ({ value: b, label: b }));
  const priceOptions = Array.from({ length: 10 }, (_, i) => {
    const value = (i + 1) * 10;
    return { value, label: `${value}` };
  });

  const handleSubmit = (values, actions) => {
    console.log(values);

    // Зберігаємо фільтри в Redux (для пагінації)
    dispatch(setFilter(values));
    dispatch(fetchFilteredCars({ page: 1, limit: 12, ...values }));

    // Скидаємо форму, але "початкові значення" лишаються такими, які зараз у Redux
    actions.resetForm({
      values: {
        brand: '',
        rentalPrice: '',
        minMileage: '',
        maxMileage: '',
      },
    });
  };

  return (
    <Formik
      initialValues={{
        brand: '',
        rentalPrice: '',
        minMileage: '',
        maxMileage: '',
      }}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className={css.form}>
          <div className={css.fieldGroup}>
            <label className={css.label} htmlFor={`${fieldId}-brand`}>
              Car brand
            </label>
            <Select
              inputId={`${fieldId}-brand`}
              options={brandOptions}
              value={brandOptions.find((o) => o.value === values.brand) || null}
              onChange={(option) =>
                setFieldValue('brand', option ? option.value : '')
              }
              components={{ DropdownIndicator }}
              isClearable
              styles={customStyles}
              placeholder={'Choose a brand'}
            />
          </div>

          <div className={clsx(css.fieldGroup, css.fieldGroup2)}>
            <label className={css.label} htmlFor={`${fieldId}-price`}>
              Price/1hour
            </label>
            <Select
              inputId={`${fieldId}-price`}
              options={priceOptions}
              value={
                priceOptions.find(
                  (o) => String(o.value) === String(values.rentalPrice),
                ) || null
              }
              onChange={(option) =>
                setFieldValue('rentalPrice', option ? String(option.value) : '')
              }
              components={{ DropdownIndicator }}
              isClearable
              styles={customStyles}
              placeholder={'Choose a price'}
            />
          </div>
          <div className={css.fieldDouble}>
            <label className={css.label} htmlFor={`${fieldId}-minMileage`}>
              Car mileage / km
            </label>
            <div className={css.formWrapper}>
              <div className={css.inputWrapper}>
                <Field name="minMileage">
                  {({ field, form }) => (
                    <input
                      {...field}
                      id={`${fieldId}-minMileage`}
                      className={css.inputFrom}
                      type="text"
                      value={formatNumber(field.value)}
                      onChange={(e) => {
                        // залишаємо тільки цифри
                        const rawValue = e.target.value.replace(/\D/g, '');
                        form.setFieldValue('minMileage', rawValue);
                      }}
                      aria-label="Mileage from"
                    />
                  )}
                </Field>
              </div>

              <div className={css.inputWrapper}>
                <Field name="maxMileage">
                  {({ field, form }) => (
                    <input
                      {...field}
                      className={css.inputTo}
                      type="text"
                      value={formatNumber(field.value)}
                      onChange={(e) => {
                        // залишаємо тільки цифри
                        const rawValue = e.target.value.replace(/\D/g, '');
                        form.setFieldValue('maxMileage', rawValue);
                      }}
                      aria-label="Mileage to"
                    />
                  )}
                </Field>
              </div>
            </div>
          </div>

          <div className={css.buttons}>
            <button type="submit">Search</button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
