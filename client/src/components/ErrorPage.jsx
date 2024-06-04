import { Link } from "react-router-dom";
export default function ErrorPage() {
  return (
    <div className="min-h-[75vh] mb-8 w-screen flex flex-col justify-center items-center">
      <h1 className="text-6xl text-red-500 mb-8">Error</h1>

      <div className="text-center text-3xl flex flex-col items-center gap-6 font-extralight">
        <p className="text-gray-300 max-w-[45rem] ">
          Oops! an unexpected error occurred. Please try again later or go to
          homepage. Report this error at someemail@gmail.com
        </p>

        <Link className=" text-primary text-2xl hover:underline" to="/">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
