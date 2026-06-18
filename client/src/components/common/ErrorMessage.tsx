interface Props {
  message?: string;
}

const ErrorMessage = ({ message = "Something went wrong" }: Props) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
      {message}
    </div>
  );
};

export default ErrorMessage;
