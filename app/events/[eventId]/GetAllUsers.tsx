import { getUsers } from '../../../database/users';

export default async function GetAllUsers() {
  const users = await getUsers();

  return (
    <div>
      <h2 className="text-xl">ATTENDEES</h2>
      {users.map((user) => {
        return (
          <div key={`${user.id}`}>
            <div>
              <p className="font-light">{user.username}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
