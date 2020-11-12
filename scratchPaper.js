const voterChoicesA = [
  [1, 0, 2],
  [2, 3, 1, 0],
];
const voterChoicesB = [
  [0, 1, 2],
  [1, 0, 2, 3],
];
const voterChoicesC = [
  [2, 1, 0],
  [0, 2, 1, 3],
];

let numOfVoters = 3;
let numOfCandidatesA = 3

/* 
each array represents a rank= [
  [
    [2, 0, 1],
    [1, 1, 1],
    [0, 2, 1],
  ],
  [
    [1, 1, 1, 0],
    [1, 0, 1, 1],
    [0, 2, 1, 0],
    [1, 0, 0, 2],
  ]
];


each array represents a candidate= [
  [
    [1, 1, 1],
    [1, 2, 0],
    [1, 0, 2],
  ],
  [
    [1, 1, 1, 0],
    [1, 0, 1, 1],
    [0, 2, 1, 0],
    [1, 0, 0, 2],
  ]
];
*/

let proposals = {
  0: [
  ],
  1: [
  ],
};
let vote = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    proposals[i].push(arr[i])
  }
};

let count = (proposalNum) => {
    let winner;
    let mostVotes;
    let voteCount = {}
    for (let i = 0; i < proposals[proposalNum].length; i++) {
        if (voteCount.hasOwnProperty(proposals[proposalNum][i][0])) {
            voteCount[proposals[proposalNum][i][0]]++;
            // if (voteCount[proposals[proposalNum][i][0]] ) {
            //     winner = 
            // }
        } else {
            voteCount[proposals[proposalNum][i][0]] = 1;
        }
    }
    return voteCount
};

vote(voterChoicesA);
vote(voterChoicesB);
vote(voterChoicesC);

console.log(count(0));
