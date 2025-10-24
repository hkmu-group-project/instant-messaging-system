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
          進入聊天室
        </button>
      </form>
    </div>
  );
};
