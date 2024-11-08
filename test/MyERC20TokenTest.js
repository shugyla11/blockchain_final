const MyERC20Token = require('../MyERC20Token.json');

contract("MyERC20Token", (accounts) => {
  let instance;

  before(async () => {
    instance = new web3.eth.Contract(MyERC20Token.abi, "0x01Db1289616B88c9bABc205A1D0Cb3fb9f1cDf9b"); 
  });

  it("should return the correct balance of the owner", async () => {
    const balance = await instance.methods.balanceOf(accounts[0]).call();
    assert.equal(balance, "1000000", "Balance doesn't match expected value");
  });
});
