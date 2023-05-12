import {ethers} from "ethers";
import {useDispatch} from "react-redux";
import {setAccount} from "../store/slicers/account";

export const useSetAccount = () => {
    const dispatch = useDispatch();
    const connectAccount = async () =>{
        if(window.ethereum){
            try{
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
               
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                  });
                  const account = accounts[0];
                console.log(account)
                dispatch(setAccount(account));
            }catch(err){
                console.log(err);
            }
        }else{
            console.log("Install Metamask");
        }
        
    }
    
    return connectAccount;
}