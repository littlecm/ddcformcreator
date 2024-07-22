// pages/api/forms/index.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const dataDirectory = path.join(process.cwd(), 'data');
    const files = fs.readdirSync(dataDirectory);
    const forms = files.map(file => {
      const filePath = path.join(dataDirectory, file);
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content);
    });

    res.status(200).json(forms);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
