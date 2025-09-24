// Flooring Bulk Import API Service
interface ImportSessionResponse {
  sessionId: string;
  message: string;
  totalRecords: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

interface ImportProgressResponse {
  sessionId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  processedRecords: number;
  totalRecords: number;
  errors?: string[];
  message?: string;
}

interface ImportHistoryItem {
  id: string;
  userId: string;
  fileName: string;
  totalRecords: number;
  processedRecords: number;
  failedRecords: number;
  status: string;
  createdAt: string;
  completedAt?: string;
}

export class FlooringBulkImportAPI {
  private baseUrl: string;
  private authToken: string | null;

  constructor(baseUrl: string = 'https://fireapi.dev/api/flooring/import') {
    this.baseUrl = baseUrl;
    this.authToken = localStorage.getItem('flooring_api_token');
  }

  setAuthToken(token: string) {
    this.authToken = token;
    localStorage.setItem('flooring_api_token', token);
  }

  getAuthToken(): string | null {
    return this.authToken;
  }

  clearAuthToken() {
    this.authToken = null;
    localStorage.removeItem('flooring_api_token');
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Accept': 'application/json',
    };
    
    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }
    
    return headers;
  }

  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      const data = await response.json();
      return data.status === 'healthy';
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }

  async downloadTemplate(): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/template`);
      const blob = await response.blob();
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'flooring_products_template.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download template:', error);
      throw new Error('Failed to download CSV template');
    }
  }

  async uploadCSV(file: File): Promise<ImportSessionResponse> {
    if (!this.authToken) {
      throw new Error('Authentication required. Please set your API token.');
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${this.baseUrl}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.authToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Upload failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('CSV upload failed:', error);
      throw error;
    }
  }

  async getImportProgress(sessionId: string): Promise<ImportProgressResponse> {
    if (!this.authToken) {
      throw new Error('Authentication required');
    }

    try {
      const response = await fetch(`${this.baseUrl}/status/${sessionId}`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to get progress: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to get import progress:', error);
      throw error;
    }
  }

  async getImportHistory(): Promise<ImportHistoryItem[]> {
    if (!this.authToken) {
      throw new Error('Authentication required');
    }

    try {
      const response = await fetch(`${this.baseUrl}/history`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to get history: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to get import history:', error);
      throw error;
    }
  }

  async deleteSession(sessionId: string): Promise<void> {
    if (!this.authToken) {
      throw new Error('Authentication required');
    }

    try {
      const response = await fetch(`${this.baseUrl}/session/${sessionId}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete session: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Failed to delete session:', error);
      throw error;
    }
  }

  // Helper method to poll for import progress
  async pollImportProgress(
    sessionId: string,
    onProgress: (progress: ImportProgressResponse) => void,
    interval: number = 2000
  ): Promise<ImportProgressResponse> {
    return new Promise((resolve, reject) => {
      const pollInterval = setInterval(async () => {
        try {
          const progress = await this.getImportProgress(sessionId);
          onProgress(progress);

          if (progress.status === 'completed' || progress.status === 'failed') {
            clearInterval(pollInterval);
            if (progress.status === 'completed') {
              resolve(progress);
            } else {
              reject(new Error(progress.message || 'Import failed'));
            }
          }
        } catch (error) {
          clearInterval(pollInterval);
          reject(error);
        }
      }, interval);
    });
  }
}

export const flooringAPI = new FlooringBulkImportAPI();