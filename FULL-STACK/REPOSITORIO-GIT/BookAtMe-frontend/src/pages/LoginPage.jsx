import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData);
            navigate('/profile');
        } catch (error) {
            console.error('Login failed', error.message);
        }
    };

    return (
        <div className='login-container'>
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
                <input
                type='email'
                name='email'
                placeholder='Correo@electronico.com'
                value={formData.email}
                onChange={handleChange}
                required
                />

                <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                required
                />

                <button type='submit'>Entrar</button>
            </form>
        </div>
    );
};

export default Login;