'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';

export default function RegisterForm() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const router = useRouter();

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        firstname,
        lastname,
        username,
        password,
        email,
      }),
    });

    const data: RegisterResponseBodyPost = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    router.push(`/dashboard`);

    /* if (response.ok) {
      const data = await response.json();
      console.log('Check: ', data);
  } else {
      console.error(`Error occurred: ${response.statusText}`);
  } */
  }

  return (
    <div>
      <form
        onSubmit={async (event) => await handleRegister(event)}
        className="bg-backgroundNavbar/75 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <label className="block text-textColorNavbar text-m font-medium mb-2">
          first name
          <input
            required
            placeholder="min. 3 characters"
            onChange={(event) => setFirstname(event.currentTarget.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-sm bg-backgroundNavbar font-light leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
        <label className="block text-textColorNavbar text-m font-medium mb-2">
          last name
          <input
            required
            placeholder="min. 3 characters"
            onChange={(event) => setLastname(event.currentTarget.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-sm bg-backgroundNavbar font-light leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
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
        <label className="block text-textColorNavbar text-m font-medium mb-2">
          email address
          <input
            required
            placeholder="min. 5 characters"
            onChange={(event) => setEmail(event.currentTarget.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-sm bg-backgroundNavbar font-light leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>

        <div className="flex items-center justify-center mt-5">
          <button className="bg-backgroundNavbar border-textColorNavbar text-textColorNavbar font-medium py-2 px-4 border rounded hover:bg-buttonHover">
            Register
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
