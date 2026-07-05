import React, { useState, useEffect, useCallback } from 'react'
import {
  getTasks,
  createTask,
  updateTask,
  toggleTask,
  deleteTask
} from '../api/client'
import type { Task, PaginationInfo } from '../types'
import Pagination from '../components/Pagination'
import EditTaskModal from '../components/EditTaskModal'
import ToastNotification from '../components/ToastNotification'
import FilterTabs from '../components/FilterTabs'
import SearchInput from '../components/SearchInput'
import LimitSelector from '../components/LimitSelector'
import TaskList from '../components/TaskList'
import StatsDashboard from '../components/StatsDashboard'

export default function HomePage() {
  // Tasks state
  const [tasks, setTasks] = useState<Task[]>([])
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1
  })

  // Filter & search parameters
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed'>('all')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  // Loading & error flags
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  // Form states
  const [newTitle, setNewTitle] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  // Editing state
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [editError, setEditError] = useState<string | null>(null)

  // Overall Statistics state
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 })

  // Notification Toast state
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
    setTimeout(() => {
      setNotification(null)
    }, 4500)
  }

  // Fetch tasks listing
  const fetchTasks = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const completedParam =
        statusFilter === 'completed'
          ? true
          : statusFilter === 'active'
            ? false
            : undefined

      const data = await getTasks({
        page,
        limit,
        completed: completedParam,
        search: search.trim() || undefined
      })
      setTasks(data.tasks)
      setPagination(data.pagination)
    } catch (err: any) {
      console.error(err)
      setError('Unable to fetch tasks. Please verify your connection to the server.')
    } finally {
      setLoading(false)
    }
  }, [page, limit, statusFilter, search])

  // Fetch stats independently
  const fetchStats = useCallback(async () => {
    try {
      const [allRes, completedRes] = await Promise.all([
        getTasks({ page: 1, limit: 1 }),
        getTasks({ page: 1, limit: 1, completed: true })
      ])
      const totalCount = allRes.pagination.total
      const completedCount = completedRes.pagination.total
      setStats({
        total: totalCount,
        completed: completedCount,
        pending: Math.max(0, totalCount - completedCount)
      })
    } catch (err) {
      console.error('Failed to update stats', err)
    }
  }, [])

  // Hook up fetching
  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  useEffect(() => {
    fetchStats()
  }, [fetchStats, tasks])

  // Create Task Action
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    if (!newTitle.trim()) {
      setFormError('Task title is required.')
      return
    }

    try {
      await createTask({
        title: newTitle.trim(),
        description: newDesc.trim() || undefined,
        completed: false
      })
      setNewTitle('')
      setNewDesc('')
      setFormOpen(false)
      showNotification('success', 'Task added successfully!')
      fetchTasks()
    } catch (err: any) {
      console.error(err)
      setFormError(err.response?.data?.errors?.[0]?.message ?? 'Failed to create task.')
    }
  }

  // Toggle Completion Action
  const handleToggleTask = async (id: string) => {
    setActionLoading(id)
    try {
      await toggleTask(id)
      showNotification('success', 'Task updated.')
      fetchTasks()
    } catch (err: any) {
      console.error(err)
      showNotification('error', 'Failed to toggle task.')
    } finally {
      setActionLoading(null)
    }
  }

  // Save Task Edits Action
  const handleSaveEdit = async (title: string, description: string, completed: boolean) => {
    if (!editingTask) return
    setEditError(null)

    try {
      await updateTask(editingTask.id, {
        title,
        description,
        completed
      })
      setEditingTask(null)
      showNotification('success', 'Task changes saved.')
      fetchTasks()
    } catch (err: any) {
      console.error(err)
      setEditError(err.response?.data?.errors?.[0]?.message ?? 'Failed to update task.')
    }
  }

  // Delete Task Action
  const handleDeleteTask = async (id: string) => {
    if (!window.confirm('Delete this task? This action is permanent.')) return
    setActionLoading(id)
    try {
      await deleteTask(id)
      showNotification('success', 'Task removed successfully.')
      fetchTasks()
    } catch (err: any) {
      console.error(err)
      showNotification('error', 'Failed to delete task.')
    } finally {
      setActionLoading(null)
    }
  }

  // Reset pagination to first page on query parameter changes
  const changeFilter = (filter: 'all' | 'active' | 'completed') => {
    setStatusFilter(filter)
    setPage(1)
  }

  const changeLimit = (newLimit: number) => {
    setLimit(newLimit)
    setPage(1)
  }

  return (
    <div className="min-h-screen hero-bg pb-20">
      {/* Toast Notification */}
      <ToastNotification notification={notification} />

      {/* Hero Header Section */}
      <header className="relative overflow-hidden px-4 pt-16 pb-12 sm:pt-20 sm:pb-16 text-center">
        {/* Glow Spheres */}
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-5 right-1/4 w-[250px] h-[250px] bg-blue-600/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 text-slate-800">
            Task <span className="gradient-text">Flow</span>
          </h1>
          <p className="text-slate-500 text-base sm:text-lg max-w-md mx-auto font-medium">
            Manage, search, and keep track of your daily notes and achievements.
          </p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4">
        {/* Stats Section */}
        <StatsDashboard stats={stats} />

        {/* Dashboard Actions Bar */}
        <section className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-6">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center flex-1 max-w-3xl">
            <FilterTabs
              statusFilter={statusFilter}
              changeFilter={changeFilter}
            />
            <SearchInput
              search={search}
              setSearch={setSearch}
              setPage={setPage}
            />
          </div>

          <div className="flex items-center gap-3 justify-end">
            <LimitSelector
              limit={limit}
              onChangeLimit={changeLimit}
            />

            <button
              type="button"
              onClick={() => setFormOpen(!formOpen)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all duration-200 shadow-md shadow-sky-500/10 hover:shadow-lg hover:shadow-sky-500/20 hover:-translate-y-0.5"
            >
              <svg className={`w-4 h-4 transition-transform duration-300 ${formOpen ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
              </svg>
              New Task
            </button>
          </div>
        </section>

        {/* Quick Add Form Section */}
        {formOpen && (
          <section className="glass-card p-6 border-slate-100 mb-6 bg-white/70 backdrop-blur-md animate-[fadeIn_0.25s_ease-out] shadow-md">
            <h4 className="text-sm font-extrabold text-slate-700 uppercase tracking-wider mb-4">Create New Task</h4>
            <form onSubmit={handleAddTask} className="flex flex-col gap-4">
              {formError && (
                <div className="p-3 bg-rose-50 text-rose-800 text-xs font-semibold rounded-xl border border-rose-100">
                  ⚠️ {formError}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Task Title *</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="E.g. Buy groceries"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all shadow-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Description</label>
                  <input
                    type="text"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="E.g. Get milk, apples, and honey..."
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all shadow-sm"
                  />
                </div>
              </div>
              <div className="flex gap-2.5 justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors shadow-sm"
                >
                  Add Task
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Task Cards List */}
        <TaskList
          tasks={tasks}
          loading={loading}
          error={error}
          actionLoading={actionLoading}
          search={search}
          formOpen={formOpen}
          onToggle={handleToggleTask}
          onEdit={setEditingTask}
          onDelete={handleDeleteTask}
          onRetry={fetchTasks}
          onOpenForm={() => setFormOpen(true)}
        />

        {/* Pagination Section */}
        <Pagination
          pagination={pagination}
          page={page}
          setPage={setPage}
        />
      </main>

      {/* Edit Task Modal */}
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={handleSaveEdit}
          editError={editError}
        />
      )}
    </div>
  )
}
