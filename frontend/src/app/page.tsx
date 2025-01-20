"use client";

import Sidebar from "@/components/custom/Sidebar";
import Navbar from "@/components/custom/Navbar";
import ProductGrid from "@/components/custom/ProductGrid";

function Home() {


  return (
    <div className="flex flex-col h-screen w-screen">
      {/* Header */}
      <header className="bg-gray-800 text-white py-4 flex-none">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-1/4 bg-gray-100 h-full">
          <Sidebar />
        </aside>

        {/* Main Grid Content */}
        <section className="flex-1 p-4 bg-white h-full overflow-y-auto">
          <ProductGrid />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-2 text-center flex-none">
        <p>This is Footer</p>
      </footer>
    </div>
  );
}

export default Home;
