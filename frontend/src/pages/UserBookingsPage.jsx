import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { bookingApi } from '../api/services';
import LoadingSpinner from '../components/LoadingSpinner';

const UserBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const { data } = await bookingApi.listUser();
      setBookings(data);
    } catch (error) {
      toast.error('Unable to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleCancel = async (id) => {
    try {
      await bookingApi.cancel(id);
      toast.success('Booking cancelled');
      loadBookings();
    } catch (error) {
      toast.error('Unable to cancel booking');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-semibold">My Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-gray-600">You have no bookings yet.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking._id} className="bg-white rounded-lg shadow p-4 flex flex-wrap gap-4 items-center">
            <img
              src={booking.itemId?.images?.[0]}
              alt={booking.itemId?.title}
              className="w-32 h-32 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{booking.itemId?.title}</h3>
              <p className="text-sm text-gray-500">
                {new Date(booking.startDate).toLocaleDateString()} →{' '}
                {new Date(booking.endDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">Status: {booking.status}</p>
            </div>
            {booking.status !== 'cancelled' && (
              <button onClick={() => handleCancel(booking._id)} className="px-4 py-2 bg-red-500 text-white rounded">
                Cancel
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default UserBookingsPage;


