import logo from './logo.svg';
import './App.css';
import { DataStore } from '@aws-amplify/datastore';
import { Comment } from './models';
import {useEffect, useState} from "react";

function App() {

  const [comments, setComments] = useState([]);

  const createComment = async () => {
    await DataStore.save(
      new Comment({
        "content": `Lorem ipsum dolor sit amet, ${Date.now()}`,
        "created_at": "1970-01-01T12:30:23.999Z",
        "user_id": "a3f4095e-39de-43d2-baf4-f8c16f0f6f4d",
        "blogpost_id": "a3f4095e-39de-43d2-baf4-f8c16f0f6f4d"
      })
    );
    fetchComments();
  }

  const fetchComments = async () => setComments(await DataStore.query(Comment));

  useEffect(() => {
    fetchComments();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         Sziasztok.
          <button onClick={createComment}>Katt ide</button>
        </p>
        <p>
          {comments.map(comment => <h1>{comment.content}</h1>)}
        </p>
      </header>
    </div>
  );
}

export default App;
