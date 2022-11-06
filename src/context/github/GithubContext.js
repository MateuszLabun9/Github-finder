import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: true,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

  const searchUsers = async (text) => {
    const params = new URLSearchParams({
      q: text,
    });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`);

    const { items } = await response.json(); //De-structurize to get just the items from response
    dispatch({ type: "GET_USERS", payload: items });
  };
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
