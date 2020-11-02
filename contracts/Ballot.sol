pragma solidity >=0.4.22 <0.8.0;

contract Election {
   /* VARIABLES */
   //STRUCTS
    struct Proposal {
        uint256[] options;
        uint256 proposalNumber;
        bytes32 proposalType;
    }

    struct Voter {
        bool voted;
        address token;
        address voterAddress;
        uint256[] choices;
    }

   //UINTS
    uint public totalTokens;
    uint public totalProposals;

   //MAPPING
    mapping(address => Voter) registeredVoters;

   //Address
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
    constructor() public {
        electionOfficial = msg.sender;
    }
    function register(address voter) public onlyOfficial {
        //Check if the voter is already registered based on their address
        if(registeredVoters[voter].voterAddress != address(0)) revert();

        registeredVoters[voter].voted = false;
    }
    
    function vote(uint256[] memory voterChoices) public isRegisteredVoter {
        Voter storage sender = registeredVoters[msg.sender];
        if(sender.voted) revert();
        for(uint256 proposalNum; proposalNum < voterChoices.length; proposalNum++){
        sender.choices[proposalNum] = voterChoices[proposalNum];
        }
        sender.voted = true;
    }

}