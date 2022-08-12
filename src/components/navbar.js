import React, { Component } from 'react';
import { useEffect, useState } from "react";
import { connectWallet, getAccount } from "../utils/wallet";
import './navbar.css'

const Navbar = () => {
    const [account, setAccount] = useState("");

    useEffect(() => {
        (async () => {
            // TODO 5.b - Get the active account
            const account = await getAccount();
            setAccount(account);
        })();
    }, []);

    // TODO 4.a - Create onConnectWallet function
    const onConnectWallet = async () => {
        await connectWallet();
        const account = await getAccount();
        setAccount(account);
    };

    return (
        <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container-fluid">
                <a class="navbar-brand" href="#" >
                    Aztec
                </a>
                {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item" >
                            <a className="nav-link" aria-current="page" href="#" > About</a>
                        </li>
            
                    </ul>
                </div>
                <div className="d-flex">
                    {/* TODO 4.b - Call connectWallet function onClick  */}
                    <button onClick={onConnectWallet} className="btn btn-outline-info">
                        {/* TODO 5.a - Show account address if wallet is connected */}
                        {account ? account : "Connect Wallet"}
                    </button>
                </div>
            </div>
        </nav>

    );
};

export default Navbar;
