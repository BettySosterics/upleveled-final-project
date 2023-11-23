import { getUsers } from '../../../database/users';

export default async function GetAllUsers() {
  const users = await getUsers();

  return (
    <div>
      <p>{users.length} people are going</p>
      {users.map((user) => {
        return (
          <div key={`user-${user.id}`}>
            <div>
              <p className="font-light indent-4">
                {user.firstName.charAt(0).toUpperCase()}
                {user.firstName.slice(1)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
