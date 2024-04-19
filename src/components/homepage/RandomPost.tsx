import { Button } from "../ui/button";

function RandomPost() {
  return (
    <div className="flex md:flex-row flex-col md:justify-start items-start md:items-center gap-5">
      <div className="max-w-[600px] overflow-hidden basis-1/2">
        <img
          src="https://images.unsplash.com/photo-1713365747492-7918df1942b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D"
          alt="test"
          className="w-full"
        />
      </div>

      <div className="basis-1/2 space-y-3">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold line ">
          This is an example title for a blog post and is only used for testing
        </h2>
        <p className="line-clamp-2 md:line-clamp-3 lg:line-clamp-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quos
          quas sequi beatae fugit nesciunt aliquam, a eveniet aspernatur ducimus
          tenetur repellendus earum in inventore alias, perferendis provident?
          Cumque, tenetur.
        </p>
        <Button aria-label="Read More" variant={"outline"}>
          Read More
        </Button>
      </div>
    </div>
  );
}

export default RandomPost;
