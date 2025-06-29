# <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nawah NFT Test</title>
  <script src="https://cdn.jsdelivr.net/npm/web3@1.10.0/dist/web3.min.js"></script>
  <style>
    body {
      font-family: Arial, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 40px;
      background-color: #f2f2f2;
    }
    .container {
      background: white;
      padding: 20px;
      border-radius: 15px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      width: 400px;
      text-align: center;
    }
    button {
      padding: 10px 20px;
      border: none;
      border-radius: 10px;
      background-color: #6c5ce7;
      color: white;
      font-size: 16px;
      cursor: pointer;
    }
    input {
      width: 100%;
      margin: 10px 0;
      padding: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Nawah NFT Testnet Mint</h2>
    <button onclick="connectWallet()">🔗 Connect MetaMask</button>
    <br/><br/>
    <input type="text" id="tokenURI" placeholder="Enter NFT Image URL (IPFS or HTTPS)" />
    <button onclick="mintNFT()">🖼️ Mint NFT</button>
    <p id="status"></p>
  </div>

  <script>
    let web3;
    let contract;
    const contractAddress = "PASTE_YOUR_CONTRACT_ADDRESS_HERE";
    const contractABI = [
      {
        "inputs": [
          { "internalType": "address", "name": "recipient", "type": "address" },
          { "internalType": "string", "name": "tokenURI", "type": "string" }
        ],
        "name": "mintNFT",
        "outputs": [
          { "internalType": "uint256", "name": "", "type": "uint256" }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];

    async function connectWallet() {
      if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          contract = new web3.eth.Contract(contractABI, contractAddress);
          document.getElementById('status').innerText = "✅ Wallet connected.";
        } catch (error) {
          document.getElementById('status').innerText = "❌ Wallet connection failed.";
        }
      } else {
        alert("Please install MetaMask.");
      }
    }

    async function mintNFT() {
      const accounts = await web3.eth.getAccounts();
      const tokenURI = document.getElementById("tokenURI").value;
      if (!tokenURI) {
        alert("Please enter a Token URI.");
        return;
      }
      try {
        const receipt = await contract.methods.mintNFT(accounts[0], tokenURI).send({ from: accounts[0] });
        document.getElementById('status').innerText = "✅ NFT Minted! Tx Hash: " + receipt.transactionHash;
      } catch (err) {
        document.getElementById('status').innerText = "❌ Mint failed.";
      }
    }
  </script>
</body>
</html>
