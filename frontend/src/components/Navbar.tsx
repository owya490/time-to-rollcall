"use client";
import { useContext, useState } from "react";
import Sidebar from "./SideBar";
import SideBarMobile from "./SideBarMobile";
import { UserContext } from "../lib/context";

export default function Navbar() {
  const user = useContext(UserContext);
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <>
      <SideBarMobile user={user} setter={setShowSidebar} />
      <Sidebar user={user} show={showSidebar} setter={setShowSidebar} />
    </>
  );
}
