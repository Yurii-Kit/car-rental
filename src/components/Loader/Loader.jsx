import { ClipLoader } from 'react-spinners';
import css from './Loader.module.css';

export function Loader() {
  return (
    <div className={css.loaderContainer}>
      <ClipLoader color="#36d7b7" size={50} />
    </div>
  );
}
