import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Layout from "./Layout.jsx";
import 'bootstrap/dist/css/bootstrap.min.css'



function App() {


  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<Layout/>}/>
            </Routes>
        </Router>
    </>
  )
}

export default App
