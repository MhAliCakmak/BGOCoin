import React, { useRef, useState } from "react";
import { useContractFunctions, useNFTFunctions } from "../hooks";
import { NFTStorage, File } from "nft.storage";
import axios from 'axios';

import { Buffer } from 'buffer'
import Spinner from 'react-bootstrap/Spinner';
import { styles } from "../styles";
import { slideIn } from "../utils/motion";
import { logo } from "../assets";
const Hero = () => {
  const { mint, approveNFT } = useNFTFunctions();
  const contractFunctions = useContractFunctions();

  const [message, setMessage] = useState(null);
  const [nft, setNft] = useState(null);
  const [url,setUrl] = useState(null);
  
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image,setImage]=useState(null)
  
  const [loading, setLoading] = useState(false);
  const createImage = async () => {
    setMessage("Generating Image...")

    // You can replace this with different model API's
    const URL = `https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2`

    // Send the request
    const response = await axios({
      url: URL,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_HUGGING_FACE_API_KEY}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        inputs: description, options: { wait_for_model: true },
      }),
      responseType: 'arraybuffer',
    })}
  const uploadImage = async (imageData) => {
    setMessage("uploading Image ...")
    // Create instance to NFT.Storage
    const nftStorage = new NFTStorage({
      token: process.env.REACT_APP_NFT_STORAGE_API,
    });

    // Send request to store image
    const { ipnft } = await nftStorage.store({
      image: new File([imageData], "image.jpeg", { type: "image/jpeg" }),
      name: form.name,
    });
    const url=`https://ipfs.io/ipfs/${ipnft}/metadata.json`
    setUrl(url);
    setMessage("Image uploaded successfully")
    return url
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    
    setLoading(true);

    createImage()
  };

  

  return (
    <div
      className={`xl:mt-12 pt-5 p-36  flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 mt-16 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Convert AI NFT with a click</p>
        <h3 className={styles.sectionHeadText}> NFT</h3>

        <form
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              
              onChange={(e) => { setName(e.target.value) }}
              placeholder="name"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Description</span>
            <input
              type="text"
              name="description"
        
              onChange={(e) => { setDescription(e.target.value) }}
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
        </form>
      </div>
      <div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 mt-16 p-8 rounded-2xl"
      >
        {!loading && image ? (
            <img src={image} alt="AI generated image" />
          ) : loading ? (
            <div className="image__placeholder">
              <Spinner animation="border" />
              <p>{message}</p>
            </div>
          ) : (
            <>
              <img src={logo} alt="logo" />
            </>
          )}
      </div>
    </div>
  );
};

export default Hero;
