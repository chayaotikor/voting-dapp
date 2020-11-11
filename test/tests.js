const Election = artifacts.require("./Election.sol");

contract("Election Contract", function (accounts) {
  let electionInstance;

  before(async () => {
    electionInstance = await Election.deployed();
  });
  /* POSITIVE TESTS */
  it("Should return the correct number of proposals", async () => {
    let result = await electionInstance.getTotalProposals();
    assert.equal(result, 8);
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
    let result = await electionInstance.pluralityVote(
      [false, true, false, true, true],
      {
        from: accounts[1],
      }
    );
    assert.equal(result.receipt.status, true, "Vote has been cast.");
  });
  it("Should return the voter's choices to them correctly", async () => {
    let actualChoices = await electionInstance.getPluralityChoices(
      accounts[1],
      {
        from: accounts[1],
      }
    );
    let expectedChoices = [false, true, false, true, true];
    assert.deepEqual(actualChoices, expectedChoices);
  });
  it("Should accept counting of winning proposals", async () => {
    await electionInstance.pluralityVote([true, false, false, false, true], {
      from: accounts[2],
    });
    await electionInstance.pluralityVote([true, true, true, false, false], {
      from: accounts[3],
    });

    let result = await electionInstance.countPluralityProposals();
    assert.equal(
      result.receipt.status,
      true,
      "Proposal count has been completed."
    );
  });

  it("Should return the correct boolean value for each proposal", async () => {
    let expectedResults = [true, true, false, false, true];
    let actualResults = await electionInstance.getWinningPluralityProposals();

    assert.deepEqual(actualResults, expectedResults);
  });
  it("Should return the yes and no counts for a given proposal", async () => {
    let countBN = await electionInstance.getProposalCount(0);
    let actualCount = [countBN[0].toNumber(), countBN[1].toNumber()];
    assert.deepEqual(actualCount, [1, 2]);
  });

  /* NEGATIVE TESTS */
  it("Should NOT allow an account other than the election official to register a voter", async () => {
    try {
      await electionInstance.register(accounts[4], {
        from: accounts[1],
      });
      assert(false);
    } catch (error) {
      assert(
        error.message.includes("You are not authorized to take this action.")
      );
    }
  });
  it("Should NOT allow an account to be registered twice", async () => {
    try {
      await electionInstance.register(accounts[1], {
        from: accounts[0],
      });
      assert(false);
    } catch (error) {
      assert(error.message.includes("Voter is already registered."));
    }
  });
  it("Should NOT allow an account to vote that is not registered", async () => {
    try {
      await electionInstance.pluralityVote([false, true, false, true, true], {
        from: accounts[5],
      });
      assert(false);
    } catch (error) {
      assert(error.message.includes("Voter is not registered."));
    }
  });
  it("Should NOT allow an account to vote twice", async () => {
    try {
      await electionInstance.pluralityVote([false, true, false, true, true], {
        from: accounts[1],
      });
      assert(false);
    } catch (error) {
      assert(error.message.includes("Voter has already voted."));
    }
  });
  it("Should NOT allow anyone to view a voter's choices except that voter", async () => {
    try {
      await electionInstance.getPluralityChoices(accounts[1], {
        from: accounts[0],
      });
      assert(false);
    } catch (error) {
      assert(
        error.message.includes(
          "You are not authorized to view this information."
        )
      );
    }
  });
});
