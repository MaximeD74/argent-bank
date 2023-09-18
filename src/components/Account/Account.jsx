import React from 'react';

function Account({ accountName, accountId, accountBalance, accountBalanceName }) {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{accountName} ({accountId})</h3>
        <p className="account-amount">{accountBalance}</p>
        <p className="account-amount-description">{accountBalanceName}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  );
}

export default Account;