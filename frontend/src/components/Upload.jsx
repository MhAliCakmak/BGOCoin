import React, { useRef, useState } from "react";
import { useContractFunctions, useNFTFunctions } from "../hooks";
import { NFTStorage, File } from "nft.storage";
import axios from "axios";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { Buffer } from "buffer";
import { BeatLoader } from "react-spinners";
import { styles } from "../styles";
import { slideIn } from "../utils/motion";
import { logo } from "../assets";

const Upload = () => {
  const [haveMetamask,setHaveMetamask]=useState(false)
  
  if(window.ethereum){
    setHaveMetamask(true)
    const { mint, approveNFT } = useNFTFunctions();
  }
  const [wrongImageType, setWrongImageType] = useState(false);
  const [message, setMessage] = useState(null);
  const [url, setUrl] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageType, setImageType] = useState("");
  const [imageAsset, setImageAsset] = useState(null);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const onImageChange = (event) => {
    setMessage("Uploading Image ...");
    const { type, name } = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      const fileTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
      if (fileTypes.includes(type)) {
        
        setWrongImageType(false);
        setImageAsset(URL.createObjectURL(event.target.files[0]));
        setImageType(event.target.files[0].type);
        const nameF=type.replace("/",".")
        setImage(nameF);
        console.log(nameF)
      } else {
        setWrongImageType(true);
        setImageAsset(null);
        setImageType(null);
      }
    } else {
      setImageAsset(null);
      setImageType(null);
    }
  };

  const uploadImage = async () => {
    
    // Create instance to NFT.Storage
    const nftStorage = new NFTStorage({
      token: import.meta.env.VITE_APP_NFT_STORAGE_API,
    });
    const response = await axios.get(imageAsset, { responseType: "arraybuffer" });
    const data = Buffer.from(response.data);

    // Upload image to NFT.Storage
    const { ipnft } = await nftStorage.store({
      name: name,
      description: description,
      image: new File([data], image, { type: imageType }),
    });
    const url = `https://ipfs.io/ipfs/${ipnft}/metadata.json`;
    setMessage("Uploading Metadata ...");

    setUrl(url);
    setMessage("Image uploaded successfully");
    console.log(url)
    return url;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || description === "") {
      window.alert("Please provide a name and description");
      return;
    }
    setLoading(true);
    // Upload image to IPFS
    const url = await uploadImage();
    // Mint NFT
    setMessage("NFT minting ...")
    await mint(url);
    setMessage("NFT minted successfully")
    setLoading(false);
    setMessage("");
  };

  return (
    <div
      className={`xl:mt-12 pt-5 p-36  flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 mt-16 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>
          Convert Picture to NFT with a click
        </p>
        <h3 className={styles.sectionHeadText}> NFT</h3>

        <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="name"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Description</span>
            <input
              type="text"
              name="description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="description"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <button
            type="submit"
            className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
          >
            {loading ? "Converting..." : "Convert"}
          </button>
          {!loading && url && (
            <button className=" bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary">
              View&nbsp;
              <a href={url} target="_blank" rel="noreferrer">
                Metadata
              </a>
            </button>
          )}
        </form>
      </div>
      <div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 mt-16 p-8 rounded-2xl"
      >
        {wrongImageType && (
              <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">
                Please upload a valid image.
              </p>
            )}
           
        {!imageAsset ? (
          <label>
            <div className="flex flex-col items-center justify-center h-full">
              <div className="flex flex-col justify-center items-center">
                <p className="font-bold text-2xl">
                  <AiOutlineCloudUpload />
                </p>
                <p className="text-lg">Click to upload</p>
              </div>
              <p className="mt-32 text-gray-400">
                Use high-quality JPG, SVG ,PNG, GIF or TIFF less than 20 MB
              </p>
            </div>
            <input type="file" className="hidden" onChange={onImageChange} />
          </label>
        ) : loading ? (
          <div className="flex flex-col items-center content-center justify-center mx-auto ">
            
            <p className="text-white font-medium mt-4">{message}</p>
            <BeatLoader className=""
          color={'#123abc'} 
       
        />
          </div>
        ):(
          <div className="relative h-full">
            <img src={imageAsset} alt="pin" className="h-full" />
            <button
              type="button"
              className="absolute bottom-3 right-3 bg-black text-white text-xl rounded-full cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
              onClick={() => setImageAsset(null)}
            >
              <MdDelete />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
