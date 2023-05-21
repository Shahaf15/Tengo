import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Register, Error, ProtectedRoute } from "./pages";
import { SharedLayout, Stats, Profile, AllAdvs, AddAdv } from './pages/main'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Stats />} />
          <Route path='all-advs' element={<AllAdvs />} />
          <Route path='add-adv' element={<AddAdv />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
