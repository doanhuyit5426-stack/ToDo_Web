import { BrowserRouter, Routes, Route } from 'react-router';
import Home_Page from './Pages/Home_Page';
import NotFound from './Pages/NotFound';
import { Toaster } from 'sonner';

function App() {
  return (
    <>
    <Toaster richColors />

      <BrowserRouter>
        <Routes>
          <Route 
            path="/"
            element={<Home_Page />} 
          />
          
          <Route 
            path="*"
            element={<NotFound />} 
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;