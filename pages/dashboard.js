// pages/dashboard.js
import { useEffect, useState } from 'react';
import fs from 'fs';
import path from 'path';
import { useUser } from '@clerk/nextjs';

export default function Dashboard() {
  const [forms, setForms] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    async function fetchForms() {
      const response = await fetch('/api/forms');
      const data = await response.json();
      setForms(data);
    }
    fetchForms();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Form ID</th>
            <th className="px-4 py-2">Fields</th>
            <th className="px-4 py-2">Webhook URL</th>
            <th className="px-4 py-2">Embed Script</th>
          </tr>
        </thead>
        <tbody>
          {forms.map((form) => (
            <tr key={form.formId}>
              <td className="border px-4 py-2">{form.formId}</td>
              <td className="border px-4 py-2">
                {form.fields.map((field, index) => (
                  <div key={index}>{field.name} ({field.type})</div>
                ))}
              </td>
              <td className="border px-4 py-2">{form.webhookUrl}</td>
              <td className="border px-4 py-2">
                <textarea readOnly value={`<script src="${window.location.origin}/api/form/${form.formId}/embed.js"></script>`} className="w-full"/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export async function getServerSideProps() {
  const dataDirectory = path.join(process.cwd(), 'data');
  const files = fs.readdirSync(dataDirectory);
  const forms = files.map(file => {
    const filePath = path.join(dataDirectory, file);
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  });

  return {
    props: {
      forms,
    },
  };
}
