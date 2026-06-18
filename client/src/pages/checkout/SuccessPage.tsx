import { Link } from "react-router-dom";

export default function SuccessPage() {
  return (
    <div
      className="
      min-h-screen
      flex
      flex-col
      justify-center
      items-center
      "
    >
      <h1
        className="
        text-5xl
        font-bold
        "
      >
        Payment Success
      </h1>

      <Link
        to="/orders"
        className="
        mt-5
        bg-black
        text-white
        px-6
        py-3
        rounded
        "
      >
        View Orders
      </Link>
    </div>
  );
}
