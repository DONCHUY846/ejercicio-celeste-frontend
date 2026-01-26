import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/')({
  component: DashboardHome,
})

function DashboardHome() {
  return (
    <div className="p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome back to your workspace.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Total Projects
          </h3>
          <p className="text-3xl font-bold text-gray-900">12</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Active Tasks
          </h3>
          <p className="text-3xl font-bold text-gray-900">48</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Team Members
          </h3>
          <p className="text-3xl font-bold text-gray-900">8</p>
        </div>
      </div>
    </div>
  )
}
