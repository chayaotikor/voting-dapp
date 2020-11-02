pragma solidity >=0.4.22 <0.8.0;

contract Ballot {
   /* VARIABLES */
   //STRUCTS
    struct Proposal {
        uint[] options;
        uint proposalNumber;
        bytes32 proposalType;
    }

    struct Voter {
        bool voted;
        address token;
        address voterAddress;
        mapping(uint => Proposal) choices;
    }

   //UINTS
    uint public totalTokens;
    uint public totalProposals;

   //MAPPING
    mapping(address => Voter) validVoters;

   //Address
    address public electionOfficial;

   /* MODIFIERS */
    modifier onlyOfficial () {
        require(msg.sender == electionOfficial);
        _;
    }

    /* FUNCTIONS */
    //CONSTRUCTOR
    constructor() public {
        electionOfficial = msg.sender;
    }
    function register(address voter) public onlyOfficial {
        //Check if the voter is already registered based on their address
        if(validVoters[voter].voterAddress != address(0)) revert();

        validVoters[voter].voted = false;
    }

}