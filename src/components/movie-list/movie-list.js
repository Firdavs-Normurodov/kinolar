import MovieListItem from "../movie-list-item/movie-list-item";
import "./movie-list.css";

const MovieList = ({ data,onDelete,onToggleProp }) => {
  return (
    <ul className="movie-list list-group">
      {data.map((item) => (
        // qisqa yo'li
        // <MovieListItem {...item}/>
        <MovieListItem
          key={item.id}
          name={item.name}
          viewers={item.viewers}
          favourite={item.favourite}
          like={item.like}
          onToggleProp={(e)=> onToggleProp(item.id ,e.currentTarget.getAttribute('data-toggle'))}
          onDelete={()=>onDelete(item.id)}
        />
      ))}
    </ul>
  );
};

export default MovieList;
