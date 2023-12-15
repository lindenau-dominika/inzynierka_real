import React from "react";
import { Sidenav } from "../components/Sidenav";
import { Header } from "../components/Header";
import '../styles/gamestats.css'
import OverviewStats from "../components/Overview";

export const Gamestats = () => {
    return (
        <>
        <div className="col-3">
        <Sidenav />
        </div>
        <div className="col-21">

        <OverviewStats />
        </div>

        </>
    )
}