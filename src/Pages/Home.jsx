import { useEffect, useState } from "react";
import RecipeCard from "../Components/RecipeCard";
import axios from "axios";
import Loading from "./Loading";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  async function fetchRecipes(skipCount, query) {
    setLoading(true);
    setErrorMsg("");
    try {
      let url = `https://dummyjson.com/recipes?limit=6&skip=${skipCount}`;
      if (query) {
        url = `https://dummyjson.com/recipes/search?limit=6&skip=${skipCount}&q=${query}`;
      }
      const { data } = await axios.get(url);
      setRecipes((prev) =>
        skipCount === 0 ? data.recipes : [...prev, ...data.recipes],
      );
      setTotal(data.total);
    } catch {
      setErrorMsg("Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let active = true;
    axios.get("https://dummyjson.com/recipes?limit=6&skip=0")
      .then(({ data }) => {
        if (!active) return;
        setRecipes(data.recipes);
        setTotal(data.total);
      })
      .catch(() => {
        if (active) setErrorMsg("Please try again later.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const query = form.get("query");
    setSearchQuery(query);
    fetchRecipes(0, query);
  }

  return (
    <main>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow"><span /> GOOD FOOD, GOOD MOOD</p>
          <h1>A little more<br />love on your <em>plate.</em></h1>
          <p className="hero-description">
            Find something wonderful to make today. Simple inspiration for the
            meals that bring everyone to the table.
          </p>
          <a href="#recipes" className="hero-button">
            Explore recipes
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <div className="hero-note">
            <span className="hero-note-stars" aria-hidden="true">★★★★★</span>
            <span>Made for curious home cooks</span>
          </div>
        </div>
        <div className="hero-visual">
          <img
            src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85"
            alt="A colorful, freshly prepared meal"
          />
          <div className="hero-image-caption">
            <span className="caption-dot" />
            <span>Something delicious is cooking</span>
          </div>
          <div className="hero-sticker" aria-label="Cook, share, repeat">
            <span>COOK</span>
            <span className="sticker-star">✳</span>
            <span>SHARE</span>
          </div>
        </div>
      </section>

      <section className="recipes-section" id="recipes">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A FRESH SERVING OF INSPIRATION</p>
            <h2>Recipes to fall for<span>.</span></h2>
          </div>
          <p className="section-aside">Tried, loved, and ready for your kitchen.</p>
        </div>

        <form onSubmit={handleSearch} className="search-form" role="search">
          <label className="search-field">
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="8.8" cy="8.8" r="5.8" />
              <path d="m13.2 13.2 4 4" />
            </svg>
            <input
              type="search"
              name="query"
              defaultValue={searchQuery}
              placeholder="What are you craving?"
              aria-label="Search recipes"
            />
          </label>
          <button type="submit" className="search-button" disabled={loading}>
            Search recipes
          </button>
        </form>

        <div className="results-row">
          <p>
            {searchQuery ? <>Results for <strong>“{searchQuery}”</strong></> : "Made for your next meal"}
          </p>
          <span>{total ? `${total} recipes` : "A little inspiration, served fresh"}</span>
        </div>

        {errorMsg && (
          <div className="message-panel error-panel" role="alert">
            <span className="message-icon">!</span>
            <div>
              <strong>We couldn’t load the recipes.</strong>
              <p>{errorMsg}</p>
            </div>
            <button type="button" onClick={() => fetchRecipes(0, searchQuery)}>Try again</button>
          </div>
        )}

        {loading && recipes.length === 0 && !errorMsg && <Loading />}

        {!loading && !errorMsg && recipes.length === 0 && (
          <div className="message-panel empty-panel">
            <span className="empty-emoji" aria-hidden="true">🥄</span>
            <div>
              <strong>No recipes found just yet.</strong>
              <p>Try another ingredient or dish name and we’ll take another look.</p>
            </div>
          </div>
        )}

        {recipes.length > 0 && (
          <div className="recipe-grid" aria-live="polite">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}

        {loading && recipes.length > 0 && (
          <p className="loading-more" role="status">Finding more delicious ideas…</p>
        )}

        {!loading && !errorMsg && recipes.length < total && (
          <div className="load-more-wrap">
            <button
              onClick={() => fetchRecipes(recipes.length, searchQuery)}
              type="button"
              className="load-more-button"
            >
              Load more recipes
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M10 4v12m-5-5 5 5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;
