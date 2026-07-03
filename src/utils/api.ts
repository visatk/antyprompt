export class ApiError extends Error {
  public status: number;
  public data: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

export async function apiFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  try {
    const response = await fetch(input, init);
    
    if (response.status === 401) {
      // Dispatch a custom event so the AuthContext can pick it up and log out
      window.dispatchEvent(new Event('auth:unauthorized'));
    }
    
    return response;
  } catch (error) {
    console.error('Network Error in apiFetch:', error);
    throw error;
  }
}
