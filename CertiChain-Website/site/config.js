// CertiChain runtime configuration. Edit this file to switch from DEMO mode to REAL blockchain mode.
// No rebuild needed: save the file and refresh the browser.
//
// DEMO MODE (default): leave contract and rpc empty.
// REAL MODE example (after `npm run chain` or `npm run deploy` on a machine with full dependencies):
//   contract: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
//   rpc: "http://127.0.0.1:8545", chainId: 1337, chainName: "CertiChain Local", deployBlock: 0,
//   explorer: "", siteUrl: "http://localhost:3000"
window.__CERTICHAIN_CONFIG__ = {
  contract: "",
  rpc: "",
  chainId: 0,
  chainName: "EVM Network",
  deployBlock: 0,
  explorer: "",
  siteUrl: "",
  gateway: "https://gateway.pinata.cloud/ipfs/"
};
