import React, { useState, useEffect} from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [conversations, setConversations] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => {
        const newConversation = {
          userMessage: message,
          kevinResponse: data.message
        };
        setConversations([...conversations, newConversation]);
        setMessage(''); // Clear input box
      });
  };

  return (
    <div className="App">
        <h1>Kevin AI</h1>
        <form onSubmit={handleSubmit}>
            <textarea
                className="inputBox"
                value={message}
                placeholder="Ask me a question"
                onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <div className="buttonContainer">
                <button className="submitButton" type="submit">Submit</button>
            </div>
        </form>
        <div className="conversationContainer">
            {conversations.map((conv, index) => (
                <div key={index}>
                    <div className="userMessage"><b>Interviewer:</b><span>{conv.userMessage}</span> </div>
                    <div className="responseBox"><b>Kevin:</b><span>{conv.kevinResponse}</span></div>
                </div>
            ))}
        </div>
    </div>
  );
}

export default App;
