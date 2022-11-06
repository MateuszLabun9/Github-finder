import React, { useEffect, useContext } from "react";
import GithubContext from "../../context/github/GithubContext";
import UserItem from "./UserItem";

function UserResults() {
  const { users, loading, fetchUsers } = useContext(GithubContext);

  useEffect(() => {}, []);

  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UserResults;
