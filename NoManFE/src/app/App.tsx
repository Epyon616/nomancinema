import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../Layout';
import { HomePage, MoviesPage, MoviePage } from '../Pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="movie/:id" element={<MoviePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App