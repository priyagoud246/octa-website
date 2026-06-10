import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar  from './components/Navbar';
import Footer  from './components/Footer';
import Home           from './pages/Home';
import Courses        from './pages/Courses';
import Technology     from './pages/Technology';
import About          from './pages/About';
import Contact        from './pages/Contact';
import Login          from './pages/Login';
import Register       from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="mesh-bg" />
        <div className="noise" />
        <div className="app-content">
          <Navbar />
          <main style={{ paddingTop: 88 }}>
            <Routes>
              <Route path="/"           element={<Home />} />
              <Route path="/courses"    element={<Courses />} />
              <Route path="/technology" element={<Technology />} />
              <Route path="/about"      element={<About />} />
              <Route path="/contact"    element={<Contact />} />
              <Route path="/login"      element={<Login />} />
              <Route path="/register"   element={<Register />} />
              <Route path="/admin"      element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}