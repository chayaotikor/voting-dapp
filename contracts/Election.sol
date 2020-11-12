pragma solidity >=0.4.22 <0.8.0;
// pragma experimental ABIEncoderV2;

contract Election {
  /* VARIABLES */

  //STRUCTS
  // struct RankedProposal {
  //   uint[][] votes;
  //   uint totalVotes;
  //   uint numOfOptions;
  //   uint proposalNumber;
  // }

  struct PluralityProposal {
    uint yesCount;
    uint noCount;
  }

  struct Voter {
    bool[2] voted;
    address voterAddress;
    bool[] pluralityChoices;
    uint[][] rankedChoices;
  }

  //Arrays
  PluralityProposal[] public pluralityProposals;
  bool[] winningPluralityProposals;

  // RankedProposal[] public rankedProposals;
  // uint[] winningRankedProposals;

  //MAPPING
  mapping(address => Voter) voters;

  //UINTS
  uint public totalRegisteredVoters;

  //ADDRESSES
  address public electionOfficial;

  /* MODIFIERS */
  modifier onlyOfficial() {
    require(
      msg.sender == electionOfficial,
      "You are not authorized to take this action."
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

  modifier hasNotVoted(uint voteType) {
    require(voters[msg.sender].voted[voteType] == false, "Voter has already voted.");
    _;
  }

  /* FUNCTIONS */
  //CONSTRUCTOR
  constructor(uint _numOfPlurality /* uint[] memory rankedOptionCount */) public {
    electionOfficial = msg.sender;

    pluralityProposals.length = _numOfPlurality;
    winningPluralityProposals.length = _numOfPlurality;

    // rankedProposals.length = rankedOptionCount.length;
    // winningRankedProposals.length = rankedOptionCount.length;

    for (uint i = 0; i < _numOfPlurality; i++) {
      pluralityProposals[i].yesCount = 0;
      pluralityProposals[i].noCount = 0;
    }

    // for(uint j = 0; j < rankedOptionCount.length; j++){
    //   rankedProposals[j].numOfOptions = rankedOptionCount[j];
    //   rankedProposals[j].totalVotes = 0;
    // }
  }

  //ELECTION SETUP FUNCTIONS
  function register(address registeringVoter) public onlyOfficial {
    //Check if the voter is already registered based on their address
    if (voters[registeringVoter].voterAddress != address(0)) revert("Voter is already registered.");

    voters[registeringVoter].voterAddress = registeringVoter;
    voters[registeringVoter].voted[0] = false;
    // voters[registeringVoter].voted[1] = false;
    voters[registeringVoter].pluralityChoices.length = pluralityProposals.length;
    // voters[registeringVoter].rankedChoices.length = rankedProposals.length;
    totalRegisteredVoters++;
  }

  //VOTING FUNCTIONS
  function pluralityVote(bool[] memory pluralityChoices)
    public
    isRegisteredVoter
    hasNotVoted(0)
  {
    voters[msg.sender].pluralityChoices = pluralityChoices;

    for (uint index = 0; index < pluralityChoices.length; index++) {
      if (pluralityChoices[index] == false) {
        pluralityProposals[index].noCount++;
      } else if (pluralityChoices[index] == true) {
        pluralityProposals[index].yesCount++;
      }
    }
    voters[msg.sender].voted[0] = true;
  }

  // function rankedVote(uint[][] memory rankedChoices) public     
  // isRegisteredVoter
  // hasNotVoted(1)
  // {
  //   voters[msg.sender].rankedChoices = rankedChoices;
  //   for(uint i = 0; i < rankedProposals.length; i++){
  //     rankedProposals[i].votes.push(rankedChoices[i]);
  //   }
  //   voters[msg.sender].voted[1] = true;
  // }

  function countPluralityProposals()
    public
  {
    for (uint index = 0; index < pluralityProposals.length; index++) {
      if (
        pluralityProposals[index].yesCount > pluralityProposals[index].noCount
      ) {
        winningPluralityProposals[index] = true;
      } else {
        winningPluralityProposals[index] = false;
      }
    }
  }
  // function countRankedProposals()
  //   public
  // {

  // }

  //AUDITING FUNCTIONS

  function countRegisteredVoters() public view returns (uint) {
    return totalRegisteredVoters;
  }
    function getPluralityChoices(address voter)
    public
    view
    returns (bool[] memory)
  {
    if (msg.sender != voter) revert("You are not authorized to view this information.");
    return voters[voter].pluralityChoices;
  }
  //   function getRankedChoices(address voter)
  //   public
  //   view
  //   returns (uint[][] memory)
  // {
  //   if (msg.sender != voter) revert("You are not authorized to view this information.");
  //   return voters[voter].rankedChoices;
  // }

  function getTotalProposals() public view returns (uint) {
    uint count = pluralityProposals.length; /* + rankedProposals.length; */
    return count;
  }
  function getWinningPluralityProposals() public view returns(bool[] memory){
    return winningPluralityProposals;
  }
  // function getWinningRankedProposals() public view returns(uint[] memory){
  //   return winningRankedProposals;
  // }

  function getProposalCount(uint proposalNumber)
    public
    view
    returns (uint[2] memory totalCounts)
  {
    totalCounts[0] = pluralityProposals[proposalNumber].noCount;
    totalCounts[1] = pluralityProposals[proposalNumber].yesCount;

    return totalCounts;
  }


}
