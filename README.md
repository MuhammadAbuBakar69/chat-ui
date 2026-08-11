# Real-Time Chat UI Starter (Vite + React)

A modern, responsive messaging interface with simulated real-time bot responses and typing indicators.

## Features
- **Real-Time Simulation**: Immediate user message rendering followed by simulated bot responses with natural delay.
- **Typing Indicator**: Animated loading dots when bot is generating a reply.
- **Auto-scroll Stream**: Automatically scrolls to bottom as new messages arrive using React `useRef`.
- **Quick Prompts**: Preset interactive question chips for rapid testing.
- **Custom Bubble Styling**: Distinct styling for user (right, green bubble) vs bot (left, dark bubble) messages.

## Project Structure
- `chat-ui_App.jsx`: Main React component for messaging logic, mock AI bot handler, and scrolling.
- `chat-ui_App.css`: Modern dark messaging theme with animated CSS typing indicator.

## How to Run in Vite React App
1. Place `chat-ui_App.jsx` and `chat-ui_App.css` into your Vite project's `src` folder.
2. Import `chat-ui_App.jsx` into `main.jsx` or `App.jsx`.
3. Run `npm run dev`.
