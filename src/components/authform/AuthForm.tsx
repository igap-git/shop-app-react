import { useState } from 'react';

type AuthFormProps = {
  type: 'login' | 'register';
  onSubmit: (data: { email: string; password: string }) => void | Promise<void>;
  loading?: boolean;
};

export default function AuthForm({
  type,
  onSubmit,
  loading = false,
}: AuthFormProps) {
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const isLogin = type === 'login';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      await onSubmit({
        email,
        password,
      });
    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-2xl p-8 shadow-sm space-y-5"
      >
        <div>
          <h1 className="text-3xl font-bold">
            {isLogin ? 'Welcome back' : 'Create account'}
          </h1>

          <p className="text-gray-500 mt-2">
            {isLogin
              ? 'Login using your email and password'
              : 'Register using your email and password'}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {error && <div className="text-sm text-red-500">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl font-medium transition ${
            loading
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-black text-white hover:opacity-90'
          }`}
        >
          {loading ? 'Loading...' : isLogin ? 'Login' : 'Create account'}
        </button>
      </form>
    </div>
  );
}
