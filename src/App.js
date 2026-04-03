import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RecipeList from './pages/RecipeList';
import SubmitRecipe from './pages/SubmitRecipe';
import RecipeDetail from './pages/RecipeDetail'; 
import Login from './pages/Login';
import Register from './pages/Register'; 
import Footer from './components/Footer';
import EditRecipe from './pages/EditRecipe';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} /> {/* <--- Detail Page Route */}
          <Route path="/edit-recipe/:id" element={<EditRecipe />} />
          <Route path="/submit" element={<SubmitRecipe />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;