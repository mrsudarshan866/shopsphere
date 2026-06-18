import { useAuth } from "../../hooks/useAuth";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="bg-white rounded-xl p-8 shadow">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>

        <p>
          <strong>Name:</strong> {user?.name}
        </p>

        <p className="mt-3">
          <strong>Email:</strong> {user?.email}
        </p>

        <p className="mt-3">
          <strong>Role:</strong> {user?.role}
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
