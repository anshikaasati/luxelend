import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Crown, Shirt, Gem, LampDesk, Filter, Watch, ShoppingBag, Footprints } from 'lucide-react';
import ItemCard from '../components/ItemCard';
import { itemApi } from '../api/services';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const params = {};
        if (searchCategory) params.category = searchCategory;
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
  }, [searchCategory]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchLocation) params.append('location', searchLocation);
    if (searchCategory) params.append('category', searchCategory);
    navigate(`/items?${params.toString()}`);
  };

  const handleCategoryFilter = (category) => {
    setSearchCategory(category === 'all' ? '' : category);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Central Search Bar */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-8 hero-section">
        <div className="hero-content text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-4 tracking-tighter">
            Unveil Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-berry to-secondary-gold">Wedding Story</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto font-medium">
            Rent the most exquisite designer bridal wear and luxury jewelry, styled perfectly for your unforgettable celebration.
          </p>

          {/* Central Search Bar */}
          <div className="bg-white p-4 rounded-full flex flex-col md:flex-row items-stretch md:items-center justify-between shadow-2xl ring-4 ring-yellow-200/50 transform translate-y-8">
            {/* Location Input */}
            <div className="flex-1 px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200">
              <label htmlFor="location" className="block text-xs font-semibold text-gray-500 mb-0.5 text-left">
                Location
              </label>
              <input
                id="location"
                type="text"
                placeholder="City or Venue"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full text-base font-medium text-gray-800 placeholder-gray-400 focus:outline-none"
              />
            </div>

            {/* Event Type Input */}
            <div className="flex-1 px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200">
              <label htmlFor="event-type" className="block text-xs font-semibold text-gray-500 mb-0.5 text-left">
                Category
              </label>
              <select
                id="event-type"
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="w-full text-base font-medium text-gray-800 focus:outline-none bg-transparent"
              >
                <option value="">All Categories</option>
                <option value="clothes">Clothes</option>
                <option value="jewellery">Jewellery</option>
                <option value="accessories">Accessories</option>
                <option value="watch">Watch</option>
                <option value="shoes">Shoes</option>
              </select>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="w-full md:w-auto px-7 py-3.5 btn-gradient-vows text-white font-semibold rounded-full flex items-center justify-center space-x-2 mt-2 md:mt-0 shadow-lg"
            >
              <Sparkles className="w-5 h-5" />
              <span className="text-base">Find Attire</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-16">
        {/* Filters & Categories */}
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-10">
          <span className="text-base font-bold text-primary-berry hidden sm:block mr-2">Collections:</span>
          <button
            onClick={() => handleCategoryFilter('clothes')}
            className={`text-sm px-4 py-2 rounded-full font-medium hover:bg-red-200 transition shadow-md flex items-center border ${
              searchCategory === 'clothes' ? 'bg-red-200 text-red-700 border-red-300' : 'bg-red-100 text-red-700 border-red-300'
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
              searchCategory === 'jewellery' ? 'bg-yellow-200 text-secondary-gold border-yellow-300' : 'bg-yellow-100 text-secondary-gold border-yellow-300'
            }`}
          >
            <Gem className="w-4 h-4 mr-2 fill-yellow-500" />
            Heavy Jewelry
          </button>
          <button
            onClick={() => handleCategoryFilter('accessories')}
            className={`text-sm px-4 py-2 rounded-full font-medium hover:bg-purple-200 transition shadow-md hidden lg:flex items-center border ${
              searchCategory === 'accessories' ? 'bg-purple-200 text-purple-700 border-purple-300' : 'bg-purple-100 text-purple-700 border-purple-300'
            }`}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Accessories
          </button>
          <button
            onClick={() => handleCategoryFilter('watch')}
            className={`text-sm px-4 py-2 rounded-full font-medium hover:bg-blue-200 transition shadow-md hidden lg:flex items-center border ${
              searchCategory === 'watch' ? 'bg-blue-200 text-blue-700 border-blue-300' : 'bg-blue-100 text-blue-700 border-blue-300'
            }`}
          >
            <Watch className="w-4 h-4 mr-2" />
            Watches
          </button>
          <button
            onClick={() => handleCategoryFilter('shoes')}
            className={`text-sm px-4 py-2 rounded-full font-medium hover:bg-orange-200 transition shadow-md hidden lg:flex items-center border ${
              searchCategory === 'shoes' ? 'bg-orange-200 text-orange-700 border-orange-300' : 'bg-orange-100 text-orange-700 border-orange-300'
            }`}
          >
            <Footprints className="w-4 h-4 mr-2" />
            Shoes
          </button>
          <button
            onClick={() => handleCategoryFilter('all')}
            className="text-sm px-4 py-2 rounded-full bg-white border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition flex items-center shadow-sm"
          >
            <Filter className="w-4 h-4 mr-1" />
            All Categories
          </button>
        </div>

        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 mt-4 tracking-tight">Trending Designer Looks</h2>

        {/* Product Listing Grid */}
        {loading ? (
          <LoadingSpinner />
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found. Be the first to list an item!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {items.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
