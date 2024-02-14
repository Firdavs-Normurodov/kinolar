import { useState, useEffect } from "react";
import AppFilter from "../app-filter/app-filter";
import AppInfo from "../app-info/app-info";
import MovieList from "../movie-list/movie-list";
import MoviesAddForm from "../movies-add-form/movies-add-form";
import SearchPanel from "../search-panel/search-panel";
import { v4 as uuidv4 } from "uuid";
import { Context } from '../../context'
import "./app.scss";
const App = () => {
  const [data, setData] = useState([]);
  const [term, setTerm] = useState("");
  const [filter, setfilter] = useState("all");
  const [isLoading, setIsLoading]=useState(false)
  const onDelete = (id) => {
    const newArr = data.filter((c) => c.id !== id);
    setData(newArr);
  };
  const value =useContext(Context)
  
  const addForm = (item) => {
    const newItem = {
      name: item.name,
      viewers: item.viewers,
      id: uuidv4(),
      favourite: false,
      like: false,
    };

    const newArr = [...data, newItem];
    setData(newArr);
  };
  const onToggleProp = (id, prop) => {
    const newArr = data.map((item) => {
      if (item.id === id) {
        return { ...item, [prop]: !item[prop] };
      }
      return item;
    });
    setData(newArr);
  };
  const searchHandler = (arr, term) => {
    if (term.length === 0) {
      return arr;
    }
    return arr.filter((item) => item.name.toLowerCase().indexOf(term) > -1);
  };
  const filterHandler = (arr, filter) => {
    switch (filter) {
      case "popular":
        return arr.filter((c) => c.like);
      case "mostViewers":
        return arr.filter((c) => c.viewers > 750);
      default:
        return arr;
    }
  };
  const updateTermHandler = (term) => setTerm(term);
  const updateFilterHandler = (filter) => setfilter(filter);
  useEffect(() => {
    setIsLoading(true)
    fetch("https://jsonplaceholder.typicode.com/todos?_start=0&_limit=5")
      .then((response) => response.json())
      .then((json) => {
        const newArr = json.map((item) => ({
          name: item.title,
          id: item.id,
          viewers: item.id*10,
          favourite: false,
          like: false,
        }));
        setData(newArr)
      })
      .catch(err=>console.log)
      .finally(()=>setIsLoading(false))
  }, []);
  return (
    <div className="app font-monospace">
      <div className="content">
        <AppInfo
          allMoviesCount={data.length}
          favouriteMovieCount={data.filter((c) => c.favourite).length}
        />
        <div className="search-panel">
          <SearchPanel updateTermHandler={updateTermHandler} />
          <AppFilter
            filter={filter}
            updateFilterHandler={updateFilterHandler}
          />
        </div>
        {isLoading && "Loading..."}
        <MovieList
          onToggleProp={onToggleProp}
          data={filterHandler(searchHandler(data, term), filter)}
          onDelete={onDelete}
        />
        <MoviesAddForm addForm={addForm} />
      </div>
    </div>
  );
};

export default App;
// const arr = [
//   { name: "Impire", viewers: 988, favourite: false, like: false, id: 1 },
//   { name: "Ertugrul", viewers: 782, favourite: false, like: false, id: 2 },
//   { name: "Omar", viewers: 546, favourite: false, like: false, id: 3 },
// ];
