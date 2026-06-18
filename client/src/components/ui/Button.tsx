import { type ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function Button({ children, loading, ...props }: Props) {
  return (
    <button
      {...props}
      disabled={loading}
      className="
      w-full
      bg-black
      text-white
      py-3
      rounded-lg
      hover:opacity-90
      transition
      "
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
