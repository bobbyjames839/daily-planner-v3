import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Home } from './components/pages/Home';
import { RemindersGoals } from './components/pages/RemindersGoals';
import { Nav } from './components/pages/Nav';

function App() {
  return (
    <div className="App">
      <Router>
        <Nav/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/reminders+goals' element={<RemindersGoals/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
