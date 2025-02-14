
import { useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route, PrivateRoute} from 'react-router-dom'
import Header from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './components/LoginForm/LoginForm';
import NoteFileUpload from './components/Note/NoteFileUpload';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import ProtectedRoute from './ProtectedRoute';
function App() {

  const isAuthenticated = !!localStorage.getItem("login_access_token");
  console.log(isAuthenticated);
  return (
  <Router>
   <div className='App'>
      <Header title="MDNotes"/>
      <div className="container d-flex align-items-center flex-column">
      <Routes>
            <Route path="/" element={<RegistrationForm/>}/>
            <Route path='/register' element={<RegistrationForm />}/>
            <Route path='/login' element={<LoginForm/>}/>
            <Route
              path="/noteFileUpload"
              element={<ProtectedRoute element={<NoteFileUpload />} isAuthenticated={isAuthenticated} />}
            />
            {/* <PrivateRoute path="/home">
              <Home/>
            </PrivateRoute> */}
      </Routes>
      
      </div>
   </div>
  </Router>
  );
}

export default App;
