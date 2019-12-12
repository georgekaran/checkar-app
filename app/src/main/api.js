import axios from "axios";
import consts from '../consts'
import { getToken } from '../auth/authReducer'
import qs from 'qs'

const api = axios.create({
  baseURL: consts.API_URL,
  responseType: "json"
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

api.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (401 === error.response.status) {
    window.location = '/login';
  } else {
    return Promise.reject(error);
  }
});

export const users = {

  list: () => api.get('user'),

  get: (id) => api.get('user' + (id ? `/${id}` : '')),

  updatePassword: (id, data) => api.put(`user/password/${id}`, data),

  updateActive: (id) => api.put(`user/active/${id}`),

  delete: (id) => api.delete(`user/${id}`),

  save: (id, data) => {
    return api({
      method: id ? 'PUT' : 'POST',
      url: id ? `user/${id}` : 'user',
      data
    })
  }

}

export const profile = {

  get: (id) => api.get('api/profile' + (id ? `/${id}` : '')),

  list: () => api.get('api/profile'),

  update: (data) => api.put(`api/profile`, data),

  updatePassword: (data) => api.put(`api/profile/password`, data),

};

export const auth = {

  login: (data) => api.post(`/auth/login`, qs.stringify(data)),
  
  signIn: (data) => api.post(`/api/signIn`, qs.stringify(data)),

  validateToken: (data) => api.post(`/login`, qs.stringify(data))

}

export const company = {

  list: () => api.get('/company'),

  get: (id) => api.get('/company' + (id ? `/${id}` : '')),

  delete: (id) => api.delete(`/company/${id}`),

  save: (id, data) => {
    return api({
      method: id ? 'PUT' : 'POST',
      url: id ? `company/${id}` : 'company',
      data
    })
  }

}

export const typeVehicle = {

  list: () => api.get('/vehicle/type'),

  get: (id) => api.get('/vehicle/type' + (id ? `/${id}` : '')),

  delete: (id) => api.delete(`/vehicle/type/${id}`),

  save: (id, data) => {
    return api({
      method: id ? 'PUT' : 'POST',
      url: id ? `vehicle/type/${id}` : 'vehicle/type',
      data
    })
  }

}

export const typeItem = {

  list: () => api.get('/item/type'),

  get: (id) => api.get('/item/type' + (id ? `/${id}` : '')),

  delete: (id) => api.delete(`/item/type/${id}`),

  save: (id, data) => {
    return api({
      method: id ? 'PUT' : 'POST',
      url: id ? `item/type/${id}` : 'item/type',
      data
    })
  }

}

export const item = {

  list: () => api.get('/item'),

  get: (id) => api.get('/item' + (id ? `/${id}` : '')),

  delete: (id) => api.delete(`/item/${id}`),

  save: (id, data) => {
    return api({
      method: id ? 'PUT' : 'POST',
      url: id ? `item/${id}` : 'item',
      data
    })
  }

}

export const vehicle = {

  list: () => api.get('/vehicle'),

  get: (id) => api.get('/vehicle' + (id ? `/${id}` : '')),

  delete: (id) => api.delete(`/vehicle/${id}`),

  save: (id, data) => {
    return api({
      method: id ? 'PUT' : 'POST',
      url: id ? `vehicle/${id}` : 'vehicle',
      data
    })
  }

}

export const typeUser = {

  list: () => api.get('/user/type'),

  get: (id) => api.get('/user/type' + (id ? `/${id}` : '')),

  delete: (id) => api.delete(`/user/type/${id}`),

  save: (id, data) => {
    return api({
      method: id ? 'PUT' : 'POST',
      url: id ? `user/type/${id}` : 'user/type',
      data
    })
  }

}

export const clients = {

  get: (id) => api.get('api/clients' + (id ? `/${id}` : '')),

  list: () => api.get('api/clients'),

  delete: (id) => api.delete(`api/clients/${id}`),

  save: (id, data) => {
    return api({
      method: id ? 'PUT' : 'POST',
      url: id ? `api/clients/${id}` : 'api/clients',
      data
    })
  }

};

export const projects = {

  list: () => api.get('api/projects'),

  countNotDelayed: () => api.get('api/projects/notDelayed'),

  countDelayed: () => api.get('api/projects/delayed'),
  
  updateUsers: (id, data) => api.put(`api/projects/${id}/updateUsers`, data),

  get: (id) => api.get(`api/projects/${id}`),
  
  getCounters: (id) => api.get(`api/projects/${id}/counters`),
  
  sendWellcomeEmail: (id) => api.post(`api/projects/${id}/sendWellcomeEmail`),

  save: (id, data) => {
    return api({
      method: id ? 'PUT' : 'POST',
      url: id ? `api/projects/${id}` : 'api/projects',
      data
    })
  }

};

export const tasks = {

  list: (projectId) => api.get(`api/tasks?project_id=${projectId}`),

  listFinished: () => api.get(`api/tasks/finished`),

  get: (id) => api.get(`api/tasks/${id}`),

  save: (id, data) => {
    return api({
      method: id ? 'PUT' : 'POST',
      url: id ? `api/tasks/${id}` : 'api/tasks',
      data
    })
  },

  delete: (id) => api.delete(`api/tasks/${id}`),

};


export const stakeholders = {

  list: (projectId) => api.get(`api/project-users?project_id=${projectId}`),

  save: (id, data) => {
    return api({
      method: id ? 'PUT' : 'POST',
      url: `api/project-users` + (id ? `/${id}` : ''),
      data
    })
  },

  delete: (id) => api.delete(`api/project-users/${id}`),

};


export default api