// CarsFilterForm.jsx
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { setFilter } from '../../redux/filters/slice';
import { fetchFilteredCars } from '../../redux/cars/operations';
import { selectFilterState } from '../../redux/filters/selectors';
import css from './CarsFilterForm.module.css';
import Select, { components } from 'react-select';

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

// Custom styles для react-select
const customStyles = {
  control: (provided) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '32px',
    paddingRight: '16px',
    borderRadius: '12px',
    border: 'none',
    background: 'var(--inputs)',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '1.25',
    color: 'var(--main)',
    height: '44px',
    boxShadow: 'none',
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: '8px',
    borderRadius: '12px',
    backgroundColor: 'var(--white)',
    boxShadow: '0px 4px 36px rgba(0, 0, 0, 0.02)',
    overflow: 'hidden',
    width: '204px',
  }),
  menuList: (provided) => ({
    ...provided,
    margin: '0px',
    padding: '14px 18px', // внутрішні відступи списку
    display: 'flex',
    flexDirection: 'column',
    gap: '8px', // відстань між option'ами
  }),
  option: (provided, state) => ({
    ...provided,
    padding: '0',
    fontSize: '16px',
    lineHeight: '1.25',
    color: state.isSelected ? 'var(--main)' : 'var(--gray)',
    backgroundColor: state.isSelected
      ? 'var(--accent)'
      : state.isFocused
      ? 'rgba(0, 113, 227, 0.08)'
      : '#fff',
    cursor: 'pointer',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'var(--main)',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'var(--main)',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: 'var(--main)',
    padding: 0,
  }),
  indicatorSeparator: () => ({ display: 'none' }),
};

export default function CarsFilterForm({ brands }) {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilterState);

  const brandOptions = (brands || []).map((b) => ({ value: b, label: b }));
  const priceOptions = Array.from({ length: 10 }, (_, i) => {
    const value = (i + 1) * 10;
    return { value, label: `${value}` };
  });

  const handleSubmit = (values, action) => {
    console.log(values);

    dispatch(setFilter(values));
    dispatch(fetchFilteredCars({ page: 1, limit: 12, ...values }));
    action.resetForm();
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        brand: filters.brand || '',
        rentalPrice: filters.rentalPrice || '',
        minMileage: filters.minMileage || '',
        maxMileage: filters.maxMileage || '',
      }}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className={css.form}>
          <div className={css.fieldGroup}>
            <label className={css.label}>Car brand</label>
            <Select
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

          <div className={css.fieldGroup}>
            <label className={css.label}>Price/1hour</label>
            <Select
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
            <label className={css.label}>Car mileage / km</label>
            <div className={css.formWrapper}>
              <input
                className={css.inputFrom}
                type="number"
                name="minMileage"
                placeholder="From"
                value={values.minMileage}
                onChange={(e) => setFieldValue('minMileage', e.target.value)}
                aria-label="Mileage from"
              />
              <input
                className={css.inputTo}
                type="number"
                name="maxMileage"
                placeholder="To"
                value={values.maxMileage}
                onChange={(e) => setFieldValue('maxMileage', e.target.value)}
                aria-label="Mileage to"
              />
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
