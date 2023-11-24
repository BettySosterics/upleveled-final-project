import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getUserBySessionToken } from '../../../database/users';

export const metadata = {
  title: { default: 'Profile | Bandify' },
  description: 'Bandify app',
};

// type Props = {
//   params: {
//     user: string | undefined;
//   };
// };

export default async function UserProfilePage() {
  const sessionTokenCookie = cookies().get('sessionToken');

  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!user) redirect('/login?returnTo=/dashboard');

  // Display the notes for the current logged in user

  return (
    <div className="flex items-center justify-center m-20">
      <div>
        <div className="place-self-center w-full text-center bg-background/75 rounded p-5">
          <div className="space-y-4 md:space-y-6">
            <Image
              className="m-auto rounded-full h-45 w-45 cursor-pointer"
              src="/images/avatars/avatar4.svg"
              alt="author avatar"
              width={200}
              height={200}
            />
            <div>
              <div className="text-textColorNavbar">
                <div className="text-2xl mb-4">
                  {user.username.toUpperCase()}{' '}
                </div>
                <div>
                  {user.firstName.toUpperCase()} {user.lastName.toUpperCase()}
                </div>

                <div>{user.email}</div>
                <div>drummer</div>
                <div>
                  <PencilSquareIcon className="h-6 w-6 cursor-pointer" />
                </div>
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
  );
}
