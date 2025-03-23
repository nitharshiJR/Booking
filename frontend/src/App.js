import Footer from './components/footer';
import Header from './components/header';
import PostDetails from './pages/PostDetail';
import PostList from './pages/PostList';
import UserRegistration from './pages/UserRegistration';
import Payment from './pages/Payment';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={<PostList />} />
          <Route path='/posts/:id' element={<PostDetails />} />
          <Route path='/register' element={<UserRegistration />} />
          <Route path='/payment' element={<Payment />} />  {/* 👈 New Route Added */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
