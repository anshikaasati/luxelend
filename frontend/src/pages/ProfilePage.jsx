import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authApi, itemApi, paymentApi } from '../api/services';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Shield } from 'lucide-react';

const ProfilePage = () => {
  const { user, setUser, token, logout } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', avatarUrl: '', upiId: '' });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const loadProfile = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const { data: me } = await authApi.me();
      const ownerId = me.id || me._id;
      const { data: ownerItems } = await itemApi.getAll({ ownerId });
      setForm({
        name: me.name || '',
        email: me.email || '',
        phone: me.phone || '',
        avatarUrl: me.avatarUrl || '',
        upiId: me.upiId || ''
      });
      setItems(ownerItems);
      setUser(me);
    } catch (error) {
      toast.error('Unable to load profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await authApi.update({
        name: form.name,
        phone: form.phone,
        avatarUrl: form.avatarUrl
      });

      // Update UPI ID if changed
      if (form.upiId && form.upiId !== user.upiId) {
        const response = await paymentApi.onboardLender({ upiId: form.upiId });

        if (response.data.subscription) {
          const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            subscription_id: response.data.subscription.id,
            name: "Vastra Vows",
            description: "Monthly Lender Subscription (₹100/month)",
            image: "https://i.imgur.com/3g7nmJC.png",
            handler: async function (razorpayResponse) {
              try {
                await paymentApi.verifySubscription({
                  ...razorpayResponse,
                  userId: user.id || user._id
                });
                toast.success('Subscription activated!');
                data.upiId = form.upiId;
                data.subscriptionStatus = 'active';
                setUser(data);
              } catch (err) {
                toast.error('Subscription verification failed');
                console.error(err);
              }
            },
            prefill: {
              name: data.name,
              email: data.email,
              contact: data.phone
            },
            theme: {
              color: "#D4AF37",
              backdrop_color: "rgba(212, 175, 55, 0.1)"
            },
            modal: {
              backdropclose: false,
              escape: false,
              handleback: true,
              confirm_close: true,
              ondismiss: function () {
                toast.error('Subscription cancelled');
                setSaving(false);
              }
            }
          };

          if (!window.Razorpay) {
            toast.error('Payment SDK failed to load. Please refresh.');
            setSaving(false);
            return;
          }

          const rzp = new window.Razorpay(options);
          rzp.open();
        } else {
          data.upiId = form.upiId;
          toast.success('UPI ID added successfully!');
        }
      }

      setUser(data);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Unable to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleLender = async (enable) => {
    try {
      const { data } = await authApi.toggleLenderRole(enable);
      setUser(data.user);
      toast.success(data.message);
    } catch (error) {
      toast.error('Failed to toggle lender mode');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await authApi.deleteAccount();
      toast.success('Account deleted successfully');
      logout();
      navigate('/');
    } catch (error) {
      toast.error('Failed to delete account');
    }
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Delete this attire?')) return;
    try {
      await itemApi.remove(id);
      toast.success('Attire deleted');
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      toast.error('Unable to delete attire');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-8 md:space-y-10">
      <section className="glass-panel rounded-3xl p-4 md:p-8 animate-fade-in">
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6 text-gray-900">My Profile</h2>

        {/* Role Toggle */}
        <div className="mb-6 p-4 bg-gradient-to-r from-primary-berry/10 to-primary-plum/10 rounded-xl border border-primary-berry/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary-berry" />
                Lender Mode
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {user?.isLenderEnabled ? 'You can list items for rent' : 'Enable to list your items'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={user?.isLenderEnabled || false}
                onChange={(e) => handleToggleLender(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-berry/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary-berry"></div>
            </label>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="grid gap-4 md:gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl glass-input focus:ring-2 focus:ring-primary-berry/20"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input value={form.email} disabled className="w-full px-4 py-3 rounded-xl bg-gray-100/50 border border-gray-200 text-gray-500 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl glass-input focus:ring-2 focus:ring-primary-berry/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
            <input
              value={form.avatarUrl}
              onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}
              className="w-full px-4 py-3 rounded-xl glass-input focus:ring-2 focus:ring-primary-berry/20"
            />
          </div>

          {user?.isLenderEnabled && (
            <div className="md:col-span-2 border-t border-gray-200/50 pt-6 mt-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payout Settings</h3>
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 mb-4">
                <p className="text-sm text-blue-800">
                  Enter your UPI ID to receive payments directly from renters.
                </p>
              </div>
              <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID (VPA)</label>
              <input
                value={form.upiId || ''}
                onChange={(e) => setForm({ ...form, upiId: e.target.value })}
                placeholder="username@bank"
                className="w-full px-4 py-3 rounded-xl glass-input focus:ring-2 focus:ring-primary-berry/20"
              />
            </div>
          )}

          <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 mt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-xl shadow-lg hover:bg-gray-800 transition disabled:opacity-50 text-center"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            {user?.isLenderEnabled && (
              <Link to="/add-item" className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-white transition text-center">
                List New Attire
              </Link>
            )}
          </div>
        </form>

        {/* Danger Zone */}
        <div className="mt-8 pt-6 border-t border-red-200">
          <h3 className="text-lg font-semibold text-red-600 mb-4 flex items-center gap-2">
            <Trash2 className="w-5 h-5" />
            Danger Zone
          </h3>
          <div className="bg-red-50/50 p-4 rounded-xl border border-red-200">
            <p className="text-sm text-red-800 mb-3">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
            >
              Delete Account
            </button>
          </div>
        </div>
      </section>

      {user?.isLenderEnabled && (
        <section className="glass-panel rounded-3xl p-4 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-900">My Attires</h2>
            <span className="px-3 py-1 bg-white/50 rounded-full text-xs md:text-sm font-medium text-gray-600 border border-gray-200">
              {items.length} Listed
            </span>
          </div>
          {items.length === 0 ? (
            <div className="text-center py-12 bg-white/30 rounded-2xl border border-dashed border-gray-300">
              <p className="text-gray-500 mb-4">You haven&apos;t listed any attire yet.</p>
              <Link to="/add-item" className="text-primary-berry font-semibold hover:underline">
                Start listing now
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 md:gap-6">
              {items.map((item) => (
                <div key={item._id} className="glass-card rounded-2xl p-4 flex flex-col sm:flex-row gap-4 md:gap-6 group">
                  <div className="w-full sm:w-40 md:w-48 aspect-[4/3] rounded-xl overflow-hidden">
                    <img
                      src={item.images?.[0] || 'https://via.placeholder.com/120x120?text=No+Image'}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="flex-1 py-1 md:py-2 flex flex-col">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-xs md:text-sm text-gray-500 uppercase tracking-wider font-medium mb-2 md:mb-4">
                          {item.gender} • {item.subcategory?.replace(/-/g, ' ')}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          to={`/items/${item._id}`}
                          className="p-2 text-gray-400 hover:text-primary-berry transition"
                          title="View"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        </Link>
                        <button
                          onClick={() => handleDeleteItem(item._id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition"
                          title="Delete"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 mt-auto pt-4 md:pt-0">
                      <div>
                        <span className="text-xs text-gray-500 block">Rent Price</span>
                        <span className="font-bold text-gray-900">₹{item.rentPricePerDay}<span className="text-xs font-normal text-gray-500">/day</span></span>
                      </div>
                      {item.salePrice && (
                        <div>
                          <span className="text-xs text-gray-500 block">Sale Price</span>
                          <span className="font-bold text-gray-900">₹{item.salePrice}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full animate-fade-in">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Delete Account?</h3>
            <p className="text-gray-600 mb-6">
              Are you absolutely sure? This action cannot be undone. All your data including listings and bookings will be permanently deleted.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Delete Forever
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
