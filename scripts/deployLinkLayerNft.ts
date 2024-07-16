import { toNano } from '@ton/core';
import { LinkLayerNft } from '../wrappers/LinkLayerNft';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const linkLayerNft = provider.open(LinkLayerNft.createFromConfig({}, await compile('LinkLayerNft')));

    await linkLayerNft.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(linkLayerNft.address);

    // run methods on `linkLayerNft`
}
