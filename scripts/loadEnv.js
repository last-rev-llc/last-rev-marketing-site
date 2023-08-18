const dotenv = require('dotenv');
const dotenvVault = require('dotenv-vault');

dotenv.config({
  path: './.env.vault',
  decrypt: dotenvVault.decrypt
});
