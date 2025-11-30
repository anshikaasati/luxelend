import { useEffect, useState } from 'react';
import ItemCard from '../components/ItemCard';
import { itemApi } from '../api/services';
import LoadingSpinner from '../components/LoadingSpinner';

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await itemApi.getAll({ limit: 6 });
        setItems(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="space-y-10">
      <section className="bg-white rounded-2xl shadow p-8 flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <p className="uppercase text-sm text-brand font-semibold mb-2">Rent or Buy Pre-Loved Fashion</p>
          <h1 className="text-4xl font-bold mb-4">Look stunning without the hefty price tag</h1>
          <p className="text-gray-600 mb-6">
            Browse curated clothes and jewellery for your next event. Check availability in seconds,
            then rent or buy in a couple of clicks.
          </p>
          <div className="flex gap-3">
            <a href="/items" className="bg-brand text-white px-5 py-3 rounded-md text-sm font-semibold">
              Explore Items
            </a>
            <a href="/add-item" className="border border-brand text-brand px-5 py-3 rounded-md text-sm font-semibold">
              List an Item
            </a>
          </div>
        </div>
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
            alt="Fashion"
            className="rounded-xl object-cover w-full h-72"
          />
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Latest Listings</h2>
          <a href="/items" className="text-brand text-sm font-semibold">
            View all
          </a>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;


