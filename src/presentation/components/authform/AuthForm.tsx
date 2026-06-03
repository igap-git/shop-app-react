import { useForm } from 'react-hook-form';

type AuthFormProps = {
  type: 'login' | 'register';
  onSubmit: (data: AuthFormData) => void | Promise<void>;
  loading?: boolean;
};

export type AuthFormData = {
  email: string;
  password: string;
  confirmPassword?: string;
  isAdmin: boolean;
};

export default function AuthForm({
  type,
  onSubmit,
  loading = false,
}: AuthFormProps) {
  const isLogin = type === 'login';
  const isRegister = type === 'register';

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<AuthFormData>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      isAdmin: false,
    },
  });

  const submitForm = async (data: AuthFormData) => {
    try {
      await onSubmit({
        email: data.email,
        password: data.password,
        isAdmin: data.isAdmin,
      });
    } catch (err) {
      setError('root', {
        message: err instanceof Error ? err.message : 'Something went wrong',
      });
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <form
        onSubmit={handleSubmit(submitForm)}
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
              placeholder="john@example.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Email is invalid',
                },
              })}
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

            {errors.email && (
              <p className="text-sm text-red-500 mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>

            <input
              type="password"
              placeholder="••••••••"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
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

            {errors.password && (
              <p className="text-sm text-red-500 mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          {isRegister && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Confirm password
                </label>

                <input
                  type="password"
                  placeholder="••••••••"
                  {...register('confirmPassword', {
                    required: isRegister
                      ? 'Confirm password is required'
                      : false,
                    validate: (value) => {
                      if (value !== watch('password')) {
                        return 'Passwords do not match';
                      }

                      return true;
                    },
                  })}
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

                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-2">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <label className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 cursor-pointer hover:bg-gray-100 transition">
                <input
                  type="checkbox"
                  {...register('isAdmin')}
                  className="h-5 w-5 accent-emerald-600 cursor-pointer"
                />

                <span className="text-sm font-medium text-gray-700">
                  Create as admin account
                </span>
              </label>
            </>
          )}
        </div>

        {errors.root && (
          <div className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
            {errors.root.message}
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
