const CryptoWall = artifacts.require("./CryptoWall.sol");

require("chai").use(require("chai-as-promised")).should();

contract("Crypto Wall", ([deployer, author, tipper]) => {
  let cryptoWall;

  before(async () => {
    cryptoWall = await CryptoWall.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = await cryptoWall.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("has a name", async () => {
      const name = await cryptoWall.name();
      assert.equal(name, "Crypto Wall");
    });
  });
});
