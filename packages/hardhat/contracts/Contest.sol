// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Contest is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

//
    event Voted(
        address indexed voter,
        uint256 indexed tokenId,
        uint256 tokenIdVotes
    );

    // token ID => No. of Votes
    mapping(uint256 => uint256) public voteCount;

    mapping(address => bool) public hasSubmitted;
    
    mapping(address => bool) public hasVoted;

    address worldIdContract;
    bool public isSubmissionOpen;
    bool public isVotingOpen;

    constructor() ERC721("ContestSubmission", "COS") {
        isSubmissionOpen = true;
        isVotingOpen = true;
    }

    modifier isSenderWordIdContract () {
        require(msg.sender == worldIdContract, "You are not Authorised");
        _;
    }

    modifier submissionOpen () {
        require(isSubmissionOpen, "Submission is Closed");
        _;
    }

    modifier votingOpen () {
        require(isVotingOpen, "Voting is Closed");
        _;
    }

    // Submission
    function submitItem(string memory tokenURI)
        public
        returns (uint256)
    {   
        // limit submissions to 1 even if the submission was transferred
        // here we allow the owner unlimited submissions
        require(hasSubmitted[msg.sender] == false || msg.sender == owner(),
            "Only one submission allowed");
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        hasSubmitted[msg.sender] = true;
        _tokenIds.increment();
        return newItemId;
    }

    // Owner can burn a submission for inappropriate or invalid content
    function burnItem(uint256 tokenId) public onlyOwner {
        _burn(tokenId);
        delete voteCount[tokenId];
    }

    function totalSubmissions() public view returns (uint256) {
        return _tokenIds.current();
    }


    function vote(uint256 tokenId, address voter) external votingOpen isSenderWordIdContract {
        require(hasSubmitted[msg.sender] == false, "You've already voted before");
        hasSubmitted[voter] = true;
        voteCount[tokenId] += 1;
        emit Voted(voter, tokenId, voteCount[tokenId]);
    }

    function winningSubmission() public view returns (uint256 winningSubmission_) {
        uint256 winningVoteCount = 0;
        for (uint256 s = 0; s < _tokenIds.current(); s++) {
            if (voteCount[s] > winningVoteCount) {
                winningVoteCount = voteCount[s];
                winningSubmission_ = s;
            }
        }
        return winningSubmission_;
    }

    function setIsSubmissionOpen(bool _isSubmissionOpen) public onlyOwner {
        require(_isSubmissionOpen != isSubmissionOpen, "No changes to make");
        isSubmissionOpen = _isSubmissionOpen;
    }

    function setIsVotingOpen(bool _isVotingOpen) public onlyOwner {
        require(_isVotingOpen != isVotingOpen, "No changes to make");
        isVotingOpen = _isVotingOpen;
    }

    function setWorldIdContract (address _worldIdContract) public onlyOwner {
        worldIdContract = _worldIdContract;
    }
}