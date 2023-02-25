
console.log("ChickCoinContract", ChickCoinContract);

const contractAddress = "0x3e4551375325627806afCfF31a3A88697f83cC55"; // Use your own contract address
var ChickCoin;
var provider = null;
var signer;
var address;
var network;

// ANCHOR Statuses
var ownedChickens = [];

// ANCHOR UI Elements
var connectionButton;
var addressString;
var coinBalance 
var chickenBalance;

var supportedNetworks = [80001]

// ANCHOR Initialization

// Load components
window.addEventListener("load", async () => {
  // Load balances
  coinBalance = document.getElementById("coinBalance");
  chickenBalance = document.getElementById("chickenBalance");
  // Load the connection buttons and address string
  connectionButton = document.getElementById("connectionButton");
  connectionButton.addEventListener("click", async () => {
    await metamask();
    console.log("Connected to provider");
  });
  addressString = document.getElementById("addressString");
});

// Start the watchdog
console.log("Watchdog started");
watchdog();

// ANCHOR Watchdog

var lockWatchdog = false;
var killWatchdog = false;
async function watchdog() {
  while (true) {
    if (killWatchdog) {
      console.log("Watchdog killed");
      return;
    }
    if (lockWatchdog) {
      return;
    }
    lockWatchdog = true;
    try {
        // Connection status checker
      if (provider) {
        var newNetwork = await provider.getNetwork();
        if (newNetwork.chainId != network.chainId) {
          disconnect();
          Swal.fire({
            title: 'Error!',
            text: 'Please switch to any of the supported networks: ' + supportedNetworks.join(', '),
            icon: 'error',
            confirmButtonText: 'Ok, cool'
          })
          return;
        }
        // If network is supported, and if we are connected, update informations
        console.log("Updating informations");
        await getUserChickens();
        await getBalance();
      }
    } catch (error) {
      console.log(error);
    }

    await sleep(1000);
    lockWatchdog = false;
  }
}

// ANCHOR Helpers

// Sleep for the specified number of milliseconds
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ANCHOR Methods

async function metamask() {
  if (provider) {
    disconnect();
  } else {
    connect();
  }
}

async function disconnect() {
  // Disconnect from the MetaMask Ethereum provider
  provider = null;
  signer = null;
  address = null;
  console.log("Disconnected from provider");
  // Update UI
  connectionButton.innerHTML = "Connect";
  addressString.style.display = "none";
}

async function connect() {
  // Stop watchdog
  lockWatchdog = true;
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
  // Get signer and address
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
  // Update UI
  connectionButton.innerHTML = "Disconnect";
  addressString.innerHTML = address;
  addressString.style.display = "block";
  addressString.style.fontWeight = "bold";
  // Start watchdog
  lockWatchdog = false;
}


// ANCHOR Contract Methods

// Get the user's Ethereum account from MetaMask
async function getUserChickens(address_target=address)  {
  console.log("Getting chickens for user " + address_target);
  // Reset owned chickens
  ownedChickens = [];
  // Get the total number of chickens
  var chickens = await ChickCoin.nextChickenId();
  chickens = chickens.toNumber() - 1;
  console.log("Total chickens: " + chickens);
  for (var i = 0; i < chickens; i++) {
    // Check if the chicken is owned by the user
    var _owner = await ChickCoin.chickenToUser(i);
    if (_owner == address_target) {
      ownedChickens.push(i);
    }
  }
  console.log("Chickens for user " + address_target + ": ");
  console.log(ownedChickens);
  // Update UI
  chickenBalance.innerHTML = ownedChickens.length;
  return ownedChickens;
}

// Get the user's balance of tokens
async function getBalance(address_target=address) {
  console.log("Getting balance for user " + address_target);
  const balance = await ChickCoin.balances(address_target);
  console.log("Balance: " + balance.toString());
  // Update UI
  coinBalance.innerHTML = balance.toString();
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
