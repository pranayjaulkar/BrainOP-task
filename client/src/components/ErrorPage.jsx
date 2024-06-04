import { Link } from "react-router-dom";
export default function ErrorPage() {
  return (
    <div className="min-h-[75vh] mb-8 w-screen flex flex-col justify-center items-center">
      {/* <h1 className="text-6xl text-red-500 mb-8">
        404 <span className="text-gray-300">Not found</span>
      </h1> */}
      <div className="text-center text-3xl flex flex-col items-center gap-6 font-extralight">
        <p className="text-gray-300 max-w-[45rem] ">
          {/* Oops! The page you`&apos;re looking for can`&apos;t be found. It may
          have been moved or deleted. */}
          Oop! Somethin went wrong.
        </p>
        <Link className=" text-primary text-2xl hover:underline" to="/">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
