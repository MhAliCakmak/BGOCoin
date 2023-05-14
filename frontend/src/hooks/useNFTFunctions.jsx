import React from 'react'
import { NFT_ABI,NFT_ADDRESS } from "../constants"
import {ethers} from "ethers"

const useNFTFunctions = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(NFT_ABI,NFT_ADDRESS, signer); 
    const mint = async (tokenId, quantity) => {
        const mint = await contract.mint(tokenId, quantity);
        await mint.wait();
    }
    const approve = async (tokenId, quantity) => {
        const approve = await contract.approve(CONTRACT_ADDRESS, tokenId, quantity);
        await approve.wait();
    }

    return {mint, approve}
}

export default useNFTFunctions