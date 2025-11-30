import { useState } from 'react';
import toast from 'react-hot-toast';
import { itemApi } from '../api/services';

const initialState = {
  title: '',
  description: '',
  category: 'clothes',
  rentPricePerDay: '',
  salePrice: '',
  depositAmount: '',
  city: '',
  pincode: ''
};

const AddItemPage = () => {
  const [form, setForm] = useState(initialState);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files.length) {
      toast.error('Please upload at least one image');
      return;
    }
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    formData.append('location[city]', form.city);
    formData.append('location[pincode]', form.pincode);
    files.forEach((file) => formData.append('images', file));

    setLoading(true);
    try {
      await itemApi.create(formData);
      toast.success('Item listed successfully');
      setForm(initialState);
      setFiles([]);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">List a New Item</h2>
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-semibold">Title</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="mt-1 w-full border rounded px-3 py-2"
          >
            <option value="clothes">Clothes</option>
            <option value="jewellery">Jewellery</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="text-sm font-semibold">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            rows={4}
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Rent price per day (₹)</label>
          <input
            type="number"
            value={form.rentPricePerDay}
            onChange={(e) => setForm({ ...form, rentPricePerDay: e.target.value })}
            required
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Sale price (₹)</label>
          <input
            type="number"
            value={form.salePrice}
            onChange={(e) => setForm({ ...form, salePrice: e.target.value })}
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Refundable deposit (₹)</label>
          <input
            type="number"
            value={form.depositAmount}
            onChange={(e) => setForm({ ...form, depositAmount: e.target.value })}
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">City</label>
          <input
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            required
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Pincode</label>
          <input
            value={form.pincode}
            onChange={(e) => setForm({ ...form, pincode: e.target.value })}
            required
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm font-semibold">Upload images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setFiles(Array.from(e.target.files))}
            className="mt-1 w-full"
          />
          <p className="text-xs text-gray-500 mt-1">{files.length} files selected</p>
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-brand text-white px-6 py-3 rounded-md disabled:opacity-50"
          >
            {loading ? 'Publishing...' : 'Publish Listing'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItemPage;


