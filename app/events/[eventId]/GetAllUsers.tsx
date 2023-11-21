import { getUsers } from '../../../database/users';

export default async function GetAllUsers() {
  const users = await getUsers();

  return (
    <div>
      {users.map((user) => {
        return (
          <div key={`user-${user.id}`}>
            <div>
              <p className="font-light">{user.username}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
