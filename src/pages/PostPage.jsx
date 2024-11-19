import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostService from "../components/useFetch";
import Navbar from "../components/Navbar";
export default function PostPage() {
  const [post, setPost] = useState(),
    [comments, setComments] = useState([]);
  const params = useParams();
  useEffect(() => {
    (async function () {
      setPost((await PostService.getById(params.id)).data);
      setComments((await PostService.getComments(params.id)).data);
    })();
  }, [params.id, comments.id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Navbar/>

      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {comments.map((comment) => {
        return <div key={comment.id}>{comment.email}</div>;
      })}
    </>
  );
}
