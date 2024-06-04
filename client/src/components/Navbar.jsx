import useUserStore from "../hooks/useUserStore";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { logout } from "../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Navbar() {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  const handleError = (err) => {
    if (!err.response || err.code === "ERR_NETWORK") {
      toast.error(err.message);
      toast.error("Server Unavailable");
    } else {
      if (err.response.status === 500) {
        toast.error("Internal Server Error");
      } else {
        toast.error("Oops! Something went wrong. Please try again");
      }
    }
  };
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("User logged out Successfully");
      navigate("/user/login");
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <div className="flex w-full justify-between items-center px-6 lg:px-32 xl:px-52 py-2 md:py-4 xl:py-4   bg-secondary-200 text-primary">
      <h2 className="text-3xl xl:text-5xl font-light">
        <Link to="/">BrainOP Technologies</Link>
      </h2>
      <div className="flex items-center space-x-4">
        {user && (
          <Button onClick={handleLogout} className="bg-primary px-4 mr-2 py-2">
            Logout
          </Button>
        )}
        <div className="flex flex-col">
          <span className="hover:underline cursor-pointer text-xl font-medium">
            {user?.name}
          </span>
          <span className="text-xs text-gray-500">{user?.email}</span>
        </div>
        <div className="rounded-full w-12 h-12 overflow-hidden">
          {user && (
            <img
              src={user.profilePicture.url.replace("/upload", `/upload/w_150`)}
              alt="profile-pic"
            />
          )}
        </div>
      </div>
    </div>
  );
}
