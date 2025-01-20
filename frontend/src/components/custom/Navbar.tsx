"use client";
import Image from 'next/image';
import logo from '@/assets/images/image.png'
function Navbar() {
  return (
    <nav className="p-4 flex items-center space-x-4">
      <Image src={logo}  alt="Logo" width={50} height={50}/>
      
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Search Button
      </button>
      <input
        type="text"
        placeholder="Product to search"
        className="border rounded-md px-2 py-1 flex-1"
      />
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Account
      </button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Add Product
      </button>
    </nav>
  );
}
export default Navbar;
