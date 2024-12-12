import { useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { useMutation } from "react-query";
import axios from "axios";

interface Cookies {
  [key: string]: string | undefined;
}

const incrementCount = async (postId: string): Promise<number> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/posts/${postId}/view`
    );

    return response.data;
  } catch (error) {
    return 0;
  }
};

export const useIncrementOnLoad = (postId: string | undefined) => {
  const [count, setCount] = useState<number | 0>(0);
  const [cookies, setCookie] = useCookies();
  const hasRun = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (!postId) return;

    if (!hasRun.current[postId]) {
      const cookieKey = `lastIncrement_${postId}`;
      const lastIncrement = cookies[cookieKey]
        ? new Date(cookies[cookieKey])
        : null;
      const now = new Date();

      if (
        !lastIncrement ||
        now.getTime() - lastIncrement.getTime() > 2 * 60 * 60 * 1000
      ) {
        hasRun.current[postId] = true;
        incrementCount(postId).then((newCount) => {
          setCount(newCount);
          const now = new Date();
          setCookie(cookieKey, now.toISOString(), {
            path: "/",
            maxAge: 2 * 60 * 60, // 2 hours
          });
        });
      }
    }
  }, [postId, cookies, setCookie]);

  return { count };
};
