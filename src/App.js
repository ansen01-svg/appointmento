import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing page';
import AddAppointmentsPage from './pages/add and edit appointments';
import AppointmentsDisplayPage from './pages/appointments display';
import ProfilePage from './pages/profile page';
import RegisterAndLoginPage from './pages/register or login';
import About from './pages/about page';
import SharedLayout from './pages/shared layout';
import ProtectedRoute from './pages/protected route';
import Placeholder from './pages/placeholder';
import { ToastContainer, Flip } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }>
            <Route index element={ <AppointmentsDisplayPage /> } />
            <Route path='addAppointments' element={ <AddAppointmentsPage /> } />
            <Route path='profile' element={ <ProfilePage /> } />
            <Route path='about' element={ <About /> } />
            <Route path='/appointment/:appId' element={ <Placeholder /> } />
          </Route>
          <Route path='welcome' element={ <LandingPage /> } />
          <Route path='signup' element={ <RegisterAndLoginPage /> } />
        </Routes>
        <ToastContainer position='top-center' transition={Flip}
        style={{width:'250px', height:'60px', borderRadius:'5px'}}
        autoClose={5000} draggable={false} />
      </Router>
    </div>
  );
}

export default App;
