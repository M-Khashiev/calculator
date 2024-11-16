import { useEffect, useMemo, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate

export default function PostList({ list, onClick }) {
  const [query, setQuery] = useState("");
  const [value, setValue] = useState("title");
  const navigate = useNavigate();

  let search = useMemo(() => {
   
    return  list.sort((a,b) => a[value].localeCompare(b[value])).filter((post) => post.title.includes(query));
  }, [query, list,value]);


  return (
    <>
    <select onChange={(e)=>setValue(e.target.value)}>
    <option value="title">Title</option>
    <option value="body">Body</option>
    </select>
      <Input placeholder="Поиск" onChange={(e) => setQuery(e.target.value)} />
      {search.map((post, index) => (
        <div key={post.id}>
          <h2>{index+1}. {post.title}</h2>
          <p>{post.body}</p>
          <Button onClick={() => navigate(`/posts/${post.id}`)}>Open</Button> {/* Используем navigate */}
          <Button onClick={() => onClick(post)}>Delete</Button>
        </div>
      ))}
    </>
  );
}