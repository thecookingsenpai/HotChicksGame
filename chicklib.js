
console.log("HotChicksContract", HotChicksContract);

// NOTE Basic chicken box
var ChickenPrototype = `
<div class="chicken" id=chicken_[ID]>
  <div class="chicken-name">[NAME] [SURNAME]</div>
  <div class="chicken-attribute">Rarity: [RARITY]</div>
  <div class="chicken-attribute">Health: [HEALTH]/100</div>
  <a href="#" class="power-up">Use Power-Up</a>
  <a href="#" class="transfer">Transfer Chicken</a>
</div> `

const contractAddress = "0x48F9b2f3F89cf10508132a17846206D26aa2DdB4"; // Use your own contract address
var HotChicks;
var provider = null;
var signer;
var address;
var network;

// ANCHOR Statuses
var ownedChickens = [];
var ownedCoins = 0;

// ANCHOR UI Elements
var connectionButton;
var addressString;
var coinBalance;
var chickenBalance;
var buyChickenButton;
var chickenBox;

var supportedNetworks = [80001]

// ANCHOR Initialization

// Load components
window.addEventListener("load", async () => {
  // Load the chicken box
  chickenBox = document.getElementById("chickenBox");
  // Load the buy chicken button
  buyChickenButton = document.getElementById("buyChickenButton");
  buyChickenButton.addEventListener("click", async () => {
    await purchaseChicken();
    console.log("Routine finished");
  });
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
  HotChicks = new ethers.Contract(
    contractAddress,
    HotChicksContract.abi,
    signer
  );
  console.log("Connected to contract");
  console.log(HotChicks);
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
  // Clean the UI
  let _chickenBox = "";
  let _actualChickenBox = chickenBox.innerHTML;
  // Get the chickens
  console.log("Getting chickens for user " + address_target);
  ownedChickens = await HotChicks.getPlayerChickens(address_target);
  console.log("Chickens for user " + address_target + ": ");
  console.log(ownedChickens);
  // Update UI
  chickenBalance.innerHTML = ownedChickens.length;
  // Get details for each chicken
  for (var i = 1; i <= ownedChickens.length; i++) {
    let numericId = ownedChickens[i-1][0]._hex;
    let decimalId = parseInt(numericId, 16);
    var _chicken = await HotChicks.allChickens(decimalId);
    console.log("Chicken " + decimalId + ": ");
    console.log(_chicken);
    // Get the needed data
    let name = _chicken[7];
    let surname = _chicken[8];
    let rarityHex = _chicken[1]._hex;
    let rarityDecimal = parseInt(rarityHex, 16);
    let powerUpsHex = _chicken[5]._hex;
    let powerUpsDecimal = parseInt(powerUpsHex, 16);
    let healthHex = _chicken[2]._hex;
    let healthDecimal = parseInt(healthHex, 16);
    // Fill the UI
    let chickenPrototypeCompiled = ChickenPrototype;
    chickenPrototypeCompiled = chickenPrototypeCompiled.replace("[ID]", decimalId);
    chickenPrototypeCompiled = chickenPrototypeCompiled.replace("[NAME]", name);
    chickenPrototypeCompiled = chickenPrototypeCompiled.replace("[SURNAME]", surname);
    chickenPrototypeCompiled = chickenPrototypeCompiled.replace("[RARITY]", rarityDecimal);
    chickenPrototypeCompiled = chickenPrototypeCompiled.replace("[HEALTH]", healthDecimal);
    chickenPrototypeCompiled = chickenPrototypeCompiled.replace("[POWERUPS]", powerUpsDecimal);
    // Append the chicken to the UI
    _chickenBox += chickenPrototypeCompiled;
  }
  // Update UI
  if (_chickenBox != _actualChickenBox) {
    chickenBox.innerHTML = _chickenBox;
  }
  return ownedChickens;
}

// Get the user's balance of tokens
async function getBalance(address_target=address) {
  console.log("Getting balance for user " + address_target);
  ownedCoins = await HotChicks.balances(address_target);
  console.log("Balance: " + ownedCoins.toString());
  // Update UI
  coinBalance.innerHTML = ownedCoins.toString();
  return ownedCoins.toString();
}

// Purchase a new chicken with the specified name
async function purchaseChicken() {
  // Generate a random name and surname
  var name = names[Math.floor(Math.random() * names.length)];
  var surname = names[Math.floor(Math.random() * names.length)];

  console.log("Purchasing chicken with name " + name + " " + surname);

  if (!provider) {
    Swal.fire({
      title: 'Error!',
      text: 'Please connect to a wallet',
      icon: 'error',
      confirmButtonText: 'Ok, cool'
    })
    return;
  }
  const chickenfee = await HotChicks.getChickenFee();
  const devfee = await HotChicks.developerFee();

  let fee = chickenfee.add(devfee);

  console.log("Fee: " + fee.toString());
  const transaction = await HotChicks.becomeChicken(name, surname,{
    value: fee
  });
  console.log(transaction);
  console.log("Transaction hash: " + transaction.hash);
  var receipt = await transaction.wait();
  return receipt
}


// SECTION Contract

async function HotChicks_authorized(addy, ) {
	let result = await HotChicks.authorized(addy);
	return JSON.stringify(result);
}
//( address )


async function HotChicks_set_authorized(addy, booly, ) {
	let result = await HotChicks.set_authorized(addy, booly);
	let receipt = await result.wait();
	return receipt;
}
//( address bool )


async function HotChicks_change_owner(new_owner, ) {
	let result = await HotChicks.change_owner(new_owner);
	let receipt = await result.wait();
	return receipt;
}
//( address )



async function HotChicks_becomeChicken(name, surname, ) {
	let result = await HotChicks.becomeChicken(name, surname);
	let receipt = await result.wait();
	return receipt;
}
//( string string  [payable] )


async function HotChicks_earnToken(chickenId, ) {
	let result = await HotChicks.earnToken(chickenId);
	let receipt = await result.wait();
	return receipt;
}
//( uint256 )


async function HotChicks_getBalance(player, ) {
	let result = await HotChicks.getBalance(player);
	let receipt = await result.wait();
	return receipt;
}
//( address )


async function HotChicks_transferChicken(to, chickenId, ) {
	let result = await HotChicks.transferChicken(to, chickenId);
	let receipt = await result.wait();
	return receipt;
}
//( address uint256 )


async function HotChicks_assignPowerUp(chickenId, powerUpIndex, ) {
	let result = await HotChicks.assignPowerUp(chickenId, powerUpIndex);
	let receipt = await result.wait();
	return receipt;
}
//( uint256 uint256 )


async function HotChicks_usePowerUpHealthBonus(chickenId, ) {
	let result = await HotChicks.usePowerUpHealthBonus(chickenId);
	let receipt = await result.wait();
	return receipt;
}
//( uint256 )


async function HotChicks_releaseChickens() {
	let result = await HotChicks.releaseChickens();
	let receipt = await result.wait();
	return receipt;
}
//( )


async function HotChicks_getBalance() {
	let result = await HotChicks.getBalance();
	return JSON.stringify(result);
}
//( )


async function HotChicks_setChickenFee(_fee, ) {
	let result = await HotChicks.setChickenFee(_fee);
	let receipt = await result.wait();
	return receipt;
}
//( uint256 )

async function HotChicks_getChickenFee() {
	let result = await HotChicks.getChickenFee();
	return JSON.stringify(result);
}
//( )


async function HotChicks_setReward(_reward, ) {
	let result = await HotChicks.setReward(_reward);
	let receipt = await result.wait();
	return receipt;
}
//( uint256 )

async function HotChicks_getReward() {
	let result = await HotChicks.getReward();
	return JSON.stringify(result);
}
//( )


async function HotChicks_setEggCooldown(_cooldown, ) {
	let result = await HotChicks.setEggCooldown(_cooldown);
	let receipt = await result.wait();
	return receipt;
}
//( uint256 )

async function HotChicks_getEggCooldown() {
	let result = await HotChicks.getEggCooldown();
	return JSON.stringify(result);
}
//( )


async function HotChicks_getPlayerChickens(player, ) {
	let result = await HotChicks.getPlayerChickens(player);
	return JSON.stringify(result);
}
//( address )


async function HotChicks_getTopChickens(num, ) {
	let result = await HotChicks.getTopChickens(num);
	return JSON.stringify(result);
}
//( uint256 )


async function HotChicks_withdrawFees() {
	let result = await HotChicks.withdrawFees();
	let receipt = await result.wait();
	return receipt;
}
//( )

async function HotChicks_setPowerUpFeeMultiplier(_fee, ) {
	let result = await HotChicks.setPowerUpFeeMultiplier(_fee);
	let receipt = await result.wait();
	return receipt;
}
//( uint256 )


async function HotChicks_getPowerUpFeeMultiplier() {
	let result = await HotChicks.getPowerUpFeeMultiplier();
	return JSON.stringify(result);
}
//( )
// !SECTION Contract