'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import { LoginResponseBodyPost } from '../../api/(auth)/login/route';

type Props = { returnTo?: string | string[] };

export default function LoginForm(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data: LoginResponseBodyPost = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    //  This is not the secured way of doing returnTo
    // if (props.returnTo) {
    //   console.log('Checks Return to: ', props.returnTo);
    //   router.push(props.returnTo);
    // }

    router.push(getSafeReturnToPath(props.returnTo) || `/`);

    // revalidatePath() throws unnecessary error, will be used when stable
    // revalidatePath('/(auth)/login', 'page');
    router.refresh();
  }

  return (
    <div>
      <form
        onSubmit={async (event) => await handleRegister(event)}
        className="bg-backgroundNavbar/75 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <label className="block text-textColorNavbar text-m font-medium mb-2">
          username
          <input
            required
            placeholder="min. 3 characters"
            onChange={(event) => setUsername(event.currentTarget.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-sm bg-backgroundNavbar font-light leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
        <label className="block text-textColorNavbar text-m font-medium mb-2">
          password
          <input
            required
            placeholder="min. 8 characters"
            type="password"
            onChange={(event) => setPassword(event.currentTarget.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-sm bg-backgroundNavbar font-light leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
        <div className="flex items-center justify-center mt-5">
          <button className=" bg-backgroundNavbar border-textColorNavbar text-textColorNavbar font-medium py-2 px-4 border rounded hover:bg-buttonHover">
            login
          </button>
        </div>

        {errors.map((error) => (
          <div className="error" key={`error-${error.message}`}>
            Error: {error.message}
          </div>
        ))}
      </form>
    </div>
  );
}
