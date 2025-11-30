import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { bookingApi } from '../api/services';

const BookingPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.item) {
    return <p>Please select an item from the listings page.</p>;
  }

  const { item, startDate, endDate } = state;
  const formattedStart = format(new Date(startDate), 'PP');
  const formattedEnd = format(new Date(endDate), 'PP');

  const handleBook = async () => {
    try {
      await bookingApi.create({ itemId: item._id, startDate, endDate });
      toast.success('Booking created!');
      navigate('/bookings');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create booking');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Confirm Booking</h2>
      <div className="flex gap-4">
        <img src={item.images?.[0]} alt={item.title} className="w-32 h-32 rounded object-cover" />
        <div>
          <h3 className="text-xl font-semibold">{item.title}</h3>
          <p className="text-gray-600 capitalize">{item.category}</p>
          <p className="text-sm text-gray-500">Owner: {item.ownerId?.name}</p>
        </div>
      </div>
      <div className="border rounded p-4 space-y-2 text-sm">
          <p>
            <span className="font-semibold">Start:</span> {formattedStart}
          </p>
          <p>
            <span className="font-semibold">End:</span> {formattedEnd}
          </p>
          <p>
            <span className="font-semibold">Rent per day:</span> ₹{item.rentPricePerDay}
          </p>
          {item.depositAmount ? (
            <p>
              <span className="font-semibold">Deposit:</span> ₹{item.depositAmount}
            </p>
          ) : null}
      </div>
      <button onClick={handleBook} className="w-full bg-brand text-white py-3 rounded-md font-semibold">
        Confirm Booking
      </button>
    </div>
  );
};

export default BookingPage;


