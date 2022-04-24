pragma solidity ^0.5.16;

contract CryptoWall {
    string public name = "Crypto Wall";

    // Storage Post
    uint256 public postCount = 0;
    mapping(uint256 => Post) public posts;

    struct Post {
        uint256 id;
        string imageHash;
        string description;
        uint256 tipAmount;
        address payable author;
        uint256 timestamp;
    }

    event PostCreated(
        uint256 id,
        string imageHash,
        string description,
        uint256 tipAmount,
        address payable author,
        uint256 timestamp
    );

    event PostTipped(
        uint256 id,
        string imageHash,
        string description,
        uint256 tipAmount,
        address payable author,
        uint256 timestamp
    );

    // Create Posts
    function createPost(string memory _imgHash, string memory _desc) public {
        // Make sure image hash exist
        require(bytes(_imgHash).length > 0);

        // Make sure image desc exist
        require(bytes(_desc).length > 0);

        // Make sure image desc exist
        require(msg.sender != address(0x0));

        // Increment Count
        postCount++;

        uint256 timestamp = now;

        // Add Image to contract
        posts[postCount] = Post(
            postCount,
            _imgHash,
            _desc,
            0,
            msg.sender,
            timestamp
        );

        // Trigger an event
        emit PostCreated(postCount, _imgHash, _desc, 0, msg.sender, timestamp);
    }

    // Tip Posts
    function tipPostOwner(uint256 _id) public payable {
        // Make sure ID is valid
        require(_id > 0 && _id <= postCount);
        // Fetch Image
        Post memory _post = posts[_id];
        // Fetch Author
        address payable _author = _post.author;

        // Tranfer crypto to Author
        address(_author).transfer(msg.value);

        // Update tip amount
        _post.tipAmount = _post.tipAmount + msg.value;

        // Update Post
        posts[_id] = _post;

        // Trigger an event
        emit PostTipped(
            _id,
            _post.imageHash,
            _post.description,
            _post.tipAmount,
            _author,
            _post.timestamp
        );
    }
}
