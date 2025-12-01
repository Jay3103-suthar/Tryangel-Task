const Client = require('../models/Client');
exports.getClients = async (req, res) => {
  const clients = await Client.find();
  res.json(clients);
};
exports.addClient = async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name) return res.status(400).json({ message: 'Name required' });
  const client = await Client.create({ name, email, phone });
  res.json(client);
};