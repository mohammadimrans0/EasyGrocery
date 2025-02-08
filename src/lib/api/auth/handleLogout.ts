export const logout = async () => {
  try {
    const response = await fetch('https://easygrocery-server.onrender.com/api/user/logout/', {
      method: 'GET', // Use GET as the API expects
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token if required
      },
    });

    if (response.ok) {
      // Logout successful
      localStorage.removeItem('easygrocery_user_id');
      localStorage.removeItem('easygrocery_auth_token');
      console.log('Logout successful');
      window.location.href = '/auth/login';
    } else {
      console.error('Logout failed:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
};
