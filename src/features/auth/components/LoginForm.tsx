import { useState } from 'react'
import { ArrowRight, Lock, Mail } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { loginWithEmail } from '../api/login'

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const data = await loginWithEmail({ email, password })
      localStorage.setItem('token', data.access_token)
      localStorage.setItem('user', JSON.stringify(data.user))
      navigate({ to: '/' })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-[420px] space-y-8 bg-white p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl">
        <div className="text-center flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50/50 text-[#335D64] border border-teal-100 mb-6">
            <Lock className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[#1a1a1a]">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Please enter your details to sign in.
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-gray-700 mb-1.5 ml-1"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-lg border border-gray-200 py-2.5 pl-10 text-gray-900 placeholder-gray-400 focus:border-[#335D64] focus:outline-none focus:ring-1 focus:ring-[#335D64] sm:text-sm bg-gray-50/30"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-gray-700 mb-1.5 ml-1"
              >
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-lg border border-gray-200 py-2.5 pl-10 text-gray-900 placeholder-gray-400 focus:border-[#335D64] focus:outline-none focus:ring-1 focus:ring-[#335D64] sm:text-sm bg-gray-50/30"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end pt-1">
            <div className="text-xs">
              <a
                href="#"
                className="font-medium text-gray-400 hover:text-gray-600"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center items-center rounded-lg bg-[#335D64] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#284a50] focus:outline-none focus:ring-2 focus:ring-[#335D64] focus:ring-offset-2 disabled:opacity-70 transition-colors shadow-sm"
            >
              {loading ? (
                'Signing in...'
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </div>

          <div className="text-center text-xs mt-6">
            <span className="text-gray-400">Don't have an account? </span>
            <a
              href="#"
              className="font-bold text-[#335D64] hover:text-[#284a50]"
            >
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
