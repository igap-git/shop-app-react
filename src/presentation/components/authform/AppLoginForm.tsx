import { useRouter } from '@tanstack/react-router';
import AuthForm from './AuthForm';
import type { User } from '../../../domain/types/user';

export function AppLoginForm() {
  const router = useRouter();

  const handleSubmit = (data: { email: string; password: string }) => {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    const foundUser = users.find(
      (user) => user.email === data.email && user.password === data.password
    );

    if (!foundUser) {
      alert('Invalid email or password');
      return;
    }

    const loggedUser: User = {
      ...foundUser,
      id: foundUser.id ?? crypto.randomUUID(),
      cart: foundUser.cart ?? [],
      favorites: foundUser.favorites ?? [],
    };

    localStorage.setItem('currentUser', JSON.stringify(loggedUser));
    router.navigate({ to: '/' });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <AuthForm type="login" onSubmit={handleSubmit} />
    </section>
  );
}
