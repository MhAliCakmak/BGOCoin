import {ethers} from "ethers"
import { CONTRACT_ABI,CONTRACT_ADDRESS } from "../constants"

const useContractFunctions = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABIMARKETPLACE, signer);   
    const approve = async (tokenId, quantity) => {
        const approve = await contract.approve(CONTRACT_ADDRESS, tokenId, quantity);
        await approve.wait();
    }



    return {approve}
    
}

export default useContractFunctions
