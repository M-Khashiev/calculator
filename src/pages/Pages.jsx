import { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import PostList from "../components/PostList";
import Dialog from "../components/Modal";
import PostService from "../components/useFetch";
import Navbar from "../components/Navbar";


export default function Posts() {
  const [list, setList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [open, setOpen] = useState(false);
  const [totals, setTotals] = useState(0);

  const lastElement = useRef();
  const observer = useRef();


  useEffect(() => {
    (async function () {
      setLoader(true);
        const response = await PostService.getAll(limit, page);
        setList((prevList) => [...prevList, ...response.data]);
        setTotals(response.headers["x-total-count"]);
        setLoader(false);
    })();
  }, [page, limit]);

  useEffect(() => {
    if (loader) return;

    const callback = (entries)=> {
      console.log(entries)
      if (entries[0].isIntersecting && page * limit < totals) {
        setPage((prevPage) => prevPage + 1);
      }
      
    };

    observer.current = new IntersectionObserver(callback);
    if (lastElement.current) {
      observer.current.observe(lastElement.current);
    }

    return () => {
      if (observer.current && lastElement.current) {
        observer.current.unobserve(lastElement.current);
      }
    };
  }, [loader, page, totals]);

  const refs = {
    title: useRef(),
    body: useRef(),
    dialog: useRef(),
  };

  const handleClick = () => {
    const title = refs.title.current.value.trim();
    const body = refs.body.current.value.trim();
  
    if (title && body) {
      setList((prevList) => [
        ...prevList,
        { userId: Math.random(), id: Math.random(), title, body }
      ]);
      setOpen(false);
      refs.title.current.value = refs.body.current.value = "";
    } else {
      alert("Введите название и описание!");
    }
  };
  
  const deletePost = (post) => {
    setList((prevList) => prevList.filter((p) => p.id !== post.id));
  };

  if (open) {
    refs.dialog.current.oncancel = () => setOpen(false);
  }



  return (
    <>
      <a href="/dom">О нас</a>
      <Navbar />
      <Button onClick={() => setOpen(true)}>Создать пользователя</Button>
      <Dialog dialog={refs.dialog} open={open}>
        <Button className="close" onClick={() => setOpen(false)}>
          Закрыть
        </Button>
        <h2>Создать пользователя</h2>
        <Input placeholder="Имя" ref={refs.title} />
        <Input placeholder="Город" ref={refs.body} />
        <Button onClick={handleClick}>Добавить пользователя</Button>
      </Dialog>
      {loader && page===1? (
        <span className="loader"></span>
      ) : (
        <>
          <PostList list={list} onClick={deletePost} />
          <div ref={lastElement} style={{ height: 20}} />
        </>
      )}
    </>
  );
}
