import { useEffect, useState } from 'react';
import { dbank_backend } from 'declarations/dbank_backend';


function App() {
  const [balance, setBalance] = useState(100);
  const updateBalance = async () => {
    await dbank_backend.checkBalance().then((bal) => {
      setBalance(bal);
    });
  }
  updateBalance();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amountTopUp = parseFloat(e.target.elements.topUp.value);
    const amountWith = parseFloat(e.target.elements.topUp.value);
    await dbank_backend.topUp(amountTopUp);
    await dbank_backend.botDown(amountWith);
    await updateBalance();
  }

  return (
    <main>
      <div class="container">
        <img src="dbank_logo.png" alt="DBank logo" width="100" />
        <h1>Current Balance: $ {balance}</h1>
        <div class="divider"></div>
        <form onSubmit={handleSubmit}>
          <h2>Amount to Top Up</h2>
          <input id="input-amount" type="number" step="0.01" min={0} name="topUp" />
          <h2>Amount to Withdraw</h2>
          <input id="withdrawal-amount" type="number" name="withdraw" step="0.01" min={0} />
          <input id="submit-btn" type="submit" value="Finalise Transaction" />
        </form>
      </div>
    </main>
  );
}

export default App;
