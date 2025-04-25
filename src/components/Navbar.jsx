import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
          <div className="navbar-logo">
            <Link to="/">📚 BookAtMe</Link>
          </div>
          <ul className="navbar-links">
            {user ? (
              <>
                <li><Link to="/profile">Perfil</Link></li>
                <li><Link to="/books">Libros</Link></li>
                <li><Link to="/my-books">Mis Libros</Link></li>
                <li><Link to="/tasks">Tareas</Link></li>
                <li><button onClick={handleLogout}>Cerrar sesión</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Iniciar sesión</Link></li>
                <li><Link to="/register">Registrarse</Link></li>
              </>
            )}
          </ul>
        </nav>
      );
    };

export default Navbar;