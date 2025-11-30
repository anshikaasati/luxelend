import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { itemApi } from '../api/services';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const OwnerItemsPage = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadItems = async () => {
    setLoading(true);
    try {
      const { data } = await itemApi.getAll({ ownerId: user?.id });
      setItems(data);
    } catch (error) {
      toast.error('Unable to load your listings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      loadItems();
    }
  }, [user?.id]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this listing?')) return;
    try {
      await itemApi.remove(id);
      toast.success('Listing deleted');
      loadItems();
    } catch (error) {
      toast.error('Unable to delete listing');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-semibold">My Listings</h2>
      {items.length === 0 ? (
        <p className="text-gray-600">You have not listed any items yet.</p>
      ) : (
        items.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow p-4 flex flex-wrap gap-4 items-center">
            <img src={item.images?.[0]} alt={item.title} className="w-32 h-32 object-cover rounded" />
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.category}</p>
              <p className="text-sm text-gray-500">Rent: ₹{item.rentPricePerDay}/day</p>
            </div>
            <button onClick={() => handleDelete(item._id)} className="px-4 py-2 bg-red-500 text-white rounded">
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default OwnerItemsPage;


