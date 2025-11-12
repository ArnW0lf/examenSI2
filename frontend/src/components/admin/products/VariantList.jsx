import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Trash2 } from "lucide-react";

export default function VariantList({ productId }) {
  const [variants, setVariants] = useState([]);
  const [form, setForm] = useState({ size: "", color: "", price_adjustment: "", sku: "" });

  const loadVariants = async () => {
    const res = await axios.get(`http://localhost:8000/api/variants/?product=${productId}`);
    setVariants(res.data);
  };

  useEffect(() => {
    loadVariants();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/api/variants/", { ...form, product: productId });
    setForm({ size: "", color: "", price_adjustment: "", sku: "" });
    loadVariants();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/variants/${id}/`);
    loadVariants();
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-3">Variantes</h3>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input placeholder="Talla" value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} className="p-2 rounded bg-gray-700" />
        <input placeholder="Color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className="p-2 rounded bg-gray-700" />
        <input placeholder="Precio +" type="number" value={form.price_adjustment} onChange={(e) => setForm({ ...form, price_adjustment: e.target.value })} className="p-2 rounded bg-gray-700" />
        <input placeholder="SKU" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} className="p-2 rounded bg-gray-700" />
        <button className="bg-green-600 hover:bg-green-700 text-white px-3 rounded flex items-center gap-1">
          <Plus size={16} /> Agregar
        </button>
      </form>

      <ul className="bg-gray-800 rounded-md divide-y divide-gray-700">
        {variants.map((v) => (
          <li key={v.id} className="flex justify-between items-center p-2">
            <span>{v.size} - {v.color} - ${v.price_adjustment}</span>
            <button onClick={() => handleDelete(v.id)} className="text-red-500 hover:text-red-700">
              <Trash2 size={18} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
