import { IoIosWarning } from "react-icons/io";

function ErrorComponent({ error }: { error: string }) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="mt-10 rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-sm dark:border-gray-700 dark:bg-slate-900/80"
    >
      <IoIosWarning className="text-destructive mx-auto mt-6 text-6xl" />
      <p className="text-destructive text-md pt-2 text-center">{error}</p>
    </div>
  );
}

export default ErrorComponent;
