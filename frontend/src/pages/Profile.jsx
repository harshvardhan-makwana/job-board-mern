import { useSelector } from "react-redux";

function Profile() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>
      <div className="flex justify-center">
        <div className="border rounded-lg shadow p-6 bg-white max-w-md w-full">
          <div className="text-center space-y-3"> 
            <p className="text-lg">
              <span className="font-bold">Name:</span> {user.name}
            </p>
            <p className="text-lg">
              <span className="font-bold">Email:</span> {user.email}
            </p>
            <p className="text-lg">
              <span className="font-bold">Role:</span> {user.role}
            </p>
            <p className="text-lg">
              <span className="font-bold">Joined:</span> {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
