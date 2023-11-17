import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import LoginForm from './LoginForm';
import styles from './page.module.css';

export const metadata = {
  title: { default: 'Login | Bandify', template: '%s | Bandify' },
  description: 'Bandify app',
};

type Props = { searchParams: { returnTo?: string | string[] } };

export default async function LoginPage({ searchParams }: Props) {
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
    <div className={styles.loginForm}>
      <LoginForm returnTo={searchParams.returnTo} />
    </div>
  );
}
