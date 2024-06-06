import { useState } from 'react';
import { dbank_backend } from 'declarations/dbank_backend';


function App() {
  const [balance, setBalance] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const updateBalance = () => {
    dbank_backend.checkBalance().then((bal) => {
      setBalance(bal);
    });
  }
  updateBalance();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true)
    const amountTopUp = parseFloat(e.target.elements.topUp.value);
      const amountWith = parseFloat(e.target.elements.withdraw.value);
    if (amountTopUp) {
      await dbank_backend.topUp(amountTopUp);
    } 
    if (amountWith) {
      await dbank_backend.botDown(amountWith);
    }
    await dbank_backend.compound();
    updateBalance();
    setDisabled(false)
  }

  return (
    <main>
      <div class="container">
        <img src="dbank_logo.png" alt="DBank logo" width="100" />
        <h1>Current Balance: $ {Math.round(balance *100)/100}</h1>
        <div class="divider"></div>
        <form onSubmit={handleSubmit}>
          <h2>Amount to Top Up</h2>
          <input id="input-amount" type="number" step="0.01" min={0} name="topUp" />
          <h2>Amount to Withdraw</h2>
          <input id="withdrawal-amount" type="number" name="withdraw" step="0.01" min={0} />
          <input id="submit-btn" disabled={(disabled) ? true : false} type="submit" value="Finalise Transaction" />
        </form>
      </div>
    </main>
  );
}

export default App;
