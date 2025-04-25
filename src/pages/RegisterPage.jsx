import React, { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate } from 'react-router';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            console.error('Las contraseñas no coinciden');
            return;
        }

        try {
            await register({ email, password });
            navigate('/login');
        } catch (error) {
            console.error('Error al registrar el usuario', error);
        }
    };

    return (
        <div className='register-container'>
            <h2>Registarse como usuario</h2>
            <form onSubmit={handleRegister}>
                <input
                   type='email'
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder='Correo@electronico.com'
                />
                <input
                   type='password'
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   placeholder='Contraseña'
                />
                <input
                   type='password'
                   value={confirmPassword}
                   onChange={(e) => setConfirmPassword(e.target.value)}
                   placeholder='Confirmar contraseña'
                />
                <button type='submit'>Registar</button>
            </form>
        </div>
    );
};

export default Register;