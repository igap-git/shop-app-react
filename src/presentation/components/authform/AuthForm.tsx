import { useState } from 'react';
import { validateAuthForm } from '@application-auth/validateAuthForm.usecase';

type AuthFormProps = {
  type: 'login' | 'register';
  onSubmit: (data: AuthFormData) => void | Promise<void>;
  loading?: boolean;
};

export type AuthFormData = {
  email: string;
  password: string;
  isAdmin: boolean;
};

export default function AuthForm({
  type,
  onSubmit,
  loading = false,
}: AuthFormProps) {
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');

  const [isAdmin, setIsAdmin] = useState(false);

  const isLogin = type === 'login';
  const isRegister = type === 'register';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');

    const validationError = validateAuthForm(
      email,
      password,
      confirmPassword,
      isRegister
    );

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await onSubmit({
        email,
        password,
        isAdmin,
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        return;
      }

      setError('Something went wrong');
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <form
        onSubmit={handleSubmit}
        className="
          bg-white
          border border-gray-200
          rounded-3xl
          p-10
          shadow-lg
          space-y-6
        "
      >
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            {isLogin ? 'Welcome back' : 'Create account'}
          </h1>

          <p className="text-gray-500 mt-3 text-base">
            {isLogin
              ? 'Login using your email and password'
              : 'Register using your email and password'}
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="
                w-full
                border border-gray-200
                rounded-2xl
                px-5 py-4
                text-base
                outline-none
                transition
                focus:ring-2
                focus:ring-black
                focus:border-black
              "
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="
                w-full
                border border-gray-200
                rounded-2xl
                px-5 py-4
                text-base
                outline-none
                transition
                focus:ring-2
                focus:ring-black
                focus:border-black
              "
            />
          </div>

          {isRegister && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Confirm password
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="
                  w-full
                  border border-gray-200
                  rounded-2xl
                  px-5 py-4
                  text-base
                  outline-none
                  transition
                  focus:ring-2
                  focus:ring-black
                  focus:border-black
                "
                />
              </div>
              <label className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 cursor-pointer hover:bg-gray-100 transition">
                <input
                  type="checkbox"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  className="h-5 w-5 accent-emerald-600 cursor-pointer"
                />

                <span className="text-sm font-medium text-gray-700">
                  Create as admin account
                </span>
              </label>
            </>
          )}
        </div>

        {error && (
          <div className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`
            w-full
            py-4
            rounded-2xl
            text-base
            font-semibold
            transition
            ${
              loading
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-black text-white hover:scale-[1.01] hover:opacity-95'
            }
          `}
        >
          {loading ? 'Loading...' : isLogin ? 'Login' : 'Create account'}
        </button>
      </form>
    </div>
  );
}
