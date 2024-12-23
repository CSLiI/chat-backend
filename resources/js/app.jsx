import React from "react";
import ReactDOM from "react-dom/client";
import Chat from "./components/Chat";


const App = () => {
  return (
    <>
      <h1>Asssignment</h1>
      <Chat />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("app")).render(<App />)

export default App;
