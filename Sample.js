const axios = require('axios');
const fs = require('fs');

module.exports = async function ({ dstryr, event }) {
  try {
    var msg1 = {
      body: "How to Add Custom Commands"
    /*
    body: para sa message
    
    attachment: para sa image
    */
    };
    //para masend ang nasa body
    dstryr.sendMessage(msg1, event.threadID);

  } catch (error) {
    console.error(error);
    dstryr.sendMessage('An error occurred while processing your request.', event.threadID);
  }
};
