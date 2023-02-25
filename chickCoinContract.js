// Create an object to hold the contract's methods and events
const HotChicksContract = {
    abi: [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"chicken","type":"address"},{"indexed":false,"internalType":"uint256","name":"damage","type":"uint256"}],"name":"ChickenDamaged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"chickenId","type":"uint256"},{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"}],"name":"ChickenTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"chickenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rarity","type":"uint256"}],"name":"NewChicken","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"chicken","type":"address"},{"indexed":false,"internalType":"string","name":"powerUp","type":"string"}],"name":"PowerUpUsed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"chicken","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokenEarned","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allChickens","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"rarity","type":"uint256"},{"internalType":"uint256","name":"health","type":"uint256"},{"internalType":"uint256","name":"lastEgg","type":"uint256"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"powerUpIndex","type":"uint256"},{"internalType":"uint256","name":"eggValue","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"surname","type":"string"},{"internalType":"bytes32","name":"unique_hash","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"chickenId","type":"uint256"},{"internalType":"uint256","name":"powerUpIndex","type":"uint256"}],"name":"assignPowerUp","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addy","type":"address"}],"name":"authorized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"surname","type":"string"}],"name":"becomeChicken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"new_owner","type":"address"}],"name":"change_owner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"chickenFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"chickenToUser","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"developerBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"developerFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"chickenId","type":"uint256"}],"name":"earnToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"eggCooldown","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"player","type":"address"}],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getChickenFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getEggCooldown","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"player","type":"address"}],"name":"getPlayerChickens","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"rarity","type":"uint256"},{"internalType":"uint256","name":"health","type":"uint256"},{"internalType":"uint256","name":"lastEgg","type":"uint256"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"powerUpIndex","type":"uint256"},{"internalType":"uint256","name":"eggValue","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"surname","type":"string"},{"internalType":"bytes32","name":"unique_hash","type":"bytes32"}],"internalType":"struct HotChicks.Chicken[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPowerUpFeeMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"getTopChickens","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextChickenId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"powerUpFeeMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"releaseChickens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"reward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"player","type":"address"}],"name":"setBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_fee","type":"uint256"}],"name":"setChickenFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_cooldown","type":"uint256"}],"name":"setEggCooldown","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_fee","type":"uint256"}],"name":"setPowerUpFeeMultiplier","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_reward","type":"uint256"}],"name":"setReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addy","type":"address"},{"internalType":"bool","name":"booly","type":"bool"}],"name":"set_authorized","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"chickenId","type":"uint256"}],"name":"transferChicken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasuryBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"chickenId","type":"uint256"}],"name":"usePowerUpHealthBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userChickens","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"rarity","type":"uint256"},{"internalType":"uint256","name":"health","type":"uint256"},{"internalType":"uint256","name":"lastEgg","type":"uint256"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"powerUpIndex","type":"uint256"},{"internalType":"uint256","name":"eggValue","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"surname","type":"string"},{"internalType":"bytes32","name":"unique_hash","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
}

