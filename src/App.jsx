import Map from './pages/observe/Map'
import Observe from './pages/observe/Observe'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ListHelps from "./pages/list-helps/index.jsx";

function App() {
  return (
    <div className="min-h-screen App">
      <Router>
        <Routes>
          <Route path="/" element={<Observe />} />
          <Route path="/list-helps" element={<ListHelps />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
