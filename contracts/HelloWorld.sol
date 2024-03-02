// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract HelloWorld{

    //Event emitted when update function is called
    event UpdatedMessage(string oldStr, string newStr);

    //Declares a state variable 'message' of type string 
    string public message;

    //constructor  that sets initial value of the 'message' variable
    //It is a special  function in Solidity and will be executed as soon as the contract is deployed on blockchain.
    constructor(string memory initMessage){
        message = initMessage;
    }

    function update(string memory newMessage) public{
        string memory oldMsg  = message;
        message = newMessage;
        
        emit UpdatedMessage(oldMsg,newMessage);
    }

}