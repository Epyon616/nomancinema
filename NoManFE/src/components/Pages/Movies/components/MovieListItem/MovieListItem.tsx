import { Link } from 'react-router-dom';

import './MovieListitem.css';

type MovieListItemType = {
  name: string, movieId: number
}

const MovieListItem = ({name, movieId}:MovieListItemType) => (
  <li className="list-item">
    <Link to={`/movie/`+ movieId}>{name}</Link>
  </li>
);

export default MovieListItem;