import React, { useRef, useState } from "react";
import { useContractFunctions, useNFTFunctions } from "../hooks";
import { NFTStorage, File } from "nft.storage";
import axios from "axios";

import { Buffer } from "buffer";
import { BeatLoader } from 'react-spinners'
import { styles } from "../styles";
import { slideIn } from "../utils/motion";
import { logo } from "../assets";

const ChatGpt = () => {
    const [command,setCommand] = useState("");
    const [chatResponse,setChatResponse]=useState("")
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

  
  const createResponse = async () => {
    setMessage("Generating Image...");

    // You can replace this with different model API's
    const URL = "https://api-inference.huggingface.co/models/nomic-ai/gpt4all-j"


    // Send the request
    const response = await axios({
      url: URL,
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          import.meta.env.VITE_APP_HUGGING_FACE_API_KEY
        }`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        inputs: command,
        options: { wait_for_model: true },
      }),
    });
    
  const result = await response.json();
  setChatResponse(result)
	return result;
  };

  
    
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (command === "") {
      window.alert("Please provide a name and description");
      return;
    }
    setLoading(true);
    // Call AI API to generate a image based on description
    const responseData = await createResponse();
    console.log(responseData)
    setMessage("...")
    
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
        <p className={styles.sectionSubText}>Ask A question to Gpt-4</p>
        <h3 className={styles.sectionHeadText}> Chat</h3>

        <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
          
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Command</span>
            <input
              type="text"
              name="command"
              onChange={(e) => {
                setCommand(e.target.value);
              }}
              placeholder="command"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <button
            type="submit"
            className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
          
        </form>
      </div>
      <div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 mt-16 p-8 rounded-2xl"
      >
        {
          chatResponse && chatResponse.length > 0 ? (
            <div>
              <p className={styles.sectionSubText}>Response</p>
              <h3 className={styles.sectionHeadText}> Chat</h3>
              <p className="text-white font-medium mb-4">{chatResponse}</p>
            </div>
          ) : (
            <div>
              <p className={styles.sectionSubText}>Response</p>
              <h3 className={styles.sectionHeadText}> Chat</h3>
              <p className="text-white font-medium mb-4">No Response</p>
            </div>
          )
        }
        
      </div>
    </div>
  );
};

export default ChatGpt;
