import { DNA } from 'react-loader-spinner';
import css from './Loader.module.css';
function Loader() {
  return (
    <div className={css.load}>
      <DNA
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
}

export default Loader;
