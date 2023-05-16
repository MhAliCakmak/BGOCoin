import React from 'react'
import { NFT_ADDRESS,NFT_ABI } from "../constants"
import {ethers} from "ethers"


const useNFTFunctions = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(NFT_ADDRESS,NFT_ABI, provider); 
    const mint = async ( quantity) => {
        const transaction = await nft.connect(signer).mint(quantity, { value: ethers.utils.parseUnits("1", "ether") })
        await transaction.wait();
    }
    const approve = async (tokenId, quantity) => {
        const approve = await contract.approve(CONTRACT_ADDRESS, tokenId, quantity);
        await approve.wait();
    }

    return {mint, approve}
}

export default useNFTFunctions