import './App.css';
import {MovieList} from "./components/MovieList";
import {Home} from "./components/Home";
import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/movies" element={<MovieList/>}/>
            </Routes>
        </div>
    );
}

export default App;
