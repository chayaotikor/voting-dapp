# Voting Smart Contract
## Smart contract written in Solidity based on an election with plurality voting on proposals.


GraphQL Interactions Available:
```
# MUTATIONS

# mutation {
#   register(address:"")
# }

# mutation {
#   vote(choices:[], sender: "")
# }

# mutation{
#   countVotes{
#     totalVotes,
#     yesCount,
#     noCount
#   }
# }


# QUERIES

# {
#   electionOfficial
# }


# {
#   totalRegisteredVoters
# }


# {
#   totalProposals
# }

# {
#   voterChoices(address:"", sender: "" )
# }



# {
#   winningProposals
# }


# {
#   proposalVoteCount(proposalNumber: 0){
#     totalVotes,
#     yesCount,
#     noCount
#   }
# }
```
