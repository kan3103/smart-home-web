/**
 * Centralized token management utility
 */

// Get the authentication token
export const getToken = () => {
    return localStorage.getItem('access_token');
};

// Set the authentication token
export const setToken = (token) => {
    localStorage.setItem('access_token', token);
};

// Remove the token (for logout)
export const removeToken = () => {
    localStorage.removeItem('access_token');
};

// Check if user is authenticated
export const isAuthenticated = () => {
    const token = getToken();
    return !!token;
};

// Handle authentication errors
export const handleAuthError = () => {
    // Instead of immediately removing the token, we could implement
    // token refresh logic here in the future
    console.error('Authentication error occurred');
    window.location.href = '/login';
};

// Create authorization headers
export const getAuthHeaders = () => {
    const token = getToken();
    return {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};
