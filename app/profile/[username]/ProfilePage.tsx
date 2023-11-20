import { cookies } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getUserBySessionToken } from '../../../database/users';

// import { useState } from 'react';
// import { User } from '../../../migrations/00000-createTableUsers';

type Props = {
  params: {
    user: string;
  };
};

// type Props = {
//   users: User[];
// };

export default async function ProfilePage({ params }: Props) {
  // const [onEditId, setOnEditId] = useState(0);
  // const [onEditFirstNameInput, setOnEditFirstNameInput] = useState('');
  // const [onEditLastNameInput, setOnEditLastNameInput] = useState('');
  // const [onEditEmailInput, setOnEditEmailInput] = useState('');
  // const [onEditUsernameInput, setOnEditUsernameInput] = useState('');

  // async function updateProfileById(id: number) {
  //   const response = await fetch(`/api/user`, {
  //     method: 'PUT',
  //     body: JSON.stringify({
  //       firstName: onEditFirstNameInput,
  //       lastName: onEditLastNameInput,
  //       email: onEditEmailInput,
  //       username: onEditUsernameInput,
  //     }),
  //   });

  //   const data = await response.json();
  // }

  // 1. Checking if the sessionToken cookie exists
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  // 2. Get the current logged in user from the database using the sessionToken value
  const user =
    sessionToken && (await getUserBySessionToken(sessionToken.value));

  // added 14.11.23
  if (!sessionToken) {
    return redirect(`/login?returnTo=/login/${params.user}`);
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="absolute top-20 ">
          <div className="place-self-center w-96 px-6 py-6 text-center bg-violet-900 rounded-lg lg:mt-0 xl:px-10 border-2">
            <div className="space-y-4 xl:space-y-6">
              <Image
                className="mx-auto rounded-full h-40 w-40 border-2"
                src="/images/cover.jpg"
                alt="author avatar"
                width={200}
                height={200}
              />
              <div className="space-y-2">
                <div className="flex justify-center items-center flex-col space-y-3 text-lg font-medium leading-6">
                  {user?.username} {user?.email} {user?.firstName}{' '}
                  {user?.lastName}
                  {/* <div key={`profile-inputs-${users.id}`}>
                    <input
                      value={
                        users.id !== onEditId
                          ? users.firstName
                          : onEditFirstNameInput
                      }
                      onChange={(event) =>
                        setOnEditFirstNameInput(event.currentTarget.value)
                      }
                      disabled={user.id !== onEditId}
                    />
                    <input
                      value={
                        user.id !== onEditId
                          ? user.lastName
                          : onEditLastNameInput
                      }
                      onChange={(event) =>
                        setOnEditLastNameInput(event.currentTarget.value)
                      }
                      disabled={user.id !== onEditId}
                    />
                    <input
                      value={
                        user.id !== onEditId
                          ? user.email || ''
                          : onEditEmailInput
                      }
                      onChange={(event) =>
                        setOnEditEmailInput(event.currentTarget.value)
                      }
                      disabled={user.id !== onEditId}
                    />
                    <input
                      value={
                        user.id !== onEditId
                          ? user.username || ''
                          : onEditUsernameInput
                      }
                      onChange={(event) =>
                        setOnEditUsernameInput(event.currentTarget.value)
                      }
                      disabled={user.id !== onEditId}
                    />
                    {onEditId === user.id ? (
                      <button
                        onClick={async () => {
                          await updateProfileById(user.id);
                          setOnEditId(0);
                        }}
                      >
                        save
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setOnEditFirstNameInput(user.firstName);
                          setOnEditLastNameInput(user.lastName);
                          setOnEditEmailInput(user.email);
                          setOnEditUsernameInput(user.username);
                        }}
                      >
                        Edit
                      </button>
                    )}
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Image
        src="/images/cover.jpg"
        alt="background image"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
      /> */}
    </>
  );
}

// return (
//   <div key={`profile-inputs-${user.id}`}>
//     <input
//       value={user.id !== onEditId ? user.firstName : onEditFirstNameInput}
//       onChange={(event) => setOnEditFirstNameInput(event.currentTarget.value)}
//       disabled={user.id !== onEditId}
//     />
//     <input
//       value={user.id !== onEditId ? user.lastName : onEditLastNameInput}
//       onChange={(event) => setOnEditLastNameInput(event.currentTarget.value)}
//       disabled={user.id !== onEditId}
//     />
//     <input
//       value={user.id !== onEditId ? user.email || '' : onEditEmailInput}
//       onChange={(event) => setOnEditEmailInput(event.currentTarget.value)}
//       disabled={user.id !== onEditId}
//     />
//     <input
//       value={user.id !== onEditId ? user.username || '' : onEditUsernameInput}
//       onChange={(event) => setOnEditUsernameInput(event.currentTarget.value)}
//       disabled={user.id !== onEditId}
//     />
//     {onEditId === user.id ? (
//       <button
//         onClick={async () => {
//           await updateProfilelById(user.id);
//           setOnEditId(0);
//         }}
//       >
//         save
//       </button>
//     ) : (
//       <button
//         onClick={() => {
//           setOnEditFirstNameInput(user.firstName);
//           setOnEditLastNameInput(user.lastName);
//           setOnEditEmailInput(user.email);
//           setOnEditUsernameInput(user.username);
//         }}
//       >
//         Edit
//       </button>
//     )}
//   </div>
// );
