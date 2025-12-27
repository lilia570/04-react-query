import type { Movie } from "../../types/movie.ts";
import styles from "./MovieModal.module.css";
import { createPortal } from "react-dom";
import { useEffect } from "react";
interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
   const handleBackdropClick = () => {
    onClose();
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          х
        </button>
        {movie.backdrop_path && (
          <img className={styles.image}
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            alt="Poster"
          />
        )}
        <div className={styles.content}> 
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <p><strong>Release date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average}</p>
        </div>
         
        
      </div>
    </div>,
    document.body
  );
}