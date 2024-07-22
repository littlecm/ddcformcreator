// pages/create-form.js
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';

export default function CreateForm() {
  const { register, handleSubmit } = useForm();
  const [fields, setFields] = useState([{ name: '', type: 'text' }]);
  const [formId, setFormId] = useState(null);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [script, setScript] = useState('');
  const { user } = useUser();

  const addField = () => {
    setFields([...fields, { name: '', type: 'text' }]);
  };

  const onSubmit = async (data) => {
    const response = await axios.post('/api/forms', {
      fields: data.fields,
      webhookUrl: data.webhookUrl,
      userId: user.id, // Pass user ID
    });
    setFormId(response.data.formId);
    setScript(`<script src="${window.location.origin}/api/form/${response.data.formId}/embed.js"></script>`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {fields.map((field, index) => (
          <div key={index} className="flex space-x-2">
            <input
              {...register(`fields[${index}].name`)}
              placeholder="Field Name"
              className="border rounded p-2 flex-1"
              required
            />
            <select {...register(`fields[${index}].type`)} className="border rounded p-2">
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="number">Number</option>
            </select>
          </div>
        ))}
        <button type="button" onClick={addField} className="bg-blue-500 text-white p-2 rounded">Add Field</button>
        <input
          {...register('webhookUrl')}
          placeholder="Webhook URL"
          value={webhookUrl}
          onChange={(e) => setWebhookUrl(e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">Create Form</button>
      </form>
      {script && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Embed Code</h2>
          <textarea readOnly value={script} className="w-full border rounded p-2" />
        </div>
      )}
    </div>
  );
}
