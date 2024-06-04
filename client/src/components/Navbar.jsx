import useUserStore from "../hooks/useUserStore";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { logout } from "../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserRound } from "lucide-react";

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
    <div className="flex flex-col md:flex-row w-full md:justify-between items-center space-y-4 md:space-y-0 px-6 lg:px-32 xl:px-52 py-2 md:py-4 xl:py-4 bg-secondary-200 text-primary">
      <h2 className="text-3xl xl:text-5xl font-light">
        <Link to="/">BrainOP Technologies</Link>
      </h2>
      <div className="flex justify-center items-center space-x-6">
        {user && (
          <Button onClick={handleLogout} className="bg-primary px-4 py-2">
            Logout
          </Button>
        )}
        <div className="flex items-center space-x-4">
          <div className="flex flex-col">
            <span className="hover:underline cursor-pointer text-xl font-medium">
              {user?.name}
            </span>
            <span className="text-xs text-gray-500">{user?.email}</span>
          </div>
          <div
            className={`rounded-full w-12 h-12 overflow-hidden flex justify-center items-center ${
              !user?.profilePicture?.url ? "border-[3px] border-primary" : ""
            }`}
          >
            {user?.profilePicture?.url ? (
              <img
                src={user.profilePicture.url.replace(
                  "/upload",
                  `/upload/w_150`
                )}
                alt="profile-pic"
              />
            ) : (
              <UserRound className="w-8 h-8" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
