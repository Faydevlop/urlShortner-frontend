import UserRoutes from "./routes/UserRoutes"
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/*" element={<UserRoutes/>} />
    </Routes>
    
    </BrowserRouter>

    
     
    </>
  )
}

export default App
