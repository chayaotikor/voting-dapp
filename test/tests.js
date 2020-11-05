const Election = artifacts.require("./Election.sol");

contract("Election Contract", function (accounts) {
  let electionInstance;

  before(async () => {
    electionInstance = await Election.deployed();
  });
  /* POSITIVE TESTS */
  it("Should return the correct number of proposals", async () => {
    let result = await electionInstance.getNumberOfProposals();
    assert.equal(result, 5);
  });
  it("Should accept valid registration of a voter from the election official", async () => {
    let result = await electionInstance.register(accounts[1], {
      from: accounts[0],
    });
    assert.equal(result.receipt.status, true, "Registration is valid.");
  });
  it("Should correctly return the number of registered voters", async () => {
    await electionInstance.register(accounts[2], {
      from: accounts[0],
    });
    await electionInstance.register(accounts[3], {
      from: accounts[0],
    });
    let result = await electionInstance.countRegisteredVoters();
    assert.equal(result, 3);
  });

  it("Should accept valid voting on proposals", async () => {
    let result = await electionInstance.vote([false, true, false, true, true], {
      from: accounts[2],
    });
    assert.equal(true, result.receipt.status, "Vote has been cast.");
  });
  it("Should return the voter's choices to them", async () => {
    let result = await electionInstance.getVoterChoices(accounts[2], {
      from: accounts[2],
    });
    let voterChoices = [false, true, false, true, true]
    for (let i = 0; i < result.length; i++){
      if (result[i] !== voterChoices[i]) {
        assert(false, "Voter choices do not match.")
      }
    }
    assert(true)
  });
});
