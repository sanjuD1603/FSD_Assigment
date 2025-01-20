"use client";
import Brand from "./sidebarComponents/Brand";
import Condition from "./sidebarComponents/Condition";
import Price from "./sidebarComponents/Price";
import Ram from "./sidebarComponents/Ram";
import Storage from "./sidebarComponents/Storage";
import Verification from "./sidebarComponents/Verification";
import Warranty from "./sidebarComponents/Warranty";

export default function Sidebar() {
  return (
    <div>
      <Brand />
      <Condition />
      <Price />
      <Ram />
      <Storage />
      <Verification />
      <Warranty />
    </div>
  );
}
