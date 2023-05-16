import React, { useRef, useState } from "react";
import { useContractFunctions, useNFTFunctions } from "../hooks";
import { NFTStorage, File } from "nft.storage";

import { styles } from "../styles";
import { slideIn } from "../utils/motion";
import { logo } from "../assets";
const Hero = () => {
  const { mint, approveNFT } = useNFTFunctions();
  const contractFunctions = useContractFunctions();

  const [message, setMessage] = useState(null);
  const [nft, setNft] = useState(null);
  const [url,setUrl] = useState(null);
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    photo: "",
    description: "",
  });
  
  const [loading, setLoading] = useState(false);
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
  const handleSubmit = () => {
    e.preventDefault();
    

    if (form.name === "" || form.photo === "") {
      window.alert("Please provide a name and description");
      return;
    }
    setLoading(true);
    uploadImage(form.photo);
    mint(nft);
    approveNFT(nft);
    setLoading(false);
  };

  return (
    <div
      className={`xl:mt-12 pt-5 p-36  flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 mt-16 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Convert NFT with a click</p>
        <h3 className={styles.sectionHeadText}> NFT</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="name"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Description</span>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
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
        <img src={logo} />
      </div>
    </div>
  );
};

export default Hero;
