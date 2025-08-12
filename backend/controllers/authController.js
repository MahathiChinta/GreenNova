import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { users } from "../utils/seed.js";
import { generateToken } from "../utils/generateToken.js";

// 🔹 TEMP: ensure seed users exist
const ensureSeedUsers = () => {
  const seedAccounts = [
    { email: "gov@greennova.com", password: "gov123", role: "government", name: "Government" },
    { email: "company@greennova.com", password: "company123", role: "company", name: "Company" }
  ];
  for (const acc of seedAccounts) {
    if (!users.find(u => u.email === acc.email)) {
      const passwordHash = bcrypt.hashSync(acc.password, 10);
      users.push({ id: uuidv4(), email: acc.email, passwordHash, role: acc.role, name: acc.name });
    }
  }
};
ensureSeedUsers();

// Signup
export const signup = async (req, res) => {
  const { email, password, role = "company", name } = req.body;
  if (!email || !password) return res.status(400).json({ error: "email and password required" });
  if (users.find((u) => u.email === email)) return res.status(400).json({ error: "email already used" });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = { id: uuidv4(), email, passwordHash, role, name: name || email.split("@")[0] };
  users.push(user);

  const token = generateToken({ id: user.id, role: user.role, email: user.email });
  res.json({ user: { id: user.id, email: user.email, role: user.role, name: user.name }, token });
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = generateToken({ id: user.id, role: user.role, email: user.email });
  res.json({ user: { id: user.id, email: user.email, role: user.role, name: user.name }, token });
};
