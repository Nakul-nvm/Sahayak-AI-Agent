// src/app/(auth)/login/page.tsx
import LoginForm from '@/components/auth/LoginForm'; // Adjust path

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to Sahayak
          </h2>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
