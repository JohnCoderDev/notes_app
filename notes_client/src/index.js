import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./styles/main.css";
import { Note } from "./components/Note";

const baseURL = "http://localhost:8000";

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  const createNote = async (event) => {
    event.preventDefault();

    const request = new Request(`${baseURL}/posts/`, {
      body: JSON.stringify({
        title,
        content,
      }),
      headers: {
        "Content-Type": "Application/JSON",
      },
      method: "POST",
    });

    const response = await fetch(request);
    const data = await response.json();

    if (response.ok) {
      console.log(data);
    } else {
      console.log("failed network request");
    }

    setTitle("");
    setContent("");
    setModalVisible(false);
    getAllPosts();
  };

  const getAllPosts = async () => {
    const response = await fetch(`${baseURL}/posts/`);
    const data = await response.json();
    if (response.ok) {
      setPosts(data);
    } else {
      console.error("failed network request");
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const deleteItem = async (noteId) => {
    const response = await fetch(`${baseURL}/posts/${noteId}/`, {
      method: "DELETE",
    });
    getAllPosts();
  };


  return (
    <div>
      <div className="header">
        <div className="logo">
          <p className="title">Notes</p>
        </div>
        <div className="add-section">
          <a href="#" className="add-btn" onClick={() => setModalVisible(true)}>
            Add note
          </a>
        </div>
      </div>

      {posts.length > 0 ? (
        <div className="note-list">
          {posts.map((item) => (
            <Note
              title={item.title}
              content={item.content}
              onclick={() => deleteItem(item.id)}
              key={item.id}
            />
          ))}
        </div>
      ) : (
        <div className="posts">
          <p className="center-text">No notes</p>
        </div>
      )}
      <div className={modalVisible ? "modal" : "modal-not-visible"}>
        <div className="form">
          <div className="form-header">
            <div>
              <p className="form-header-text">Add new note</p>
            </div>
            <div>
              <a
                href="#"
                className="close-btn"
                onClick={() => setModalVisible(false)}
              >
                x
              </a>
            </div>
          </div>

          <form action="">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                name="content"
                id="content"
                className="form-control"
                cols="30"
                rows="5"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="save"
                className="btn-save"
                onClick={createNote}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
