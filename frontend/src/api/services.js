import api from './http';

export const authApi = {
  register: (payload) => api.post('/auth/register', payload),
  login: (payload) => api.post('/auth/login', payload),
  me: () => api.get('/auth/me')
};

export const itemApi = {
  getAll: (params) => api.get('/items', { params }),
  getById: (id) => api.get(`/items/${id}`),
  create: (formData) => api.post('/items', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, formData) => api.put(`/items/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  remove: (id) => api.delete(`/items/${id}`)
};

export const bookingApi = {
  check: (payload) => api.post('/bookings/check', payload),
  create: (payload) => api.post('/bookings', payload),
  listUser: () => api.get('/bookings/user'),
  listOwner: () => api.get('/bookings/owner'),
  cancel: (id) => api.put(`/bookings/${id}/cancel`)
};

export const reviewApi = {
  listByItem: (itemId) => api.get(`/reviews/${itemId}`),
  create: (payload) => api.post('/reviews', payload)
};


