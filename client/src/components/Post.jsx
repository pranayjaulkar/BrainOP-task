export default function Post({ post }) {
  return (
    <div className="w-full border border-gray-800  cursor-pointer bg-secondary-200 text-gray-400 flex flex-col rounded-lg overflow-hidden shadow-lg">
      <div className="w-full h-56 overflow-hidden flex justify-center">
        <img
          className="object-cover w-full"
          src={post.images[0].url}
          alt={post.title}
        />
      </div>
      <div className="w-full h-56 p-4 flex flex-col items-start space-y-1">
        <span className="w-full text-xl text-gray-300 font-medium mb-2">
          {post.title}
        </span>
        <span className="w-full h-12 text-sm overflow-hidden">
          {post.content.length > 90
            ? post.content.substring(0, 90) + "..."
            : post.content}
        </span>
        <div className="flex items-end grow">
          <div className="flex justify-start space-x-4 items-center">
            <div className="rounded-full w-16 h-16 overflow-hidden flex justify-center">
              <img
                className="object-cover w-full"
                src={post.author.profilePicture.url}
                alt={post.title}
              />
            </div>
            <div className="flex flex-col ">
              <span className="font-medium hover:underline text-primary leading-5 text-md">
                {post.author.name}
              </span>
              <span className="text-sm">{post.author.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
