import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div>
      This page does't exist. Go <Link to='/'>Home page</Link>
    </div>
  )
};