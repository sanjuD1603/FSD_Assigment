import Sidebar from "@/components/custom/Sidebar";
import Navbar from "@/components/custom/Navbar";
import ProductGrid from "@/components/custom/ProductGrid";
import Filter from "@/components/custom/Filter";

function Home() {
  return (
    <div className="flex flex-col h-full min-w-[375px]">
      <header className="text-white py-4 flex-none">
        <Navbar />
      </header>

   
      <div className="bg-gray-100 py-2 px-4 md:px-16 lg:px-64 flex-none border-b">
        <Filter />
      </div>

    
      <main className="flex flex-1 overflow-y-auto">
    
        <aside className="hidden lg:block lg:w-1/4 h-full border-r">
          <Sidebar />
        </aside>

     
        <section className="flex-1 p-4 bg-white h-full">
          <ProductGrid />
        </section>
      </main>
    </div>
  );
}

export default Home;
