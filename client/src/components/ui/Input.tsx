interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({ label, error, ...props }: Props) {
  return (
    <div className="space-y-1">
      <label>{label}</label>

      <input
        {...props}
        className="
        w-full
        border
        rounded-lg
        p-3
        "
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
