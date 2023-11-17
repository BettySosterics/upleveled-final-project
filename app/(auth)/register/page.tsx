import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import styles from './page.module.css';
import RegisterForm from './RegisterForm';

export const metadata = {
  title: { default: 'Register | Bandify', template: '%s | Bandify' },
  description: 'Bandify app',
};

export default async function RegisterPage() {
  // Task: Add redirect to home if user is logged in
  // 1. Checking if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');
  // 2. Check if the sessionToken cookie is still valid
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // 3. If the sessionToken cookie is valid, redirect to home

  if (session) redirect('/');
  // 4. If the sessionToken cookie is invalid or doesn't exist, show the login form

  return (
    <div className={styles.registerForm}>
      <RegisterForm />
    </div>
  );
}
