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
    bool[] choices;
  }

  //Arrays
  Proposal[] public electionProposals;
  bool[] winningProposals;
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
    winningProposals.length = _numOfProposals;
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
    voters[registeringVoter].choices.length = electionProposals.length;
    totalRegisteredVoters++;
  }

  //VOTING FUNCTIONS
  function vote(bool[] memory voterChoices)
    public
    isRegisteredVoter
    hasNotVoted
  {
    voters[msg.sender].choices= voterChoices;
    for (uint index = 0; index < voterChoices.length; index++) {
      if (voterChoices[index] == false) {
        electionProposals[index].noCount++;
      } else if (voterChoices[index] == true) {
        electionProposals[index].yesCount++;
      }
    }
    voters[msg.sender].voted = true;
  }

  function countWinningProposals()
    public
  {
    for (uint index = 0; index < electionProposals.length; index++) {
      if (
        electionProposals[index].yesCount > electionProposals[index].noCount
      ) {
        winningProposals[index] = true;
      } else {
        winningProposals[index] = false;
      }
    }
  }

  //AUDITING FUNCTIONS

  function countRegisteredVoters() public view returns (uint) {
    return totalRegisteredVoters;
  }
    function getVoterChoices(address voter)
    public
    view
    returns (bool[] memory finalChoices)
  {
    if (msg.sender != voter) revert();
    return voters[voter].choices;
  }
  function getNumberOfProposals() public view returns (uint) {
    return electionProposals.length;
  }
  function getWinningProposals() public view returns(bool[] memory){
    return winningProposals;
  }

  function getProposalCount(uint proposalNumber)
    public
    view
    returns (uint[2] memory totalCounts)
  {
    totalCounts[0] = electionProposals[proposalNumber].noCount;
    totalCounts[1] = electionProposals[proposalNumber].yesCount;

    return totalCounts;
  }


}
