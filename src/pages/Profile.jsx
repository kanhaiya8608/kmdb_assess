import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();

  return (
    <div className="container mx-auto p-6 py-8 min-h-screen">
      <h2 className="text-3xl font-bold mb-4 dark:text-white">User Profile</h2>
      <div className="flex flex-col items-center p-4 rounded-md">
        {isLoading && <div>Loading...</div>}
        {isAuthenticated && (
          <div className="flex flex-col items-center">
            <img src={user.picture} alt={user.name} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
            <div>
              <p className="dark:text-white rounded-md  border border-gray-300 mt-4 p-3 mb-2"><span className='font-bold'>Name:</span> {user.name}</p>
              <p className="dark:text-white rounded-md border border-gray-300 p-3 mb-2"><span className='font-bold'>Email:</span> {user.email}</p>
              <button onClick={() => logout({ returnTo: window.location.origin })} className="mt-4 dark:bg-black dark:hover:bg-gray-700 bg-blue-500 text-white px-4 py-2 rounded-md">Log Out</button>
            </div>
          </div>
        )}
        {!isAuthenticated && (
          <div>
            <p>Please log in to view your profile.</p>
            <button onClick={() => loginWithRedirect()} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">Log In</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
