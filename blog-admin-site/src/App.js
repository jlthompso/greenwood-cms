import CreatePost from './pages/CreatePost';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Home />}/>
          <Route path='createpost' element={<CreatePost />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
