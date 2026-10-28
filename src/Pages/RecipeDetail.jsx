import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

function RecipeDetail() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const { id } = useParams();

  useEffect(() => {
    let active = true;

    async function fetchRecipe() {
      setLoading(true);
      setErrorMsg("");
      try {
        const { data } = await axios.get(`https://dummyjson.com/recipes/${id}`);
        if (active) setRecipe(data);
      } catch {
        if (active) setErrorMsg("Could not load recipe details. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchRecipe();
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (errorMsg || !recipe) {
    return (
      <main className="detail-page">
        <Link to="/" className="back-link">
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M16 10H4m5 5-5-5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to discover
        </Link>
        <div className="message-panel error-panel" role="alert">
          <span className="message-icon">!</span>
          <div>
            <strong>We couldn’t find this recipe.</strong>
            <p>{errorMsg || "It may have been moved or removed."}</p>
          </div>
        </div>
      </main>
    );
  }

  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <main className="detail-page">
      <Link to="/" className="back-link">
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M16 10H4m5 5-5-5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to discover
      </Link>

      <section className="detail-hero">
        <div className="detail-image-wrap">
          <img src={recipe.image} alt={recipe.name} className="detail-image" />
          <span className="detail-image-label">{recipe.cuisine} kitchen</span>
        </div>
        <div className="detail-intro">
          <p className="eyebrow"><span /> THE GOOD STUFF</p>
          <h1>{recipe.name}</h1>
          <p className="detail-summary">
            A lovely {recipe.difficulty.toLowerCase()} recipe from the {recipe.cuisine} kitchen.
            Gather your ingredients and let’s make something memorable.
          </p>
          <div className="detail-rating">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="m10 1.8 2.5 5.1 5.6.8-4 3.9 1 5.6-5.1-2.7-5.1 2.7 1-5.6-4-3.9 5.6-.8L10 1.8Z" />
            </svg>
            <strong>{recipe.rating}</strong>
            <span>({recipe.reviewCount} reviews)</span>
          </div>
          <div className="detail-stats">
            <div className="detail-stat">
              <span className="stat-label">PREP</span>
              <strong>{recipe.prepTimeMinutes} <small>min</small></strong>
            </div>
            <div className="detail-stat">
              <span className="stat-label">COOK</span>
              <strong>{recipe.cookTimeMinutes} <small>min</small></strong>
            </div>
            <div className="detail-stat">
              <span className="stat-label">TOTAL</span>
              <strong>{totalTime} <small>min</small></strong>
            </div>
            <div className="detail-stat">
              <span className="stat-label">SERVES</span>
              <strong>{recipe.servings} <small>people</small></strong>
            </div>
          </div>
          <div className="detail-tags">
            {recipe.mealType?.map((type) => <span key={type}>{type}</span>)}
            {recipe.tags?.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </div>
      </section>

      <section className="recipe-method">
        <div className="ingredients-panel">
          <p className="eyebrow">FIRST, THE GOOD STUFF</p>
          <h2>Gather your<br /><em>ingredients.</em></h2>
          <p className="ingredients-count">{recipe.ingredients?.length} things to bring it all together</p>
          <ul className="ingredient-list">
            {recipe.ingredients?.map((item, index) => (
              <li key={`${item}-${index}`}>
                <span className="ingredient-check" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none">
                    <path d="m3.5 8 3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="calorie-note">About {recipe.caloriesPerServing} kcal per serving</p>
        </div>

        <div className="instructions-panel">
          <p className="eyebrow">LET’S MAKE IT</p>
          <h2>Make it with <em>love.</em></h2>
          <ol className="instruction-list">
            {recipe.instructions?.map((step, index) => (
              <li key={`${index}-${step}`}>
                <span className="instruction-number">{String(index + 1).padStart(2, "0")}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
          <div className="recipe-finish">
            <span aria-hidden="true">✳</span>
            <p>Take a moment, set the table, and enjoy every bite.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default RecipeDetail;
