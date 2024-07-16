import { TonClient } from '@ton/ton';
import { Address } from '@ton/core';
import { LinkLayerNft } from '../wrappers/LinkLayerNft';

export const toncenter = new TonClient({
	endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
});

export const nftCollectionAddress = Address.parse('EQAooaGPZU8id66zFakUtF5Uvi7_0RbBgdRMfaKCzKcnJh9f');
//https://testnet.explorer.tonnft.tools/collection/EQAooaGPZU8id66zFakUtF5Uvi7_0RbBgdRMfaKCzKcnJh9f
export async function run() {
   const nft = LinkLayerNft.createFromAddress(nftCollectionAddress);
   const nftContract = toncenter.open(nft);

   await nftContract.getCollectionData()
}


