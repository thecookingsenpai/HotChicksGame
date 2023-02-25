
console.log("ChickCoinContract", ChickCoinContract);

const contractAddress = "0x3e4551375325627806afCfF31a3A88697f83cC55"; // Use your own contract address
var ChickCoin;
var provider;
var signer;
var address;
var network;

var supportedNetworks = [80001]

// ANCHOR Initialization

// Load components
window.addEventListener("load", async () => {
  var connectionButton = document.getElementById("connectionButton");
  connectionButton.addEventListener("click", async () => {
    await connect();
    console.log("Connected to provider");
  });
});

// ANCHOR Methods

async function connect() {
  // Connect to the MetaMask Ethereum provider asking for access to the user's accounts
  provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  // Prompt user for account connections
  await provider.send("eth_requestAccounts", []);
  // Check network id and switch if necessary
  network = await provider.getNetwork();
  console.log(network);
  if (!supportedNetworks.includes(network.chainId)) {
    Swal.fire({
      title: 'Error!',
      text: 'Please switch to any of the supported networks: ' + supportedNetworks.join(', '),
      icon: 'error',
      confirmButtonText: 'Ok, cool'
    })
  }
  signer = provider.getSigner();
  address = await signer.getAddress();
  console.log("Connected to provider");
  console.log(provider);
  console.log(signer);
  console.log(address);
  ChickCoin = new ethers.Contract(
    contractAddress,
    ChickCoinContract.abi,
    signer
  );
  console.log("Connected to contract");
  console.log(ChickCoin);
}

// Get the user's Ethereum account from MetaMask
async function getUserAccount() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const accounts = await window.ethereum.request({ method: "eth_accounts" });
  return accounts[0];
}

// Get the user's balance of tokens
async function getBalance() {
  const account = await getUserAccount();
  const balance = await ChickCoin.getBalance(account);
  return balance.toString();
}

// Purchase a new chicken with the specified name
async function purchaseChicken(name) {
  const account = await getUserAccount();
  const fee = await ChickCoin.getChickenFee();
  const transaction = await ChickCoin.purchaseChicken(name, {
    value: fee,
    from: account
  });
  await transaction.wait();
  return transaction.hash;
}

// Use a power-up on the specified chicken
async function usePowerUp(chickenId, powerUpIndex) {
  const account = await getUserAccount();
  const fee = await ChickCoin.getPowerUpFee();
  const transaction = await ChickCoin.usePowerUp(chickenId, powerUpIndex, {
    value: fee,
    from: account
  });
  await transaction.wait();
  return transaction.hash;
}

// Transfer the specified chicken to the specified recipient
async function transferChicken(chickenId, recipient) {
  const account = await getUserAccount();
  const transaction = await ChickCoin.transferChicken(chickenId, recipient, {
    from: account
  });
  await transaction.wait();
  return transaction.hash;
}

// Get the top N chicken owners, where N is the specified limit
async function getTopChickenOwners(limit) {
  const owners = await ChickCoin.getTopChickens(limit);
  return owners;
}

async function earnToken() {
  const account = await getUserAccount();
  const transaction = await ChickCoin.earnToken({ from: account });
  await transaction.wait();
  return transaction.hash;
}
