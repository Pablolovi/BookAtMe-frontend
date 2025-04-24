// routes.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/profilePage';
import BooksPage from './pages/BooksPage';
import MyBooksPage from './pages/MyBooksPage';
import TasksPage from './pages/TasksPage';
import Navbar from './components/Navbar';

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/my-books" element={<MyBooksPage />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
