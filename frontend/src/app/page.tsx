import Sidebar from "@/components/custom/Sidebar";
import Navbar from "@/components/custom/Navbar";
import ProductGrid from "@/components/custom/ProductGrid";

function Home() {
  return (
    <div className="flex flex-col h-full w">
      
      <header className=" text-white py-4 flex-none">
        <Navbar />
      </header>
      
      <main className="flex flex-1 overflow-y-auto">
        <aside className="w-1/4 h-full">
          <Sidebar />
        </aside>

        <section className="flex-1 p-4 bg-white h-full ">
          <ProductGrid />
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-2 text-center flex-none">
        <p>This is Footer</p>
      </footer>
    </div>
  );
}

export default Home;
