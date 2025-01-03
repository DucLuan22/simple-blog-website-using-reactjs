import React from "react";
import { Link } from "react-router-dom";

type SearchPost = {
  title: string;
  thumbnail: string;
  post_id: string;
};

interface SearchResultsProps {
  posts: SearchPost[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  posts,
  isLoading,
  isError,
  error,
  setSearchValue,
}) => {
  if (isLoading) {
    return (
      <div className="absolute top-full left-0 w-full trans shadow-lg rounded-md p-4">
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="absolute top-full left-0 w-full shadow-lg rounded-md p-4">
        <p className="text-red-500">Error: {error?.message}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="absolute top-full  bg-primary-foreground translate-y-2 *:left-0 w-full  shadow-lg rounded-md p-4">
        <p className="text-gray-500">No results found</p>
      </div>
    );
  }

  return (
    <section className="absolute top-full left-0 w-full bg-primary-foreground bg-op shadow-lg rounded-md mt-2 p-2 z-50 max-h-[400px] overflow-y-scroll scroll">
      {posts.map((post) => (
        <Link
          to={`/posts/${post.post_id}`}
          onClick={() => setSearchValue("")}
          key={post.post_id}
          className="border-b last:border-b-0 p-2 hover:bg-gray-600 hover:bg-opacity-30 flex gap-x-2"
        >
          <div className="w-[100px] lg:w-[100px] xl:w-[120px]">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="object-cover rounded-md"
            />
          </div>
          <p className="font-semibold line-clamp-1">{post.title}</p>
        </Link>
      ))}
    </section>
  );
};

export default SearchResults;
