import { useEffect, useState } from "react";
import { getUser, getPosts } from "../api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import useUserStore from "../hooks/useUserStore";
import Post from "../components/Post";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

export default function Posts() {
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const limit = 8;
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOnScroll = () => {
    // check if user scrolled to end
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight
    ) {
      // if user scrolled to end increment page
      setPage((prev) => prev + 1);
    }
  };

  const handleError = (err) => {
    // if there is no response from the server
    if (!err.response || err.code === "ERR_NETWORK") {
      toast.error(err.message);
      toast.error("Server Unavailable");
    } else {
      // INVALID_JWT for invalid jwt token
      // TOKEN_EXPIRED for jwt token expired
      // JWT_NOT_FOUND for jwt token not found in cookie
      const codes = ["INVALID_JWT", "TOKEN_EXPIRED", "JWT_NOT_FOUND"];

      if (codes.includes(err.response?.data?.error)) {
        // navigate to login page
        navigate("/user/login");
      } else if (err.response.status === 500) {
        toast.error("Internal Server Error");
      } else {
        toast.error("Oops! Something went wrong. Please try again");
      }
    }
  };

  useEffect(() => {
    if (!user) {
      getUser()
        .then((user) => {
          setUser(user);
          navigate("/");
        })
        .catch((err) => handleError(err));
    }
    window.addEventListener("scroll", handleOnScroll);
    return () => {
      window.removeEventListener("scroll", handleOnScroll);
    };
  }, []);

  useEffect(() => {
    if (user) {
      getPosts()
        .then((posts) => {
          setPosts(posts);
        })
        .catch((err) => handleError(err));
    }
  }, [user]);

  useEffect(() => {
    setLoading(true);
    getPosts(page, limit)
      .then((newPosts) => {
        setLoading(false);
        setPosts((prev) => [...prev, ...newPosts]);
      })
      .catch((err) => {
        setLoading(true);
        handleError(err);
      });
  }, [page]);

  return (
    <div className=" bg-secondary-300 to- min-h-screen urbanist">
      <Navbar />
      <div className=" px-6 py-2 md:py-4 md:px-20 lg:px-32 xl:px-52 xl:py-16 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
        {posts.map((post, i) => (
          <Post key={i} post={post} />
        ))}
      </div>
      <div className="flex w-full justify-center items-center pt-0 pb-16">
        {loading && <Loader className="w-10 h-10 fill-primary" />}
      </div>
    </div>
  );
}
