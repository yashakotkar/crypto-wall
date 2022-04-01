const { assert } = require("chai");
// const web3 = require("web3");

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

  describe("posts", async () => {
    let results, postCount;
    const hash = "abc123";
    const desc = "Hello World!";

    before(async () => {
      results = await cryptoWall.createPost(hash, desc, { from: author });
      postCount = await cryptoWall.postCount();
    });

    it("create posts", async () => {
      // Success
      assert.equal(postCount, 1);
      const event = results.logs[0].args;
      assert.equal(event.id.toNumber(), postCount.toNumber(), "[Id Correct]");
      assert.equal(event.imageHash, hash, "[Hash Correct]");
      assert.equal(event.description, desc, "[Description Correct]");
      assert.equal(event.tipAmount, 0, "[Tip Amount Correct]");
      assert.equal(event.author, author, "[Author Correct]");

      // Failure: Image Should have hash
      await cryptoWall.createPost("", "IMG DESC", { from: author }).should.be
        .rejected;

      // Failure: Image Should have description
      await cryptoWall.createPost("uefiiofjeofow", "", { from: author }).should
        .be.rejected;
    });

    it("list posts", async () => {
      const post = await cryptoWall.posts(postCount);
      assert.equal(post.id.toNumber(), postCount.toNumber(), "[Id Correct]");
      assert.equal(post.imageHash, hash, "[Hash Correct]");
      assert.equal(post.description, desc, "[Description Correct]");
      assert.equal(post.tipAmount, 0, "[Tip Amount Correct]");
      assert.equal(post.author, author, "[Author Correct]");
    });

    it("allow users to tip posts", async () => {
      let oldAuthorBalance;
      oldAuthorBalance = await web3.eth.getBalance(author);
      oldAuthorBalance = new web3.utils.BN(oldAuthorBalance);

      let result = await cryptoWall.tipPostOwner(postCount, {
        from: tipper,
        value: web3.utils.toWei("1", "Ether"),
      });

      // Success
      const event = result.logs[0].args;
      assert.equal(event.id.toNumber(), postCount.toNumber(), "[Id Correct]");
      assert.equal(event.imageHash, hash, "[Hash Correct]");
      assert.equal(event.description, desc, "[Description Correct]");
      assert.equal(
        event.tipAmount,
        "1000000000000000000",
        "[Tip Amount Correct]"
      );
      assert.equal(event.author, author, "[Author Correct]");

      // Check author receive funds
      let newAuthorBalance;
      newAuthorBalance = await web3.eth.getBalance(author);
      newAuthorBalance = new web3.utils.BN(newAuthorBalance);

      let tipPostOwner;
      tipPostOwner = web3.utils.toWei("1", "Ether");
      tipPostOwner = new web3.utils.BN(tipPostOwner);

      const expectBalance = oldAuthorBalance.add(tipPostOwner);

      assert.equal(expectBalance.toString(), newAuthorBalance.toString());

      // Failure: Tries to tip a image that does not exist
      await cryptoWall.tipPostOwner(99, {
        from: tipper,
        value: web3.utils.toWei("1", "Ether"),
      }).should.be.rejected;
    });
  });
});
