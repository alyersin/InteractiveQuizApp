
import { hash } from "bcryptjs"; 
import clientPromise from './DB'; 

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    try {
      const client = await clientPromise; 
      const db = client.db();

      const hashedPassword = await hash(password, 12);

      const result = await db.collection("users").insertOne({
        email,
        password: hashedPassword,
      });

      res.status(201).json({ message: "User created!" });
    } catch (error) {
      console.error('Error during user registration:', error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
