// routes.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/profilePage';
import MyBooksPage from './pages/MyBooksPage';
import TasksPage from './pages/TasksPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/my-books" element={<MyBooksPage />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
