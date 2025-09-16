// Loader.jsx
import { ClipLoader } from 'react-spinners';
import css from './Loader.module.css';

export function Loader({ size = 50, inline = false }) {
  return (
    <div className={inline ? css.inlineLoader : css.loaderContainer}>
      <ClipLoader color="#36d7b7" size={size} />
    </div>
  );
}
