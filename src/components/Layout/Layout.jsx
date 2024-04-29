import clsx from 'clsx';
import css from './Layout.module.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { apiLogout } from '../../redux/auth/operations';
// import {selectIsSignedIn} from 
const getNavLinkClassName = ({ isActive }) =>
  clsx(css.navLink, {
    [css.active]: isActive,
  });

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(selectIsSignedIn);
  const userData = useSelector(selectUserData);
  const [isModalOpen, setIsModalOpen] = useSelector(false)

  const onCloseModal = ()=> setIsModalOpen(false)
  const onOpenModal = () => setIsModalOpen(true)
  const onLogout = () => {
    dispatch(apiLogout());
    onCloseModal()
  };
  return (
    <div>
      {isModalOpen &&(
        <div>
          <h3>Logo Out?</h3>
          <button onClick={onLogout} type='button'>Yes</button>
          <button onClick={onCloseModal} type='button'>No</button>
        </div>
      )}
      <header>
        <nav className={css.nav}>
          <NavLink className={getNavLinkClassName} to="/">
            Home
          </NavLink>
          {isSignedIn ? (
            <>
              {' '}
              <NavLink className={getNavLinkClassName} to="/contacts">
                Contacts
              </NavLink>
              <div>
                <span>Welcome, {userData.name}</span>
                <button onClick={onOpenModal} type="button">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              {' '}
              <NavLink className={getNavLinkClassName} to="/register">
                Register
              </NavLink>
              <NavLink className={getNavLinkClassName} to="/login">
                Log in
              </NavLink>
            </>
          )}
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
