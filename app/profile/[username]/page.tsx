import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getUserBySessionToken } from '../../../database/users';

type Props = {
  params: {
    user: string | undefined;
  };
};

export default async function UserProfilePage({ params }: Props) {
  // 1. Checking if the sessionToken cookie exists
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  // 2. Get the current logged in user from the database using the sessionToken value
  const user =
    sessionToken && (await getUserBySessionToken(sessionToken.value));

  if (!sessionToken) {
    return redirect(`/login?returnTo=/login/${params.user}`);
  }
  return (
    <div className="flex items-center justify-center m-20">
      <div>
        <div className="place-self-center w-full text-center bg-backgroundCard rounded ">
          <div className="space-y-4 md:space-y-6">
            <Image
              className="m-auto rounded-full h-45 w-45 "
              src="/images/avatars/avatar4.svg"
              alt="author avatar"
              width={200}
              height={200}
            />
            <div>
              <div className="text-textColorCard">
                <div>
                  {user?.firstName.toUpperCase()} {user?.lastName.toUpperCase()}
                </div>
                <div>{user?.username.toUpperCase()} </div>
                <div>{user?.email.toUpperCase()}</div>
                <div>drummer</div>
                <div>
                  <PencilSquareIcon className="h-6 w-6 " />
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
