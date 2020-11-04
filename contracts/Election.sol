pragma solidity >=0.4.22 <0.8.0;

contract Election {
  /* VARIABLES */
  //STRUCTS
  // For use when ranked choice allowed
  // struct Proposal {
  //     uint[] options;
  //     uint proposalNumber;
  //     bytes32 proposalType;
  // }
  struct Proposal {
    uint yesCount;
    uint noCount;
  }

  struct Voter {
    bool voted;
    // address token;
    address voterAddress;
    uint[] choices;
  }

  //Custom
  Proposal[] public electionProposals;
  // address[] internal registeredAddressList;

  //MAPPING
  mapping(address => Voter) voters;

  //UINTS
  uint public totalRegisteredVoters;
  uint public totalVoted;

  //ADDRESSES
  address public electionOfficial;

  /* MODIFIERS */
  modifier onlyOfficial() {
    require(
      msg.sender == electionOfficial,
      "You are not the election official."
    );
    _;
  }

  modifier isRegisteredVoter() {
    require(
      voters[msg.sender].voterAddress != address(0),
      "Voter is not registered."
    );
    _;
  }

  modifier hasNotVoted() {
    require(voters[msg.sender].voted == false, "Voter has already voted.");
    _;
  }

  /* FUNCTIONS */
  //CONSTRUCTOR
  constructor(uint _numOfProposals) public {
    electionOfficial = msg.sender;
    electionProposals.length = _numOfProposals;
    for (uint i = 0; i < _numOfProposals; i++) {
      electionProposals[i].yesCount = 0;
      electionProposals[i].noCount = 0;
    }
  }

  //ELECTION SETUP FUNCTIONS
  function register(address registeringVoter) public onlyOfficial {
    //Check if the voter is already registered based on their address
    if (voters[registeringVoter].voterAddress != address(0)) revert();

    voters[registeringVoter].voterAddress = registeringVoter;
    voters[registeringVoter].voted = false;
    totalRegisteredVoters++;
  }

  //VOTING FUNCTIONS
  function vote(uint[] memory voterChoices)
    public
    isRegisteredVoter
    hasNotVoted
  {
    for (uint index = 0; index < electionProposals.length; index++) {
      voters[msg.sender].choices[index] = voterChoices[index];
      if (voters[msg.sender].choices[index] == 0) {
        electionProposals[index].noCount++;
      } else if (voters[msg.sender].choices[index] == 1) {
        electionProposals[index].yesCount++;
      }
    }
    voters[msg.sender].voted = true;
  }

  function getWinningProposals()
    public
    view
    returns (uint[] memory winningProposals)
  {
    for (uint index = 0; index < electionProposals.length; index++) {
      if (
        electionProposals[index].yesCount > electionProposals[index].noCount
      ) {
        winningProposals[index] = 1;
      } else {
        winningProposals[index] = 0;
      }
    }
  }

  //AUDITING FUNCTIONS
  function getProposalCount(uint proposalNumber)
    public
    view
    returns (uint[2] memory totalCounts)
  {
    totalCounts[0] = electionProposals[proposalNumber].noCount;
    totalCounts[1] = electionProposals[proposalNumber].yesCount;

    return totalCounts;
  }

  function getVoterChoices(address voter)
    public
    view
    returns (uint[] memory finalChoices)
  {
    if (msg.sender != voter) revert();
    return voters[voter].choices;
  }

  function countRegisteredVoters() public view returns (uint) {
    return totalRegisteredVoters;
  }

  function getNumberOfProposals() public view returns (uint) {
    return electionProposals.length;
  }
}
