// src/redux/blog/blogApi.js
const blogApi = {
  getPublished: {
    url: '/api/article/published',
    method: 'GET',
  },
  getDrafts: {
    url: '/api/article/drafts',
    method: 'GET',
  },
  create: {
    url: '/api/article',
    method: 'POST',
  },
  update: (id) => ({
    url: `/api/article/${id}`,
    method: 'PUT',
  }),
  publish: (id) => ({
    url: `/api/article/${id}/publish`,
    method: 'PUT',
  }),
  delete: (id) => ({
    url: `/api/article/${id}`,
    method: 'DELETE',
  }),
};

export default blogApi;
