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
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />
        <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
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
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
