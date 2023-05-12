import React, { useRef, useState } from "react";

import { styles } from "../styles";
import { slideIn } from "../utils/motion";
import {logo} from "../assets"
const Hero = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    photo: "",
  });

  const [loading, setLoading] = useState(false);

  

  

  return (
    <div
      className={`xl:mt-12 pt-5 p-36 px-40  flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 mt-16 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Convert NFT with a click</p>
        <h3 className={styles.sectionHeadText}>Convert NFT</h3>

        <form
          ref={formRef}
          // onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              // onChange={handleChange}
              placeholder="What's your name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Choose png</span>
            <input
              type='file'
              name='file'
              value={form.file}
              onChange={this.fileSelectHandler}
              placeholder=""
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          

          <button
            type='submit'
            className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
          >
            {loading ? "Converting..." : "Convert"}
          </button>
        </form>
      </div>
      <div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 mt-16 p-8 rounded-2xl'
      >
        <img src={logo}/>
        
        </div>

     
    </div>
  );
};

export default Hero;