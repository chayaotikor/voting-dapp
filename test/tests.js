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
      from: accounts[1],
    });
    assert.equal(true, result.receipt.status, "Vote has been cast.");
  });
  it("Should return the voter's choices to them correctly", async () => {
    let returnedChoices = await electionInstance.getVoterChoices(accounts[1], {
      from: accounts[1],
    });
    let actualChoices = [false, true, false, true, true];
    for (let i = 0; i < returnedChoices.length; i++) {
      if (returnedChoices[i] !== actualChoices[i]) {
        assert(false, "Actual choices don't match returned choices");
      }
    }
    assert(true);
  });
  it("Should accept counting of winning proposals", async () => {
        await electionInstance.vote([true, false, false, false, true], {
          from: accounts[2],
        });
        await electionInstance.vote([true, true, true, false, false], {
          from: accounts[3],
        });
    
    let result = await electionInstance.countWinningProposals()
        assert.equal(true, result.receipt.status, "Proposal count has been completed.");
  });

  it("Should return the correct boolean value for each proposal", async () => {
    let expectedResults = [true, true, false, false, true];
    let actualResults = await electionInstance.getWinningProposals();
      for (let i = 0; i < actualResults.length; i++) {
        if (actualResults[i] !== expectedResults[i]) {
          assert(false, "Actual results don't match expected results");
        }
      }
      assert(true);
  })
  // it("Should return the yes and no counts for a given proposal", async () => {
  //   let returnedCount = await electionInstance.getProposalCount(0);
  //   console.log(returnedCount)
  // })
});
