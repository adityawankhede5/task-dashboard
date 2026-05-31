import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { visibleTasksSelector } from "../store/selectors/task.selectors";
import SortBy from "../components/SortBy";
import FilterBy from "../components/FilterBy";
import TasksSummary from "../components/TasksSummary";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useState } from "react";
import { Plus, X } from "lucide-react";

export default function AllTasksPage() {

  const visibleTasksList = useSelector(visibleTasksSelector);
  const { selectedTask } = useSelector((state: RootState) => state.tasks)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const openCreateModal = () => {
    setIsEditing(false);
    setIsFormOpen(true);
  }

  const openEditModal = () => {
    setIsEditing(true);
    setIsFormOpen(true);
  }

  const closeModal = () => {
    setIsFormOpen(false);
  }

    return (
        <div className="space-y-5">
            <header className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-end sm:justify-between">
                <div className="grid flex-1 gap-3 sm:grid-cols-2">
                    <SortBy />
                    <FilterBy />
                </div>
                <button
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                    onClick={openCreateModal}
                    type="button"
                >
                    <Plus size={18} />
                    Add Task
                </button>
            </header>
            <TasksSummary />
            <TaskList tasks={visibleTasksList} onEditTask={openEditModal} />

            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 px-4 py-4 sm:items-center">
                    <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
                        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">{isEditing ? "Edit task" : "Add task"}</h2>
                                <p className="text-sm text-slate-500">{isEditing ? "Update the selected task details." : "Create a new task with a title and due date."}</p>
                            </div>
                            <button
                                className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                                onClick={closeModal}
                                type="button"
                                aria-label="Close task form"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <TaskForm
                            key={isEditing ? selectedTask?.id : "new-task"}
                            selectedTask={isEditing ? selectedTask : null}
                            onDone={closeModal}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
