import type { Task } from '../types'

interface TaskItemProps {
  task: Task;
  actionLoading: boolean;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({
  task,
  actionLoading,
  onToggle,
  onEdit,
  onDelete
}: TaskItemProps) {
  return (
    <div
      className={`glass-card p-4 sm:p-5 flex items-center justify-between border-slate-100 hover:border-slate-200/80 hover:shadow-md transition-all duration-300 group ${
        task.completed ? 'bg-slate-50/70 border-slate-200/40' : 'bg-white'
      }`}
    >
      <div className="flex items-start gap-4 flex-1 pr-4 min-w-0">
        {/* Complete checkbox wrapper */}
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          disabled={actionLoading}
          className={`mt-0.5 w-5.5 h-5.5 rounded-lg border flex items-center justify-center shrink-0 transition-all ${
            task.completed
              ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm shadow-emerald-500/20'
              : 'border-slate-300 hover:border-sky-500 bg-white text-transparent'
          }`}
        >
          {actionLoading ? (
            <svg className="animate-spin w-3.5 h-3.5 text-current" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5 stroke-[3.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-0.5">
            <h4 className={`text-base font-bold text-slate-800 truncate transition-all duration-200 ${
              task.completed ? 'line-through text-slate-400 font-medium' : ''
            }`}>
              {task.title}
            </h4>
            {task.completed ? (
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-[10px] font-bold uppercase tracking-wider text-emerald-600 border border-emerald-100">
                Completed
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-md bg-amber-50 text-[10px] font-bold uppercase tracking-wider text-amber-600 border border-amber-100">
                Active
              </span>
            )}
          </div>
          {task.description && (
            <p className={`text-sm text-slate-500 break-words leading-relaxed ${
              task.completed ? 'text-slate-400/80 font-normal' : ''
            }`}>
              {task.description}
            </p>
          )}
          <span className="text-[10px] text-slate-400 font-semibold mt-1.5 block">
            📆 Created on {new Date(task.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Edit & Delete Action Panel */}
      <div className="flex items-center gap-1.5 shrink-0 opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
          title="Edit Task"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          disabled={actionLoading}
          className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all border border-transparent hover:border-rose-100"
          title="Delete Task"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
