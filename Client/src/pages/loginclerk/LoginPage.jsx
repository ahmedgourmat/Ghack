import { SignIn } from "@clerk/clerk-react";

function App() {
  return (
    <div>
      {/* This content is public. Only signed out users can see this. */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SignIn />
      </div>
    </div>
  );
}

export default App;
