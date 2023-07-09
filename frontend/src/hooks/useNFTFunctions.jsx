import React from 'react'
import { NFT_ADDRESS,NFT_ABI } from "../constants"
import {ethers} from "ethers"


const useNFTFunctions = () => {
    if(!window.ethereum){
        console.log("Install Metamask");
        return ;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(NFT_ADDRESS,NFT_ABI, provider); 
    const mint = async ( quantity) => {
        const transaction = await contract.connect(signer).mint(quantity, { value: ethers.utils.parseUnits("0.01", "ether") })
        await transaction.wait();
    }
    const approve = async (tokenId, quantity) => {
        const approve = await contract.approve(CONTRACT_ADDRESS, tokenId, quantity);
        await approve.wait();
    }

    return {mint, approve}
}

export default useNFTFunctions