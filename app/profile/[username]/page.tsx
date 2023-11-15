export const metadata = {
  title: { default: 'Profile | Bandify', template: '%s | Bandify' },
  description: 'Bandify app',
};

type Props = {
  params: { username: string; email: string };
};

export default function UserProfilePage({ params }: Props) {
  return (
    <div>
      <h2>Welcome to your profile, {params.username} !</h2>
      <h3>{params.email}</h3>
      vmi email sndfklsnfksmdflk
    </div>
  );
}
