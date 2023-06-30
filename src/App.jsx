import Home from "./components/home/Home";
import NewPost from "./components/posts/NewPost";
import PostPage from "./components/posts/PostPage";
import About from "./components/about/About";
import EditPost from "./components/edit/EditPost";
import Missing from "./components/missing/Missing";
import Header from "./components/header/Header";
import Nav from "./components/nav/Nav";
import Footer from "./components/footer/Footer";
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import './index.css';
import api from "./components/api/api";
import useAxiosFetch from "./hooks/useAxiosFetch";
import useWindowSize from "./hooks/useWindowSize";

function App() {
  const [posts, setPosts] = useState([
    // {
    //   id: 1,
    //   title: "My 1st Post",
    //   datetime: "June 28th, 2023 16:44 PM",
    //   body: "It is so easy to be great nowadays"
    // },
    // {
    //   id: 2,
    //   title: "My 2nd Post",
    //   datetime: "June 28th, 2023 16:44 PM",
    //   body: "The moment you assume somebody is smarter than you, they immediately become stupid"
    // },
    // {
    //   id: 3,
    //   title: "My 3rd Post",
    //   datetime: "June 28th, 2023 16:44 PM",
    //   body: "Living with the Communists long enough makes me understand how selfish and stupid they are"
    // },
    // {
    //   id: 4,
    //   title: "My 4th Post",
    //   datetime: "June 28th, 2023 16:44 PM",
    //   body: "There are no Logical Reasons to choose the Communists. Yet, Northerners chose them anyway. What a bunch of idiots"
    // }
  ])
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate();
  const { width } = useWindowSize();

  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');



  useEffect(() => {
    setPosts(data);
  }, [data])

  useEffect(() => {
    const filteredResults = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  }, [posts, search])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts?.length ? posts[posts?.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await api.post('/posts', newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(posts?.map(post => post?.id === id ? { ...response.data } : post));
      setEditTitle('');
      setEditBody('');
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = posts?.filter(post => post.id !== id);
      setPosts(postsList);
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }


  return (
    <>
      <div className="App">
        <Header title="React JS Blog" width={width}/>
        <Nav search={search} setSearch={setSearch} />
        <Routes>
          <Route exact path="/" element={<Home posts={searchResults} />}>
          </Route>
          <Route exact path="/post" element={<NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />}>

          </Route>
          <Route path="/edit/:id" element={<EditPost
            posts={posts}
            handleEdit={handleEdit}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editBody={editBody}
            setEditBody={setEditBody}
          />}>

          </Route>
          <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete} />}>

          </Route>
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App;
