// controllers/companyController.js 
import { companies } from "../utils/seed.js"; // if you later plug DB
// For now, we'll use a small in-memory array if needed
export const listCompanies = async (req, res) => {
  // In demo we can return stub
  res.json({ success: true, companies: [] });
};

export const approveCompany = async (req, res) => {
  // demo: no-op, return 200
  res.json({ success: true, id: req.params.id, approved: true });
};
