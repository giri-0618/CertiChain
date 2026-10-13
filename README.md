# 🔐 CertiChain – Blockchain-Based Certificate Verification System

CertiChain is a digital certificate verification platform designed to improve the authenticity, integrity, and trustworthiness of certificates. It enables issuers to issue certificates and allows anyone to verify certificate details and status through a unique verification link.

## ✨ Features

- **Certificate Issuance:** Issue digital certificates through the issuer interface.
- **Unique Verification:** Verify certificates using a unique certificate ID or link.
- **QR-Based Verification:** Support convenient certificate verification through QR codes, where configured.
- **Public Verification:** Allow users to check certificate details without accessing the issuer dashboard.
- **Revocation Management:** Mark certificates as revoked and check their current status.
- **Integrity Checking:** Support verification of certificate data integrity.
- **Wallet Integration:** Demo issuer wallet functionality for testing the issuance workflow.
- **Demo Mode:** Explore sample certificates and simulated ledger functionality.
- **Blockchain-Ready Configuration:** Configure the contract address, RPC URL, and chain ID for a compatible blockchain deployment.

## 🛠️ Tech Stack

- HTML5
- CSS3
- JavaScript
- Node.js
- Blockchain / EVM integration (when configured)

## 📂 Project Structure

```text
CertiChain/
├── server.mjs
├── start.bat
├── README.txt
└── site/
    ├── index.html
    ├── about.html
    ├── dashboard.html
    ├── issue.html
    ├── verify.html
    ├── config.js
    ├── certificate/
    ├── verify/
    └── _next/
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or newer
- Git (optional, for cloning the repository)

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/CertiChain.git
cd CertiChain
```

Replace `YOUR-USERNAME` with the GitHub account that owns the repository.

### 2. Start the Website

Run the following command from the project root:

```bash
node server.mjs
```

Alternatively, on Windows, double-click `start.bat`.

### 3. Open in Your Browser

Visit:

```text
http://localhost:3000
```

Keep the terminal open while using the website. Press `Ctrl+C` to stop the server.

**Note:** This prebuilt version does not require `npm install` to start the local server.

## 🧪 Testing the Demo

1. Open the website.
2. Navigate to the verification page.
3. Test the available sample certificates.
4. Try the demo issuer wallet.
5. Issue a sample certificate and check its verification status.
6. Test certificate revocation if supported by the current demo configuration.

## ⛓️ Blockchain Configuration

To connect a compatible blockchain deployment, update `site/config.js` with the appropriate:

- Smart contract address
- RPC endpoint URL
- Chain ID

A deployed smart contract and compatible configuration are required for actual on-chain operations. Demo mode uses a simulated ledger and should not be considered proof of blockchain verification.

## 🔒 Security Notes

- Never commit private keys, seed phrases, passwords, or API tokens.
- Keep secret credentials in environment variables or an appropriate secrets manager.
- Validate certificate inputs and issuer permissions.
- Verify certificate integrity and issuer authenticity before trusting a certificate.
- Test revocation and unauthorized-access scenarios before production deployment.

## 🎯 Use Cases

- Educational institutions
- Online certification providers
- Professional training organizations
- Employers verifying candidate credentials
- Organizations issuing digital credentials

## 🔮 Future Enhancements

- Production smart contract deployment
- On-chain certificate records and revocation
- Cryptographic signatures for issuer authentication
- Automated QR-code generation and scanning
- IPFS-based certificate metadata storage
- Multi-institution issuer management
- Improved mobile-responsive verification

## 🤝 Contributing

Contributions, bug reports, and feature suggestions are welcome. Fork the repository, create a feature branch, and submit a pull request.

## 📄 License

Choose and add an appropriate open-source license before distributing this project for reuse.

---

**CertiChain**  
*Verify Trust. Protect Authenticity.* 🔐

