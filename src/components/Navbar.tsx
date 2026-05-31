import { NavLink } from "react-router-dom";
import { CheckCircle2, ClipboardList } from "lucide-react";

export default function Navbar() {
    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition ${isActive ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`

    return (
        <nav className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <div>
                    <h1 className="text-xl font-semibold text-slate-900">Task Dashboard</h1>
                    <p className="text-sm text-slate-500">Manage tasks, filters, and progress.</p>
                </div>
                <div className="flex gap-2">
                    <NavLink className={linkClass} to={"/"}>
                        <ClipboardList size={17} />
                        All Tasks
                    </NavLink>
                    <NavLink className={linkClass} to={"/completed"}>
                        <CheckCircle2 size={17} />
                        Completed
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}
