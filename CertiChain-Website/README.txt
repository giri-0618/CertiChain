CertiChain website (prebuilt, no npm install needed)

RUN
  1. Install Node.js 18 or newer if you don't have it (https://nodejs.org).
  2. Double-click start.bat   (or in a terminal inside this folder:  node server.mjs)
  3. Open http://localhost:3000  (start.bat opens it for you)
  Stop with Ctrl+C. Do NOT open site\index.html by double-clicking; it must be served by server.mjs.

WHAT YOU GET
  DEMO MODE (amber banner): simulated ledger in your browser. Try Verify -> the 4 sample certificates,
  then Connect Wallet -> "Demo issuer wallet" to issue and revoke.

REAL BLOCKCHAIN MODE
  Edit site\config.js (contract address, RPC URL, chain ID), save, refresh the browser. No rebuild needed.
  Deploy the contract with the full source project (npm run deploy) to get those values.

OPTIONAL IPFS
  Create a file named .env next to server.mjs containing:   PINATA_JWT=your_token
  Without it, metadata is embedded in the transaction instead (the UI says which was used).

CHANGE PORT
  set PORT=8080 && node server.mjs
