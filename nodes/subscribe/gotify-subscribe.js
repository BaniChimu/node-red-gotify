const WebSocket = require("ws");

module.exports = function (RED) {
  function RemoteServerNode(config) {
    RED.nodes.createNode(this, config);

    const configNode = RED.nodes.getNode(config.server);

    if (!configNode) {
      this.error(new Error(`Configuration node ${config.server} not found.`));
      return;
    }

    this.server = configNode.server;
    this.token = configNode.token;

    try {
      const ws = new WebSocket(this.server + "/stream", {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      ws.on("message", (data) => {
        const msg = JSON.parse(data);
        this.send(msg);
      });

      ws.on("error", (error) => {
        this.error(error);
      });
    } catch (error) {
      this.error(error);
    }
  }
  RED.nodes.registerType("gotify-subscribe", RemoteServerNode);
};
