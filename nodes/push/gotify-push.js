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

        const requestData = {
          message: config.override
            ? config.message || msg.payload
            : msg.payload,
          title: config.override ? config.title || msg.title : msg.title,
          priority: config.override
            ? config.priority || msg.priority
            : msg.priority,
          extras: config.override ? config.extras || msg.extras : msg.extras,
          server: serverConfig.server,
          token: serverConfig.token,
        };

        const response = await postToGotify(requestData);
        msg.gotify = response;
        node.send(msg);
      } catch (error) {
        node.error(error, msg);
      }
    });
  }

  RED.nodes.registerType("push", PushToGotify);
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
        message,
        title,
        priority: Number(priority),
        extras,
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
