import React, { useEffect, useState } from 'react';
import Navigation from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import Account from '../../components/Account/Account';
import accounts from "./accounts.json"
import { useSelector, useDispatch } from 'react-redux';
import { setUserData, setUserName } from '../../redux/authReducer';
import { Navigate } from 'react-router-dom';

import './profile.css'


function Profile() {
  const { userName, firstName, lastName } = useSelector((state) => state.auth);
  let authToken = useSelector((state) => state.auth.authToken);
  const dispatch = useDispatch();
  const [headerShows, setHeaderShows] = useState(true);
  const [newUserName, setNewUserName] = useState(userName || '');

  if (!authToken) {
    authToken = localStorage.getItem('authToken');
  }

  useEffect(() => {
    if (!authToken) {
      return;
    }
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          dispatch(setUserData(userData.body.firstName, userData.body.lastName));
          dispatch(setUserName(userData.body.userName));
        } else {
          console.error('Erreur lors de la récupération des informations de l\'utilisateur');
        }
      } catch (error) {
        console.error('Erreur lors de la requête API', error);
      }
    };

    fetchData();
  }, [authToken, dispatch]);

  if (!authToken) {
    return <Navigate to="/signin" />;
  } 
  
  function editUserName (event) {
    event.preventDefault();


    const fetchData = async () => {
      try {
        const response = await fetch ('http://localhost:3001/api/v1/user/profile', {
          method: 'PUT', 
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userName: newUserName }),
        });
        if (response.ok) {
          const userNameResponse = await response.json();
          dispatch(setUserName(userNameResponse.body.userName));
          setHeaderShows(true);
        }
      } catch (error) {
        console.error('Erreur lors du changement de pseudonyme', error);
      }
    }
    fetchData();
    
  }


function showFormHeader () {
  setHeaderShows(!headerShows)
  }

  return (
    <div>
        <Navigation />
        <div className='main bg-dark'>
          {headerShows ? (
            <div className='header'>
                <h1>Welcome back
                <br></br>
                {firstName} {lastName}</h1>
                <button className="edit-button" onClick={showFormHeader}>Edit Name</button>
            </div>
          ) : (
            <form className='profileForm' onSubmit={editUserName}>
                <h1>Edit user info</h1>

                <div>User name: <input type='text' value={newUserName} placeholder={userName} onChange={(e) => setNewUserName(e.target.value)} /></div>
                <div>First name: <input label="First name" placeholder={firstName} disabled /></div>
                <div>Last name: <input label="Last name" placeholder={lastName} disabled /></div>
                <div className='saveCancelButtons'>

                <button type='sumbit' className="save-button">Save</button>
                <button type="button" className="cancel-button" onClick={showFormHeader}>Cancel</button>
                </div>
            </form>
          )}
          <h2 className="sr-only">Accounts</h2>
          {accounts.map(account => (
          <Account
            key={account.id}
            accountName={account.accountName}
            accountId={account.accountId}
            accountBalance={account.accountBalance}
            accountBalanceName={account.accountBalanceName}
          />
        ))}
        </div>
        <Footer />
    </div>
  );
}

export default Profile;