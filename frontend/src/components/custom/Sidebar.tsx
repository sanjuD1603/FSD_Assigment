"use client";
import Brand from "./sidebarComponents/Brand";
import Condition from "./sidebarComponents/Condition";
import Price from "./sidebarComponents/Price";
 import Ram from "./sidebarComponents/Ram";
import Storage from "./sidebarComponents/Storage";
import Verification from "./sidebarComponents/Verification";
import Warranty from "./sidebarComponents/Warranty";
import WithinRange from "./sidebarComponents/WithinRage";

export default function Sidebar() {
  return (
    <div className="p-10 z-10 relative">
      <div className="space-y-6">
      <WithinRange/>
      <Brand />
      <Condition />
      <Price />
       <Ram />
      <Storage />
      <Verification />
      <Warranty />
      </div>
    </div>
  );
}
