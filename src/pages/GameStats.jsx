import React from "react";
import { Sidenav } from "../components/Sidenav";
import { Header } from "../components/Header";
import MatchStats from "../components/MatchStats";
import '../styles/gamestats.css'

export const Gamestats = () => {
    return (
        <>
        {/* <StatsTable /> */}
        <Sidenav />
        <Header />
        {/* <body> */}
        <MatchStats />
        {/* </body> */}

        </>
    )
}