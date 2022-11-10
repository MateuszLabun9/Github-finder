import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: true,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

  //Get list of users
  const searchUsers = async (text) => {
    const params = new URLSearchParams({
      q: text,
    });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`);

    const { items } = await response.json(); //De-structurize to get just the items from response
    dispatch({ type: "GET_USERS", payload: items });
  };

  //Get single user
  const getUser = async (login) => {
    const response = await fetch(`${GITHUB_URL}/users/${login}`);

    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json(); //De-structurize to get just the items from response
      dispatch({ type: "GET_USER", payload: data });
    }
  };

  //Get user repos
  const getUserRepos = async (login) => {
    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10,

    });
    
    const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`);

    const data = await response.json(); //De-structurize to get just the items from response
    dispatch({ type: "GET_REPOS", payload: data });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        repos: state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
