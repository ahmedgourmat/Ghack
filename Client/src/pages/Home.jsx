import {
  SignOutButton,
  SignedIn,
  SignedOut,
  UserProfile,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      HOME
      <div
        style={{
          display: "flex",
        }}
      >
        <SignedOut>
          <Link to="/login">Login</Link>
        </SignedOut>
      </div>
      <SignedIn>
        <SignOutButton />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <UserProfile />
        </div>
      </SignedIn>
    </div>
  );
}

export default Home;
