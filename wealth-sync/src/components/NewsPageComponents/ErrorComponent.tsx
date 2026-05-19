import { IoIosWarning } from "react-icons/io";

function ErrorComponent({ error }: { error: string }) {
  return (
    <div>
      <IoIosWarning className="text-destructive mx-auto mt-6 text-4xl" />
      <p className="text-destructive text-md pt-2 text-center">{error}</p>
    </div>
  );
}

export default ErrorComponent;
