pragma solidity >=0.4.22 <0.8.0;

contract Election {
   /* VARIABLES */
   //STRUCTS
    // For use when ranked choice allowed
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
        uint256[] choices;
    }

   //UINTS
    // uint public totalTokens;

   //ARRAYS
    Proposal[] public electionProposals;
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

    modifier isRegisteredVoter (){
        require(registeredVoters[msg.sender].voterAddress != address(0));
        _;
    }

    /* FUNCTIONS */
    //CONSTRUCTOR
    constructor(uint256 _numOfProposals) public {
        electionOfficial = msg.sender;
        electionProposals.length = _numOfProposals;
    }

    //ELECTION SETUP FUNCTIONS
    function register(address voter) public onlyOfficial {
        //Check if the voter is already registered based on their address
        if(registeredVoters[voter].voterAddress != address(0)) revert();
        
        registeredVoters[voter].voterAddress = voter;
        registeredVoters[voter].voted = false;
    }

    //VOTING FUNCTIONS
    function vote(uint256[] memory voterChoices) public isRegisteredVoter {
        Voter storage sender = registeredVoters[msg.sender];
        if(sender.voted) revert();
        for(uint256 index = 0; index < electionProposals.length; index++){
        sender.choices[index] = voterChoices[index];
        if(voterChoices[index] == 0){
            electionProposals[index].noCount++;
        } else if(voterChoices[index] == 1){
            electionProposals[index].yesCount++;
        }
        }
        sender.voted = true;
    }

    function getWinningProposals() public view returns(uint256[] memory winningProposals){
        for(uint256 index = 0; index < electionProposals.length; index++){
            if(electionProposals[index].yesCount > electionProposals[index].noCount ){
                winningProposals[index] = 1;
            } else {
                winningProposals[index] = 0;
            }
        }
    }

    //AUDITING FUNCTIONS
    function getProposalCount(uint256 proposalNumber) public view returns (uint256[2] memory totalCounts){
       totalCounts[0] = electionProposals[proposalNumber].noCount;
       totalCounts[1] = electionProposals[proposalNumber].yesCount;

       return totalCounts;
    }

    function getVoterChoices(address voter) public view returns (uint[] memory finalChoices){
        if(msg.sender != voter) revert();
        return registeredVoters[voter].choices;
    }
}