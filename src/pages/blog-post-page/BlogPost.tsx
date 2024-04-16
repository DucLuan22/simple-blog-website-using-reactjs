import { useParams } from "react-router-dom";

function BlogPost() {
  const params = useParams();
  return <div>{params.postId}</div>;
}

export default BlogPost;
