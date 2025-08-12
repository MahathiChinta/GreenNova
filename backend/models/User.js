// Simple user model/storage for DEMO_MODE (in-memory)
const users = []; // exported storage array used by services

module.exports = {
  users, // array of { id, email, passwordHash, role, name, approved? }
};
