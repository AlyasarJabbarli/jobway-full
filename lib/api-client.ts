import { JobFormData, CompanyFormData, BannerFormData, ModeratorFormData } from './form-types';

const API_BASE_URL = '/api';

export const apiClient = {
  // Jobs
  async getJobs() {
    const response = await fetch(`${API_BASE_URL}/jobs`);
    if (!response.ok) throw new Error('Failed to fetch jobs');
    return response.json();
  },

  async getJob(id: string) {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`);
    if (!response.ok) throw new Error('Failed to fetch job');
    return response.json();
  },

  async createJob(data: JobFormData) {
    const response = await fetch(`${API_BASE_URL}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create job');
    return response.json();
  },

  async updateJob(id: string, data: JobFormData) {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update job');
    return response.json();
  },

  // Companies
  async getCompanies() {
    const response = await fetch(`${API_BASE_URL}/companies`);
    if (!response.ok) throw new Error('Failed to fetch companies');
    return response.json();
  },

  async getCompany(id: string) {
    const response = await fetch(`${API_BASE_URL}/companies/${id}`);
    if (!response.ok) throw new Error('Failed to fetch company');
    return response.json();
  },

  async createCompany(data: CompanyFormData) {
    const response = await fetch(`${API_BASE_URL}/companies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create company');
    return response.json();
  },

  async updateCompany(id: string, data: CompanyFormData) {
    const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update company');
    return response.json();
  },

  // Banners
  async getBanners() {
    const response = await fetch(`${API_BASE_URL}/banners`);
    if (!response.ok) throw new Error('Failed to fetch banners');
    return response.json();
  },

  async getBanner(id: string) {
    const response = await fetch(`${API_BASE_URL}/banners/${id}`);
    if (!response.ok) throw new Error('Failed to fetch banner');
    return response.json();
  },

  async updateBanner(id: string, data: BannerFormData) {
    const response = await fetch(`${API_BASE_URL}/banners/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update banner');
    return response.json();
  },

  // Moderators
  async getModerators() {
    const response = await fetch(`${API_BASE_URL}/moderators`);
    if (!response.ok) throw new Error('Failed to fetch moderators');
    return response.json();
  },

  async getModerator(id: string) {
    const response = await fetch(`${API_BASE_URL}/moderators/${id}`);
    if (!response.ok) throw new Error('Failed to fetch moderator');
    return response.json();
  },

  async updateModerator(id: string, data: ModeratorFormData) {
    const response = await fetch(`${API_BASE_URL}/moderators/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update moderator');
    return response.json();
  },

  async createModerator(data: ModeratorFormData) {
    const response = await fetch(`${API_BASE_URL}/moderators`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create moderator');
    return response.json();
  },
}; 