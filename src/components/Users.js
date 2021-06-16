import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
const USERS_QUERY = gql`
  query getAllUsers {
    getAllUsers {
      id
      username
      email
    }
  }
`;

const Users = () => {
  const { loading, error, data } = useQuery(USERS_QUERY);
  if (loading) return <p>Loading</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <Link to="/landing">landing</Link>
      {data.getAllUsers.map((user) => {
        return (
          <div key={user.id}>
            <p>Id: {user.id}</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        );
      })}
    </div>
  );
};
export default Users;
