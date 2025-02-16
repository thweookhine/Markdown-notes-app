
import { useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route, PrivateRoute} from 'react-router-dom'
import Header from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './components/LoginForm/LoginForm';
import NoteFileUpload from './components/Note/NoteFileUpload';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import ProtectedRoute from './ProtectedRoute';
import ListAllNotes from './components/Note/ListAllNotes';
import CreateNote from './components/Note/CreateNote';
import RenderNote from './components/Note/RenderNote';
import CheckGrammar from './components/Note/CheckGrammar';
function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("login_access_token"))
  console.log(isAuthenticated)
  return (
  <Router>
   <div className='App'>
      <Header title="MDNotes" isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
      <div className="container d-flex align-items-center flex-column">
      <Routes>
            <Route
              path='/'
              element={<ProtectedRoute element={<ListAllNotes />} isAuthenticated={isAuthenticated} />}
            />
            <Route path='/register' element={<RegistrationForm />}/>
            <Route path='/login' element={<LoginForm/>}/>
            <Route
              path="/uploadNoteFile"
              element={<ProtectedRoute element={<NoteFileUpload />} isAuthenticated={isAuthenticated} />}
            />
            <Route
              path='/home'
              element={<ProtectedRoute element={<ListAllNotes/>} isAuthenticated={isAuthenticated} />}
            />
            <Route
              path='/createNote'
              element={<ProtectedRoute element={<CreateNote/>} isAuthenticated={isAuthenticated} />}
            />
            <Route
              path='/renderNote' 
              element={<ProtectedRoute element={<RenderNote/>} isAuthenticated={isAuthenticated} />}
            />
            <Route
              path='/checkGrammar' 
              element={<ProtectedRoute element={<CheckGrammar/>} isAuthenticated={isAuthenticated} />}
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
