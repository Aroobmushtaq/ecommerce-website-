import './App.css';
import Routing from './pages/routing/Routing';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <div>
      <Toaster position='top-center'/>
      <Routing/>
    </div>
  );
}

export default App;
