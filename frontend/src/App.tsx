
import { Route, Routes } from 'react-router-dom';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HomePage from '@/pages/HomePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from '@/pages/LoginPage';
import SignUpPage from '@/pages/SignUpPage';
import DashboardPage from '@/pages/DashboardPage';
import UserLayout from './layouts/UserLayout';
import AvailabilityPage from './pages/AvailabilityPage';
import RequestsPage from './pages/RequestsPage';
import AboutPage from './pages/AboutPage';
import RoomsManagementPage from './pages/RoomsManagementPage';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container grow">
        <Routes>
          
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          <Route path="/user" element={<UserLayout />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="rooms" element={<RoomsManagementPage />} />
          <Route path="availability" element={<AvailabilityPage />} />
          <Route path="requests" element={<RequestsPage />} />

        </Routes>
      </main>
      <Footer />
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;


