import TaskItem from './TaskItem'
import type { Task } from '../types'

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  actionLoading: string | null;
  search: string;
  formOpen: boolean;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onRetry: () => void;
  onOpenForm: () => void;
}

export default function TaskList({
  tasks,
  loading,
  error,
  actionLoading,
  search,
  formOpen,
  onToggle,
  onEdit,
  onDelete,
  onRetry,
  onOpenForm
}: TaskListProps) {
  if (loading) {
    return (
      <section className="space-y-3 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="glass-card p-5 flex items-center justify-between border-slate-100">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-5 h-5 rounded-md shimmer shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-5 w-44 rounded-md shimmer" />
                <div className="h-4 w-72 rounded-md shimmer" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg shimmer" />
              <div className="h-8 w-8 rounded-lg shimmer" />
            </div>
          </div>
        ))}
      </section>
    );
  }

  if (error) {
    return (
      <section className="glass-card p-10 text-center border-rose-100 bg-rose-50/50 mb-8 animate-[fadeIn_0.2s_ease-out]">
        <span className="text-3xl">📡</span>
        <h4 className="text-lg font-bold text-rose-800 mt-3">Connection Problem</h4>
        <p className="text-slate-500 text-sm mt-1.5 max-w-sm mx-auto leading-relaxed">
          {error}
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 px-4 py-2 text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100/80 border border-sky-200 rounded-xl transition-colors"
        >
          Retry Request
        </button>
      </section>
    );
  }

  if (tasks.length === 0) {
    return (
      <section className="glass-card p-12 text-center border-slate-100 bg-white shadow-sm mb-8 animate-[fadeIn_0.2s_ease-out]">
        <span className="text-4xl">🗒️</span>
        <h4 className="text-base font-extrabold text-slate-800 mt-4 uppercase tracking-wider">No Tasks Found</h4>
        <p className="text-slate-400 text-sm mt-1 max-w-xs mx-auto">
          {search ? 'Try adjusting your search filters or queries.' : 'Get started by creating your very first task.'}
        </p>
        {!search && !formOpen && (
          <button
            type="button"
            onClick={onOpenForm}
            className="mt-4 px-4 py-2 text-xs font-bold text-sky-700 bg-sky-50 border border-sky-200 rounded-xl hover:bg-sky-100/50 transition-colors"
          >
            Create Task
          </button>
        )}
      </section>
    );
  }

  return (
    <section className="space-y-3 mb-8">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          actionLoading={actionLoading === task.id}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}
