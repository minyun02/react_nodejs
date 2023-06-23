import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Registration from './pages/Registration';


function App() {
  return (
    <div className='App'>
        <Router>
          <div className='navbar'>
            <Link to="/">Home Page</Link>
            <Link to="/createpost">Create a post</Link>
            <Link to="/login">Login</Link>
            <Link to="/registration">Sign up</Link>
          </div>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/createpost' element={<CreatePost/>} />
            <Route path='/post/:id' element={<Post/>} />
            <Route path='/registration' element={<Registration/>} />
            <Route path='/login' element={<Login/>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
