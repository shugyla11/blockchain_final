module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default)
      port: 7545,        // Port on which Ganache is running
      network_id: "5777", // Match the network ID shown in your Ganache UI
      gas: 6721975,       // Gas limit (make sure it's sufficient for your deployment)
    },
  },
  compilers: {
    solc: {
      version: "0.8.28", // Ensure this matches your contract version
    },
  },
};
