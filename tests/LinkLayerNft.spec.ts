import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { LinkLayerNft } from '../wrappers/LinkLayerNft';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('LinkLayerNft', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('LinkLayerNft');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let linkLayerNft: SandboxContract<LinkLayerNft>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        linkLayerNft = blockchain.openContract(LinkLayerNft.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await linkLayerNft.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: linkLayerNft.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and linkLayerNft are ready to use
    });
});
