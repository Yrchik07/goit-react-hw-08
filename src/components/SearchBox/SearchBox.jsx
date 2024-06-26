import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../redux/filters/slice';
import css from '../SearchBox/SearchBox.module.css';
import { selectNameFilter } from '../../redux/filters/selectors';

const SearchBox = () => {
  const nameFilter = useSelector(selectNameFilter);
  const dispatch = useDispatch();

  return (
    <section className={css.serchBox}>
      <span>Find contacts by name</span>
      <br />
      <input
        type="text"
        placeholder="Search..."
        value={nameFilter}
        onChange={e => dispatch(changeFilter(e.target.value))}
      />
    </section>
  );
};
export default SearchBox;
