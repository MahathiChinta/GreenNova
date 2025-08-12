// utils/seed.js
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

// Users
export let users = [
  {
    id: uuidv4(),
    email: "gov@greennova.com",
    passwordHash: bcrypt.hashSync("gov123", 10),
    role: "government",
    name: "Government Admin",
  },
  {
    id: uuidv4(),
    email: "company@greennova.com",
    passwordHash: bcrypt.hashSync("company123", 10),
    role: "company",
    name: "Company Admin",
  },
];

// Companies
export let companies = [
  { id: uuidv4(), name: "AI Dynamics", region: "north" },
  { id: uuidv4(), name: "NeuroTech", region: "south" },
  { id: uuidv4(), name: "SpeakAI", region: "east" },
  { id: uuidv4(), name: "RoboMind", region: "west" },
  { id: uuidv4(), name: "SummarAI", region: "north" },
  { id: uuidv4(), name: "PixelGen", region: "south" },
  { id: uuidv4(), name: "ShopSmart AI", region: "east" },
  { id: uuidv4(), name: "MediAI", region: "west" },
  { id: uuidv4(), name: "ConvoTech", region: "north" },
  { id: uuidv4(), name: "LangCore", region: "south" },
  { id: uuidv4(), name: "SecureAI", region: "east" },
  { id: uuidv4(), name: "EdgeMind", region: "west" },
  { id: uuidv4(), name: "GridSense", region: "north" },
];

// Jobs
export let jobs = [
  { _id: uuidv4(), title: "Train Vision Model - Retail Analytics", company: "AI Dynamics", region: "north", status: "open", carbon: 220 },
  { _id: uuidv4(), title: "Fine-tune LLM - Customer Support Bot", company: "NeuroTech", region: "south", status: "open", carbon: 180 },
  { _id: uuidv4(), title: "Train Speech Recognition Model", company: "SpeakAI", region: "east", status: "in-progress", carbon: 250 },
  { _id: uuidv4(), title: "Reinforcement Learning - Robotics Arm", company: "RoboMind", region: "west", status: "closed", carbon: 140 },
  { _id: uuidv4(), title: "Hyperparameter Search - NLP Summarizer", company: "SummarAI", region: "north", status: "open", carbon: 200 },
  { _id: uuidv4(), title: "GAN Training - Image Generation", company: "PixelGen", region: "south", status: "in-progress", carbon: 210 },
  { _id: uuidv4(), title: "Recommendation System Training", company: "ShopSmart AI", region: "east", status: "closed", carbon: 175 },
  { _id: uuidv4(), title: "Train AI for Medical Diagnosis", company: "MediAI", region: "west", status: "open", carbon: 160 },
  { _id: uuidv4(), title: "Model Distillation - Chatbot Lite", company: "ConvoTech", region: "north", status: "open", carbon: 130 },
  { _id: uuidv4(), title: "Large-Scale Pretraining - Language Model", company: "LangCore", region: "south", status: "in-progress", carbon: 190 },
  { _id: uuidv4(), title: "AI Model Retraining - Fraud Detection", company: "SecureAI", region: "east", status: "closed", carbon: 210 },
  { _id: uuidv4(), title: "Edge AI Optimization - IoT Devices", company: "EdgeMind", region: "west", status: "open", carbon: 155 },
  { _id: uuidv4(), title: "Multi-Agent Simulation - Energy Forecasting", company: "GridSense", region: "north", status: "in-progress", carbon: 170 },
];

// Grid Data (past few hours example)
export let grid = [
  { timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), carbon: 240, renewable: 38 },
  { timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), carbon: 210, renewable: 40 },
  { timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), carbon: 190, renewable: 42 },
  { timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), carbon: 170, renewable: 44 },
  { timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), carbon: 200, renewable: 41 },
  { timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), carbon: 230, renewable: 39 },
  { timestamp: new Date().toISOString(), carbon: 250, renewable: 40 },
];


// Seed initializer
export function initDemo() {
  console.log("Demo data initialized with users, companies, jobs, and grid data");
}
