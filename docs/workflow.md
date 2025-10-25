[< Back](../README.md)

# Workflow

This is the workflow document for the Instant Messaging System.

- [ ] Home Page

- [ ] User
    - [ ] Register with username and password
        - [ ] Client: Validate username (Optional, reduce stupid requests)
        - [ ] Server: Check username duplication
        - [ ] Server: Validate username (Optional, avoid stupid names)
        - [ ] Server: Hash password (Bcrypt)
        - [ ] Server: Store user into database
    - [ ] Login with username and password
        - [ ] Server: Search user by username
        - [ ] Server: Validate password (Bcrypt)
        - [ ] Server: Return JWT in HTTP cookie (Include ID and username)
        - [ ] Client: Receive HTTP cookie and refresh state (Store ID and username in state)
    - [ ] Logout
        - [ ] Server: Delete JWT in HTTP cookie (And return the cookie in response)
        - [ ] Client: Refresh state (Whatever the response is success or not)
    - [ ] Change username
        - [ ] Server: Check username duplication
        - [ ] Server: Validate username (Optional, avoid stupid names)
        - [ ] Server: Validate password (Optional, security issue)
        - [ ] Server: Update username
    - [ ] Change password
        - [ ] Server: Validate password

- [ ] Chat Room
    - [ ] Room
        - [ ] Create room with name
            - [ ] Server: Create room in database
            - [ ] Server: Return room ID
            - [ ] Client: Receive room ID and redirect to room
        - [ ] Rename room
            - [ ] Server: Rename room in database
        - [ ] Delete room
            - [ ] Server: Delete room in database
            - [ ] Client: Redirect to home page if inside the room
        - [ ] Get all rooms
            - [ ] Server: Get a number of rooms from database (Cursor pagination if possible)
            - [ ] Client: Request more rooms when scroll to the bottom
        - [ ] Join room
            - [ ] Server: Add user to room
            - [ ] Client: Redirect to room
        - [ ] Get room info
            - [ ] Server: Get room info (e.g. users, messages) by room ID
        - [ ] Leave room
            - [ ] Server: Remove user from room by room ID
            - [ ] Client: Redirect to home page if inside the room
    - [ ] Chat
        - [ ] Send messages
            - [ ] Server: Store message into database
            - [ ] Client: Update the state of messages for all users
        - [ ] Receive messages
            - [ ] Server: Get a number of messages from database
            - [ ] Client: Request more messages when scroll to the top (Cursor pagination if possible)
        - [ ] Edit messages (Optional, function leaking as a feature)
            - [ ] Server: Update message
            - [ ] Client: Update the state of messages for all users
        - [ ] Delete messages (Optional, function leaking as a feature)
            - [ ] Server: Delete message
            - [ ] Client: Update the state of messages for all users

- [ ] Settings
    - [ ] Change theme (Follow system theme by default, with light and dark themes)
        - [ ] Client: Update the state of theme (React context (nesting hell?) or Zustand)
    - [ ] Change font size (Optional)
        - [ ] Client: Update the state of font size (React context (nesting hell?) or Zustand)
