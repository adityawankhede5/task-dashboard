import './App.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { initTasks } from './store/slices/task.slice';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AllTasksPage from './pages/AllTasksPage';
import CompletedTasksPage from './pages/CompletedTasksPage';
import Navbar from './components/Navbar';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initTasks());
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={<AllTasksPage />}
        />
        <Route
          path='/completed'
          element={<CompletedTasksPage />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
