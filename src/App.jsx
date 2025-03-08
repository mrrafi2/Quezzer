import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/pages/home';
import Label from './components/pages/Label';
import Signup from './components/pages/signup';
import Login from './components/pages/login';
import Layout from './components/layout';
import AboutUs from './components/about';
import ContactUs from './components/contact';
import { AuthProvider } from './components/contexts/AuthContext';
import {DarkModeProvider} from "./components/contexts/DarkMode";
import Quizzes from './components/quizs';
import Result from './components/pages/result';
import CategoryProgress from './components/pages/ctgProgress';
import PrivateRoute from './components/privateRoute'; 
import Help from './components/pages/help';
import Ranking from './components/pages/Ranking';
import UserCategoryProgress from './components/pages/userProgress';
import PrivacyPolicy from './components/privacy';
import Terms from './components/terms';

const withLayout = (Component) => {
  return <Layout><Component /></Layout>;
};

function App() {
  return (
    <Router>
      <AuthProvider>
      <DarkModeProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={withLayout(Home)} />
          <Route path="/about" element={withLayout(AboutUs)} />
          <Route path="/contact" element={withLayout(ContactUs)} />
          <Route path="/help" element={withLayout(Help)} />
          <Route path="/privacy" element={withLayout(PrivacyPolicy)} />
          <Route path="/terms" element={withLayout(Terms)} />


          {/* Auth pages (no layout) */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />


          {/* Protected pages */}
          <Route
            path="/labels/:category"
            element={
              <PrivateRoute>
                <Label />
              </PrivateRoute>
            }
          />
          <Route
            path="/quiz/:category/:label"
            element={
              <PrivateRoute>
                <Quizzes />
              </PrivateRoute>
            }
          />
          <Route
            path="/result"
            element={
              <PrivateRoute>
                <Result />
              </PrivateRoute>
            }
          />
          <Route
            path="/category-progress"
            element={
              <PrivateRoute>
                <CategoryProgress />
              </PrivateRoute>
            }
          />

         <Route
            path="/ranking"
            element={
              <PrivateRoute>
                <Ranking />
              </PrivateRoute>
            }
          />

         <Route
            path="/user-category-progress/:uid"
            element={
              <PrivateRoute>
                <UserCategoryProgress />
              </PrivateRoute>
            }
          />

        </Routes>
        </DarkModeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
