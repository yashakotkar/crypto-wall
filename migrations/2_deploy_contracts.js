const CryptoWall = artifacts.require("CryptoWall");

module.exports = function (deployer) {
  deployer.deploy(CryptoWall);
};
