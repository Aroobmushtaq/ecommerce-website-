import './App.css';
import Routing from './pages/routing/Routing';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from './store/slices/auth.slice';
function App() {
  const dispatch=useDispatch()
  useEffect(() => {
    const unsubscribe = dispatch(fetchCurrentUser());
    return () => unsubscribe();
  }, []);
   const isLoading = useSelector((state) => state.auth.isLoading);
  return (
    <div>
      <Toaster position='top-center'/>
      <Routing/>
    </div>
  );
}

export default App;
