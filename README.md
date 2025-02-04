# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

<!-- const endPoint: Record<string, string> = {
  popular_movies: "/movie/popular",
  top_rated_movies: "/movie/top_rated",
  now_playing: "/movie/now_playing",
  upcoming_movies: "/movie/upcoming",
  search_movies: "/search/movie",

  popular_tv: "/tv/popular",
  top_rated_tv: "/tv/top_rated",
  airing_today: "/tv/airing_today",
  on_air_tv: "/tv/on_the_air",
  search_tv: "/search/tv",

  kdrama: "/discover/tv", // Use with "with_origin_country=KR" & "with_genres=18"
  anime: "/discover/tv", // Use with "with_origin_country=JP" & "with_genres=16"

  movie_genres: "/genre/movie/list",
  tv_genres: "/genre/tv/list",

  trending: "/trending/all/week",
  recommendations: "/movie/{movie_id}/recommendations",
  similar_movies: "/movie/{movie_id}/similar",

  streaming_movies: "/watch/providers/movie",
  streaming_tv: "/watch/providers/tv",
}; -->
