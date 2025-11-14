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
          connectionType: serverConfig.connectionType || "http",
          server: serverConfig.server,
          socketPath: serverConfig.socketPath,
          token: serverConfig.token,
        };

        if (config.override) {
          requestData.message = config.message;
          requestData.title = config.title;
          requestData.priority = Math.round(config.priority) || 5;
          requestData.extras = config.extras || {};
        } else {
          requestData.message = msg.message || msg.payload || config.message;
          requestData.title = msg.title || msg.topic || config.title;
          requestData.priority = msg.priority || Math.round(config.priority) || 5;
          requestData.extras = msg.extras || config.extras || {};
        }

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

const http = require("http");
const https = require("https");

async function postToGotify({
  connectionType = "http",
  server,
  socketPath,
  token,
  message,
  title,
  priority,
  extras,
}) {
  try {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let url = "";
    if (connectionType === "socket" && socketPath) {
      // Use Unix socket
      url = `http://unix:/message`;
      axiosConfig.socketPath = socketPath;
      axiosConfig.baseURL = "http://unix/";
      axiosConfig.httpAgent = new http.Agent({ socketPath });
    } else {
      url = `${server}/message`;
      if (server.startsWith("https://")) {
        axiosConfig.httpsAgent = new https.Agent();
      } else {
        axiosConfig.httpAgent = new http.Agent();
      }
    }
    const response = await axios.post(
      url,
      {
        message: message || "",
        title: title || "",
        priority: priority || 5,
        extras: extras || {},
      },
      axiosConfig
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
