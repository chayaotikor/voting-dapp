pragma solidity >=0.4.22 <0.8.0;

contract Election {
   /* VARIABLES */
   //STRUCTS
    // struct Proposal {
    //     uint256[] options;
    //     uint256 proposalNumber;
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
        uint[] choices;
    }

   //UINTS
    // uint public totalTokens;

   //ARRAYS
    Proposal[] electionProposals;
    // address[] internal registeredAddressList;

   //MAPPING
    mapping(address => Voter) registeredVoters;

   //ADDRESSES
    address public electionOfficial;

   /* MODIFIERS */
    modifier onlyOfficial () {
        require(msg.sender == electionOfficial);
        _;
    }

    modifier isRegisteredVoter (address sender){
        require(registeredVoters[sender].voterAddress != address(0));
        _;
    }

    /* FUNCTIONS */
    //CONSTRUCTOR
    constructor(uint256 _numOfProposals) public {
        electionOfficial = msg.sender;
        electionProposals.length = _numOfProposals;
    }
    function register(address voter) public onlyOfficial isRegisteredVoter(voter) {
        //Check if the voter is already registered based on their address
        // if(registeredVoters[voter].voterAddress != address(0)) revert();
        
        registeredVoters[voter].voterAddress = voter;
        registeredVoters[voter].voted = false;
    }

    
    function vote(uint256[] memory voterChoices) public isRegisteredVoter(msg.sender) {
        Voter storage sender = registeredVoters[msg.sender];
        if(sender.voted) revert();
        for(uint256 proposalNum = 0; proposalNum < electionProposals.length; proposalNum++){
        sender.choices[proposalNum] = voterChoices[proposalNum];
        if(voterChoices[proposalNum] == 0){
            electionProposals[proposalNum].noCount++;
        } else if(voterChoices[proposalNum] == 1){
            electionProposals[proposalNum].yesCount++;
        }
        }
        sender.voted = true;
    }

    function setWinningProposals() public view returns(uint256[] memory winningProposals){
        for(uint256 proposalNum = 0; proposalNum < electionProposals.length; proposalNum++){
            if(electionProposals[proposalNum].yesCount > electionProposals[proposalNum].noCount ){
                winningProposals[proposalNum] = 1;
            } else {
                winningProposals[proposalNum] = 0;
            }
        }
    }

    function getCount(uint256 proposalNumber) public view returns (uint256[2] memory totalCounts){
       totalCounts[0] = electionProposals[proposalNumber].yesCount;
       totalCounts[1] = electionProposals[proposalNumber].noCount;

       return totalCounts;
    }
}