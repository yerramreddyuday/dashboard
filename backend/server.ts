// server/server.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// import { compile } from "./scripts/utils";
// import { deployDOJContractHandler } from "./scripts/dojima/deployContract";
import { deployETHContractHandler } from "./scripts/ethereum/deployContract";
import { DeployableChainsData, DeployContract } from './scripts/deploy';
import { DeployChainScript } from './scripts';

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.VITE_APP_BACKEND_PORT;

// // Example: Allow requests only from 'http://localhost:3001'
// const corsOptions = {
//     origin: 'http://localhost:3001',
//     optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
//   };
  
//   app.use(cors(corsOptions));

// Enable CORS for all routes
app.use(cors());

app.use(express.json()); // Parse JSON in the request body

app.options('*', cors()); // Enable preflight for all routes

// app.get('/', async (req, res) => {
//   // const {contract, contractName} = req.query;
//   // const result = await compile(contract as string, contractName as string);
//   console.log("Url : ", process.env.VITE_APP_DOJIMA_API_URL);
//   console.log("Phrase : ", process.env.VITE_APP_TEST_ACCOUNT_PHRASE);
//   res.send(process.env.VITE_APP_DOJIMA_API_URL);
//   // res.send(result);
// });

// // app.get('/compile', (req, res) => {
// //   const { contractName, code } = req.query;
// //   const result = compile(code as string, contractName as string);
// //   res.send(result);
// // });

// app.post('/compile', async (req, res) => {
//   const { data } = req.body;
//   console.log("Data : ", data)
//   const params = {
//     contractCode: data.contractCode,
//     contractName: data.contractName,
//     args: data.args
//   }
//   const result = await deployETHContractHandler(params);
//   res.send(result);
// });

// // New POST endpoint to deploy an EVM contract
// app.post('/deployEVMContract', async (req, res) => {
//   const { contractCode, contractName, args } = req.body;
//   console.log("Code : ", contractCode);
//   console.log("Name : ", contractName);
//   console.log("Args : ", args);
//   // Your logic to deploy the EVM contract goes here...
//   // // For now, just echoing back the received parameters.
//   // res.json({ contractCode, contractName, args });
//   const result = await deployETHContractHandler({
//     contractCode,
//     contractName,
//     args
//   });
//   res.send(result);
//   // const result = await deployDOJContractHandler({
//   //   contractCode,
//   //   contractName,
//   //   args
//   // });
//   // res.send(result);
// });

app.get("/", (req, res) => {
  res.send(process.env.VITE_APP_MESSAGE);
});

app.post('/deploy', async (req, res) => {
  const { data } = req.body;
  const result = await DeployChainScript(data as Array<DeployableChainsData>);
  res.send(result);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
