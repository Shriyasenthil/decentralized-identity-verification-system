// contracts/Identity.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Identity {
    struct UserInfo {
        string name;
        uint256 dob;  // Date of birth or any other relevant information
        bool verified;
    }

    mapping(address => UserInfo) public users;

    event UserRegistered(address indexed user, string name, uint256 dob);
    event UserVerified(address indexed user);

    function registerUser(string memory _name, uint256 _dob) public {
        require(users[msg.sender].dob == 0, "User already registered");
        users[msg.sender] = UserInfo(_name, _dob, false);
        emit UserRegistered(msg.sender, _name, _dob);
    }

    function verifyUser(address _user) public {
        require(msg.sender == _user, "Only the user can verify themselves");
        users[_user].verified = true;
        emit UserVerified(_user);
    }
}
