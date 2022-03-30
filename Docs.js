import React, { useState, useEffect } from 'react'
import { ethers } from "ethers";
import Abi from './Abi';

export default function Docs() {

    const contractAddress = "0x5e3d3E223B9406414dA0583eA9C85fE5caf4C7d0"


    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contractInst = new ethers.Contract(contractAddress , Abi, provider.getSigner())

    const [mainAddress, setMainAddress]  = useState()
    const [signerIs, setSignerIs]  = useState()
    const [numberIs, setNumberIs]  = useState()

    useEffect(() => {
    //   readData() //Do Not delete

    })
    

    async function connect(){
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner()
        const myAddress = await signer.getAddress()
        await setMainAddress(myAddress)
        console.log("address is ", myAddress)

    }

    async function readData(){
        // const contractInst = new ethers.Contract(contractAddress , Abi, provider)
        console.log(contractInst)
        const num = await contractInst.getNum()
        console.log("Num is", num.toString())
        setNumberIs(num.toString())
    }

    async function setNumData(){
        // const numberIs = contractInst.setNum(85)
        const numberIs = await contractInst.setNum(6, {gasLimit: 250000 , gasPrice:ethers.utils.parseUnits('500', 'gwei') })
    
        readData()
    }

    const tx = {
        from:mainAddress,
        value: "25",
        gasPrice: 2500000000000000000000000,
        gasLimit:50000000000000000000
    }


  return (
    <div>
        <h2>From the DOCS</h2>
        <button className="btn-primary" onClick={connect}>Connect</button>
        <p>Address is :- {mainAddress}</p>
        <button className="btn-primary" onClick={readData}>read</button>
        <p>Given Number is {numberIs}</p>
        <button className="btn-primary" onClick={setNumData}>SetNum</button>
    </div>
  )
}
