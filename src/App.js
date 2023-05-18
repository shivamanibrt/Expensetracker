import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './Components/Layout/Layout';
import { Login } from './Components/Profile/Login';
import { Register } from './Components/Profile/Register';
import { Dashboard } from './Components/Profile/Dashboard/Dashboard';
import { Logout } from './Components/Profile/Logout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PrivateRoute } from './Components/Profile/PrivateRoute/PrivateRoute';
import { useDispatch } from 'react-redux';
import { auth } from './Components/Firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { autoLogin } from './Components/Redux/User/userAction';


function App() {
  const dispatch = useDispatch();
  onAuthStateChanged(auth, (user) => {
    user?.uid && dispatch(autoLogin(user.uid));
  });

  return (
    <div>
      <Layout >
        <Routes>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='dashboard' element={<PrivateRoute ><Dashboard /></PrivateRoute>} />
          <Route path='logout' element={<Logout />} />
        </Routes>
      </Layout>
      <ToastContainer />
    </div>
  );
}
export default App;
