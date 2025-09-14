// Custom styles для react-select
export const customStyles = {
  control: (provided) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // gap: '32px',
    paddingRight: '16px',
    borderRadius: '12px',
    border: 'none',
    background: 'var(--inputs)',
    fontWeight: '500',
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
