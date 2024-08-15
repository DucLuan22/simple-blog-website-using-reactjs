import useBookmarkById from "@/hooks/useGetBookMarkById";
import { useCounterStore } from "@/store";
import React from "react";

function BookMark() {
  const user = useCounterStore((state) => state.user);
  const { data, isError, isLoading } = useBookmarkById(user?.id);

  if (isLoading) {
    return <div></div>;
  }

  console.log(data);
  return (
    <div>
      {data?.map((post) => (
        <div>1</div>
      ))}
    </div>
  );
}

export default BookMark;
