import type * as React from "react";

export default () => {
  const [username, setUsername] = useState("");
    
return (
    <div>
      <h1>Welcome Come to Chat Box</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Please input yout username"
        />
        <button type="submit">
          Get in Chatroom
        </button>
      </form>
    </div>
  );
};
