import type * as React from "react";
import { useState } from "react";

export default () => {
  const [username, setUsername] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      alert("Please enter username");
      return;
    }
    
    try {
      console.log("Sending username to backend:", username);
      
      alert(`Welcome ${username}! Entering chatroom...`);
      
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
    
  return (
    <div>
      <h1>Welcome to Chat Box</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Please input your username"
        />
        <button type="submit">
          Enter Chatroom
        </button>
      </form>
    </div>
  );
};
