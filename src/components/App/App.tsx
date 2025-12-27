import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";
import { type Movie } from "../../types/movie";
import ReactPaginate from "react-paginate";
import css from "./App.module.css";
import { useQuery } from "@tanstack/react-query";

const App: React.FC = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Movie | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query.length > 0,
    placeholderData: (prev) => prev,
  });

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handleSelect = (movie: Movie) => {
    setSelected(movie);
  };

  const handleCloseModal = () => {
    setSelected(null);
  };

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {!isLoading && !isError && movies.length > 0 && (
        <>
          {totalPages > 1 && (
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={({ selected }) => setPage(selected + 1)}
              forcePage={page - 1}
              containerClassName={css.pagination}
              activeClassName={css.active}
              nextLabel="→"
              previousLabel="←"
            />
          )}

          <MovieGrid movies={movies} onSelect={handleSelect} />
        </>
      )}

      {selected && <MovieModal movie={selected} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;
