// pages/api/forms.js
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { getAuth } from '@clerk/nextjs/server';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { fields, webhookUrl } = req.body;
    const { userId } = getAuth(req);

    // Add server-side validation for fields, webhookUrl, and userId
    if (!fields || !Array.isArray(fields) || !webhookUrl || !userId) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    const formId = uuidv4();
    const formData = { fields, webhookUrl, userId };

    const filePath = path.join(process.cwd(), 'data', `${formId}.json`);

    try {
      fs.writeFileSync(filePath, JSON.stringify(formData));
      res.status(200).json({ formId });
    } catch (error) {
      console.error('Error writing file', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method no
