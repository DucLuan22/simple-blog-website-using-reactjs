import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useMutation } from "react-query";
import axios from "axios";

const incrementCount = async (postId: string): Promise<number> => {
  const response = await axios.post<{ newCount: number }>(
    `http://localhost:5000/api/posts/updateViewCount/${postId}`
  );
  return response.data.newCount;
};

export const useIncrementOnLoad = (postId: string | null) => {
  const [count, setCount] = useState<number | null>(null);
  const [cookies, setCookie] = useCookies(["lastIncrement"]);

  const mutation = useMutation<number, unknown, string>(
    (postId) => incrementCount(postId),
    {
      onSuccess: (newCount) => {
        setCount(newCount);
      },
    }
  );

  useEffect(() => {
    const lastIncrement = cookies.lastIncrement
      ? new Date(cookies.lastIncrement)
      : null;
    const now = new Date();

    if (
      postId && // Ensure postId is not null
      (!lastIncrement ||
        now.getTime() - lastIncrement.getTime() > 2 * 60 * 60 * 1000)
    ) {
      mutation.mutate(postId, {
        onSuccess: () => {
          setCookie("lastIncrement", now.toISOString(), {
            path: "/",
            maxAge: 2 * 60 * 60,
          });
        },
      });
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return { count };
};
