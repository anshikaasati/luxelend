import { Link } from 'react-router-dom';

const ItemCard = ({ item }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col">
      <img
        src={item.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image'}
        alt={item.title}
        className="h-48 w-full object-cover rounded-t-lg"
      />
      <div className="p-4 flex-1 flex flex-col">
        <span className="text-xs uppercase text-brand font-semibold">{item.category}</span>
        <h3 className="text-lg font-semibold mt-1">{item.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 flex-1">{item.description}</p>
        <div className="mt-3 space-y-1 text-sm text-gray-700">
          <p>Rent: ₹{item.rentPricePerDay}/day</p>
          {item.salePrice && <p>Buy: ₹{item.salePrice}</p>}
        </div>
        <Link
          to={`/items/${item._id}`}
          className="mt-4 inline-block text-center bg-brand text-white py-2 rounded-md"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;


