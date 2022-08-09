// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IERC20Votes {
    function getPastVotes(address, uint256) external view returns (uint256);
}

contract Contest is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event Voted(
        address indexed voter,
        uint256 indexed tokenId,
        uint256 weight,
        uint256 tokenIdVotes
    );

    // token ID => No. of Votes
    mapping(uint256 => uint256) public voteCount;

    mapping(address => bool) public hasSubmitted;
    mapping(address => uint256) public spentVotePower;

    IERC20Votes public voteToken;
    uint256 public referenceBlock;
    bool public isVotingOpen;

    constructor(address _voteToken) ERC721("ContestSubmission", "COS") {
        voteToken = IERC20Votes(_voteToken);
        referenceBlock = block.number;
        isVotingOpen = true;
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
        // limit submissions even if the token has transferred
        require(hasSubmitted[msg.sender] == false, "Only one submission allowed");
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


    function vote(uint256 tokenId, uint256 amount) external votingOpen {
        uint256 votingPowerAvailable = votingPower();
        require(votingPowerAvailable >= amount, "Has not enough voting power");
        spentVotePower[msg.sender] += amount;
        voteCount[tokenId] += amount;
        emit Voted(msg.sender, tokenId, amount, voteCount[tokenId]);
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

    function votingPower() public view returns (uint256 votingPower_) {
        votingPower_ =
            voteToken.getPastVotes(msg.sender, referenceBlock) -
            spentVotePower[msg.sender];
    }

    function setIsVotingOpen(bool _isVotingOpen) public onlyOwner {
        require(_isVotingOpen != isVotingOpen, "No changes to make");
        isVotingOpen = _isVotingOpen;
    }
}