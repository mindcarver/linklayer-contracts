import { Config } from '@ton/blueprint';

const apiKey = process.env.TON_API_KEY;
export const config: Config = {
    network: {
        endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
        type: 'testnet',
        version: 'v2',
        key: apiKey,
    },
};