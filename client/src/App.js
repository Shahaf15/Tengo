import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Main, Register, Error } from "./pages";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path='/register' element={<Register />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
