import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
  const {
    id,
    prepTimeMinutes,
    cookTimeMinutes,
    image,
    name,
    cuisine,
    difficulty,
    rating,
  } = recipe;
  const totalTime = prepTimeMinutes + cookTimeMinutes;

  return (
    <Link to={`/recipe/${id}`} className="recipe-card">
      <div className="recipe-card-image-wrap">
        <img src={image} alt={name} className="recipe-card-image" loading="lazy" />
        <span className="recipe-difficulty">{difficulty}</span>
        <span className="recipe-card-arrow" aria-hidden="true">
          <svg viewBox="0 0 20 20" fill="none">
            <path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <div className="recipe-card-content">
        <p className="recipe-cuisine">{cuisine}</p>
        <h3>{name}</h3>
        <div className="recipe-card-meta">
          <span className="rating">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="m10 1.8 2.5 5.1 5.6.8-4 3.9 1 5.6-5.1-2.7-5.1 2.7 1-5.6-4-3.9 5.6-.8L10 1.8Z" />
            </svg>
            {rating}
          </span>
          <span className="cook-time">
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="10" cy="10" r="7.5" />
              <path d="M10 5.5V10l3 1.8" />
            </svg>
            {totalTime} min
          </span>
        </div>
      </div>
    </Link>
  );
}

export default RecipeCard;
