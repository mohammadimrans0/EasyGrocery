export const getUserId = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('easygrocery_user_id');
    }
    return null;
  };
  