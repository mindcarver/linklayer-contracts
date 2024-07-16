import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type LinkLayerNftConfig = {};

export function linkLayerNftConfigToCell(config: LinkLayerNftConfig): Cell {
    return beginCell().endCell();
}

export class LinkLayerNft implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new LinkLayerNft(address);
    }

    static createFromConfig(config: LinkLayerNftConfig, code: Cell, workchain = 0) {
        const data = linkLayerNftConfigToCell(config);
        const init = { code, data };
        return new LinkLayerNft(contractAddress(workchain, init), init);
    }

    async getCollectionData(provider: ContractProvider) {
        const result = await provider.get('get_collection_data', []);
        let nextItemIndex = result.stack.readBigNumber();
        let contentRoot = result.stack.readCell();
        let owner = result.stack.readAddress();
    
        console.log('Collection info, from get_collection_data() method:')	
        console.log('Next item index:', nextItemIndex.toString());
        console.log('Content root cell:', contentRoot);
        console.log('Collection owner adress:', owner);
    
        return nextItemIndex;
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
