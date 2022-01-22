import logo from './logo.svg';
import './App.css';
import { DataStore } from '@aws-amplify/datastore';
import { Comment } from './models';
import {useEffect, useState} from "react";
import {API, graphqlOperation, input} from 'aws-amplify';
import * as subscriptions from './graphql/subscriptions';
import {onCreateComment} from "./graphql/subscriptions";
import {orderBy} from "lodash";
import {sortBy} from "lodash/collection";

function App() {

  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const createComment = async () => {
    await DataStore.save(
      new Comment({
        "content": inputValue,
        "created_at": new Date().toISOString(),
        "user_id": "a3f4095e-39de-43d2-baf4-f8c16f0f6f4d",
        "blogpost_id": "a3f4095e-39de-43d2-baf4-f8c16f0f6f4d"
      })
    );
    setInputValue('');
  }

  const fetchComments = async () => setComments(orderComments(await DataStore.query(Comment)));

  const orderComments = (comments) => (orderBy(comments, (c) => {console.log(new Date(c.created_at).getTime())}, 'ASC'))

  useEffect(async () => {
    await fetchComments();

    const subscription = API.graphql(
      graphqlOperation(subscriptions.onCreateComment)
    ).subscribe({
      next: ({ provider, value: { data: { onCreateComment: newComment } }}) => {
        setComments((p) => orderComments([newComment, ...p]))
      },
      error: error => console.warn(error)
    });

    return () => subscription.unsubscribe();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         Sziasztok.
          <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
          <button onClick={createComment}>Katt ide</button>
        </p>
        <p>
          {comments.map(comment => <div style={{ backgroundColor: 'PapayaWhip', borderRadius: '50%', padding: '1rem', margin: '1rem', color: 'black' }}>
            <h1>{comment.content}</h1>
            <h5>{comment.created_at}</h5>
          </div>)}
        </p>
      </header>
    </div>
  );
}

export default App;
