import { useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { useMutation } from "react-query";
import axios from "axios";

interface Cookies {
  [key: string]: any;
}

const incrementCount = async (postId: string): Promise<number> => {
  const response = await axios.post(
    `http://localhost:5000/api/posts/updateViewCount/${postId}`
  );
  return response.data.newCount;
};

export const useIncrementOnLoad = (postId: string | null) => {
  const [count, setCount] = useState<number | null>(null);
  const [cookies, setCookie] = useCookies(["lastIncrement"]);
  const hasRun = useRef<{ [key: string]: boolean }>({});

  const mutation = useMutation<number, unknown, string>(
    (postId) => incrementCount(postId),
    {
      onSuccess: (newCount) => {
        setCount(newCount);
        const now = new Date();
        const cookieKey = `lastIncrement_${postId}` as "lastIncrement";
        setCookie(cookieKey, now.toISOString(), {
          path: "/",
          maxAge: 2 * 60 * 60,
        });
      },
    }
  );

  useEffect(() => {
    if (!postId || hasRun.current[postId]) return;

    const cookieKey = `lastIncrement_${postId}`;
    const lastIncrement = (cookies as Cookies)[cookieKey]
      ? new Date((cookies as Cookies)[cookieKey])
      : null;
    const now = new Date();

    if (
      !lastIncrement ||
      now.getTime() - lastIncrement.getTime() > 2 * 60 * 60 * 1000
    ) {
      hasRun.current[postId] = true;
      mutation.mutate(postId);
    }
  }, [postId, cookies, mutation]);

  return { count };
};
