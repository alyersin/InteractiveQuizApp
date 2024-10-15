import { useState } from "react";

export default function RegistrationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const registerHandler = async (event) => {
  event.preventDefault();

  console.log("Email:", email);
  console.log("Password:", password);

  const response = await fetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const text = await response.text(); // Log the raw response text for debugging
  console.log("Response Text:", text); // Log the raw response text

  let data;
  try {
    data = JSON.parse(text); // Attempt to parse the response as JSON
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return; // Exit if JSON parsing fails
  }

  console.log(data);
};

  

  return (
    <form onSubmit={registerHandler}>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Register</button>
    </form>
  );
}
