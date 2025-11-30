import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Crown, Shirt, Gem, Filter, Watch, ShoppingBag, Footprints } from 'lucide-react';
import ItemCard from '../components/ItemCard';
import { itemApi } from '../api/services';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const params = {};
        if (category) params.category = category;
        const { data } = await itemApi.getAll(params);
        setItems(data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load items');
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [category]);

  const handleCategoryFilter = (cat) => {
    setCategory(cat);
    if (cat) {
      setSearchParams({ category: cat });
    } else {
      setSearchParams({});
    }
  };

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8 tracking-tight">All Designer Looks</h2>

      {/* Filters & Categories */}
      <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-10">
        <span className="text-base font-bold text-primary-berry hidden sm:block mr-2">Collections:</span>
        <button
          onClick={() => handleCategoryFilter('clothes')}
          className={`text-sm px-4 py-2 rounded-full font-medium hover:bg-red-200 transition shadow-md flex items-center border ${
            category === 'clothes' ? 'bg-red-200 text-red-700 border-red-300' : 'bg-red-100 text-red-700 border-red-300'
          }`}
        >
          <Crown className="w-4 h-4 mr-2 fill-red-500" />
          Bridal Lehengas
        </button>
        <button
          onClick={() => handleCategoryFilter('clothes')}
          className="text-sm px-4 py-2 rounded-full bg-teal-100 text-teal-700 font-medium hover:bg-teal-200 transition shadow-md flex items-center border border-teal-300"
        >
          <Shirt className="w-4 h-4 mr-2" />
          Groom Sherwanis
        </button>
          <button
            onClick={() => handleCategoryFilter('jewellery')}
            className={`text-sm px-4 py-2 rounded-full font-medium hover:bg-yellow-200 transition shadow-md hidden sm:flex items-center border ${
              category === 'jewellery' ? 'bg-yellow-200 text-secondary-gold border-yellow-300' : 'bg-yellow-100 text-secondary-gold border-yellow-300'
            }`}
          >
            <Gem className="w-4 h-4 mr-2 fill-yellow-500" />
            Heavy Jewelry
          </button>
          <button
            onClick={() => handleCategoryFilter('accessories')}
            className={`text-sm px-4 py-2 rounded-full font-medium hover:bg-purple-200 transition shadow-md hidden lg:flex items-center border ${
              category === 'accessories' ? 'bg-purple-200 text-purple-700 border-purple-300' : 'bg-purple-100 text-purple-700 border-purple-300'
            }`}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Accessories
          </button>
          <button
            onClick={() => handleCategoryFilter('watch')}
            className={`text-sm px-4 py-2 rounded-full font-medium hover:bg-blue-200 transition shadow-md hidden lg:flex items-center border ${
              category === 'watch' ? 'bg-blue-200 text-blue-700 border-blue-300' : 'bg-blue-100 text-blue-700 border-blue-300'
            }`}
          >
            <Watch className="w-4 h-4 mr-2" />
            Watches
          </button>
          <button
            onClick={() => handleCategoryFilter('shoes')}
            className={`text-sm px-4 py-2 rounded-full font-medium hover:bg-orange-200 transition shadow-md hidden lg:flex items-center border ${
              category === 'shoes' ? 'bg-orange-200 text-orange-700 border-orange-300' : 'bg-orange-100 text-orange-700 border-orange-300'
            }`}
          >
            <Footprints className="w-4 h-4 mr-2" />
            Shoes
          </button>
          <button
            onClick={() => handleCategoryFilter('')}
            className="text-sm px-4 py-2 rounded-full bg-white border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition flex items-center shadow-sm"
          >
            <Filter className="w-4 h-4 mr-1" />
            All Categories
          </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No items found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {items.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </main>
  );
};

export default ItemsPage;
