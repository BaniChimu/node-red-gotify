const axios = require("axios");

module.exports = function (RED) {
  function PushToGotify(config) {
    RED.nodes.createNode(this, config);
    const node = this;

    node.on("input", async (msg) => {
      try {
        const serverConfig = RED.nodes.getNode(config.server);
        if (!serverConfig) {
          node.error(
            new Error(
              `Configuration node ${config.server} not found. Please add it to your flow.`
            )
          );
          return;
        }

        requestData = {
          server: serverConfig.server,
          token: serverConfig.token,
        };

        if (!config.override) {
          requestData.message = config.message;
          requestData.title = config.title;
          requestData.priority = Math.round(config.priority) || 5;
          requestData.extras = config.extras || {};
        } else {
          requestData.message = msg.message || msg.payload;
          requestData.title = msg.title || msg.payload;
          requestData.priority = msg.priority || 5;
          requestData.extras = msg.extras || {};
        }

        console.log(requestData);

        if (!requestData.message || !requestData.title) {
          node.error(
            new Error(
              "Message and title must be defined. Please check your input."
            )
          );
          return;
        }

        const response = await postToGotify(requestData);
        msg.gotify = response;
        node.send(msg);
      } catch (error) {
        node.error(error, msg);
      }
    });
  }

  RED.nodes.registerType("gotify-push", PushToGotify);
};

async function postToGotify({
  server,
  token,
  message,
  title,
  priority,
  extras,
}) {
  try {
    const response = await axios.post(
      `${server}/message`,
      {
        message: message || "",
        title: title || "",
        priority: priority || 5,
        extras: extras || {},
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
