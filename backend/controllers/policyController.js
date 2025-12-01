const Policy = require('../models/Policy');
exports.getPolicies = async (req, res) => {
  const policies = await Policy.find().populate('clientId').populate('categoryId');
  res.json(policies);
};

exports.addPolicy = async (req, res) => {
  try {
    const { clientId, categoryId, policyName, issueDate, expiryDate, amount } = req.body;
    if (!clientId || !categoryId || !policyName) return res.status(400).json({ message: 'Invalid input' });
    if (new Date(issueDate) > new Date(expiryDate)) return res.status(400).json({ message: 'Issue date must be <= expiry date' });
    if (Number(amount) <= 0) return res.status(400).json({ message: 'Amount must be > 0' });
    const attachmentUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
    const policy = await Policy.create({ clientId, categoryId, policyName, issueDate, expiryDate, amount, attachmentUrl });
    res.json(policy);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updatePolicy = async (req, res) => {
  try {
    const { id } = req.params;
    const body = { ...req.body };
    if (body.issueDate && body.expiryDate && new Date(body.issueDate) > new Date(body.expiryDate)) return res.status(400).json({ message: 'Issue date must be <= expiry date' });
    if (body.amount && Number(body.amount) <= 0) return res.status(400).json({ message: 'Amount must be > 0' });
    if (req.file) {
      body.attachmentUrl = `/uploads/${req.file.filename}`;
    }
    const policy = await Policy.findByIdAndUpdate(id, body, { new: true });
    res.json(policy);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deletePolicy = async (req, res) => {
  try {
    const { id } = req.params;
    await Policy.findByIdAndDelete(id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};