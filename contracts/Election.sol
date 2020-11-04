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
    uint256 yesCount;
    uint256 noCount;
  }

  struct Voter {
    bool voted;
    // address token;
    address voterAddress;
    uint256[] choices;
  }

  //Custom
  Proposal[] public electionProposals;
  // address[] internal registeredAddressList;

  //MAPPING
  mapping(address => Voter) voters;

  //UINTS
  uint256 public totalRegisteredVoters;
  uint256 public totalVoted;

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
  constructor(uint256 _numOfProposals) public {
    electionOfficial = msg.sender;
    electionProposals.length = _numOfProposals;
    for (uint256 i = 0; i < _numOfProposals; i++) {
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
  function vote(uint256[] memory voterChoices)
    public
    isRegisteredVoter
    hasNotVoted
  {
    Voter storage sender = voters[msg.sender];
    for (uint256 index = 0; index < electionProposals.length; index++) {
      sender.choices[index] = voterChoices[index];
      if (sender.choices[index] == 0) {
        electionProposals[index].noCount++;
      } else if (sender.choices[index] == 1) {
        electionProposals[index].yesCount++;
      }
    }
    sender.voted = true;
  }

  function getWinningProposals()
    public
    view
    returns (uint256[] memory winningProposals)
  {
    for (uint256 index = 0; index < electionProposals.length; index++) {
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
  function getProposalCount(uint256 proposalNumber)
    public
    view
    returns (uint256[2] memory totalCounts)
  {
    totalCounts[0] = electionProposals[proposalNumber].noCount;
    totalCounts[1] = electionProposals[proposalNumber].yesCount;

    return totalCounts;
  }

  function getVoterChoices(address voter)
    public
    view
    returns (uint256[] memory finalChoices)
  {
    if (msg.sender != voter) revert();
    return voters[voter].choices;
  }

  function countRegisteredVoters() public view returns (uint256) {
    return totalRegisteredVoters;
  }

  function getNumberOfProposals() public view returns (uint256) {
    return electionProposals.length;
  }
}
