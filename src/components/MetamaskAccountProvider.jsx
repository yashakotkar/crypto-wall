import React, { createContext, Fragment } from "react";
import Web3 from "web3";
import { useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import CryptoWall from "../abis/CryptoWall.json";
import { create, IPFSHTTPClient } from "ipfs-http-client";

let ipfs = undefined;
try {
  ipfs = create({
    url: "https://ipfs.infura.io:5001/api/v0",
  });
} catch (error) {
  console.error("IPFS error ", error);
  ipfs = undefined;
}

export const MetamaskAccountContext = createContext();

export const MetamaskAccountProvider = ({ children }) => {
  const [buffer, setBuffer] = useState(undefined);
  const [account, setAccount] = useState("");
  const [posts, setPosts] = useState([]);
  const [cryptoWall, setCryptoWall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postsCount, setPostsCount] = useState(0);

  async function loadWeb3() {
    if (window.ethereum) {
      console.log("1");

      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      console.log("2");
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying Metamask."
      );
    }
  }

  async function loadBlockchainData() {
    const web3 = window.web3;

    // Load Account
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    const networkId = await web3.eth.net.getId();
    const networkData = CryptoWall.networks[networkId];

    console.log(networkId, networkData);
    if (networkData) {
      const cryptoWall = new web3.eth.Contract(
        CryptoWall.abi,
        networkData.address
      );
      setCryptoWall(cryptoWall);
      const postCount = await cryptoWall.methods.postCount().call();
      setPostsCount(postCount);

      //   load images
      var postsArray = [];
      for (let i = 1; i <= postCount; i++) {
        const post = await cryptoWall.methods.posts(i).call();
        postsArray.push(post);
      }
      setPosts(postsArray);
      console.log(posts);

      setLoading(false);
    } else {
      window.alert("CryptoWall contract not deployed to detected network");
    }
  }

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  function captureFile(file) {
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      setBuffer(Buffer(reader.result));
      console.log("buffer", reader.result);
    };
  }

  async function uploadPost(desc, cb) {
    //   Upload image to ipfs
    console.log("Uploading Image");
    try {
      const image = await ipfs.add(buffer);
      console.log("Image Uploaded", image);
      setLoading(true);
      cryptoWall.methods
        .createPost(image.path, desc)
        .send({ from: account })
        .on("transactionHash", (hash) => {
          setLoading(false);
          console.log("Uploaded Post", hash);
          setBuffer(null);
          setPostsCount(postsCount + 1);
          cb();
        });
    } catch (error) {
      console.error(error);
    }
  }

  async function tipPostOwner(id, tipAmount) {
    console.log("Tipping Post", id, tipAmount);
    try {
      setLoading(true);
      cryptoWall.methods
        .tipPostOwner(id)
        .send({ from: account, value: tipAmount })
        .on("transactionHash", (hash) => {
          setLoading(false);
        });
      console.log("Tipping Post");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <MetamaskAccountContext.Provider
      value={{
        account,
        buffer,
        cryptoWall,
        posts,
        loading,
        captureFile,
        uploadPost,
        tipPostOwner,
      }}
    >
      {!ipfs && (
        <p>Oh oh, Not connected to IPFS. Checkout out the logs for errors</p>
      )}
      {children}
    </MetamaskAccountContext.Provider>
  );
};
