import { Link } from 'react-router-dom';
import './Header.scss'

export const Header = () => {
  return (
    <div className='container'>
      <nav>
        <Link to='/' className='header__link'>
          Home
        </Link>

        <Link to='/variables' className='header__link'>
          Variables
        </Link>
      </nav>
    </div>
  );
};