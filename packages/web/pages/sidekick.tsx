import React, { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router'

const MyPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('')
  const [responseText, setResponseText] = useState('')
  const [status, setStatus] = useState("toDo");
  const router = useRouter()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setResponseText('');// clear previous response

    try {
      const response = await axios.post(`/api/openai/query`, { prompt: inputValue, statusCategoy: status });
      const data = await response.data;

      setResponseText(`CONTEXT:\n${data.context}\n\n\n ANSWER:\n\n${data.answer}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div style={{ 
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "100px" 
    }}>
        <h1>Jira Assistant</h1>
        
      <form onSubmit={handleSubmit}>
        <div>
            <input type="radio" id="toDo" name="status" value="toDo" checked={status === "toDo"} onChange={handleStatusChange}/>
            <label for="toDo">To Do</label>
            <input type="radio" id="done" name="status" value="Done" checked={status === "done"} onChange={handleStatusChange}/>
            <label for="done">Done</label>
        </div>
        <label>
          Question:
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            style={{ margin: "10px", width: "500px" }}
          />
        </label>
        <button type="submit" style={{ margin: "10px" }}>
          Submit
        </button>
      </form>
      {responseText && (
        <div style={{ marginTop: "20px" }}>
          <label>Answer:</label>
          <textarea
            value={responseText}
            readOnly={true}
            cols={100}
            rows={10}
            style={{ margin: "10px" }}
          />
        </div>
      )}
    </div>
  );
}

export default MyPage
