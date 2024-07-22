// pages/api/forms.js

import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { fields, webhookUrl } = req.body;
    const formId = uuidv4();
    const formData = { fields, webhookUrl };

    const filePath = path.join(process.cwd(), 'data', `${formId}.json`);
    fs.writeFileSync(filePath, JSON.stringify(formData));

    res.status(200).json({ formId });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
