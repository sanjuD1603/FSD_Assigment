import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Sidebar from "./Sidebar";

export default function Dialog() {
  return (
    <div>
      <Drawer>
       
        <DrawerTrigger asChild>
        <Button className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1D506A] hover:bg-[#1D506A] hover:scale-105 hover:shadow-lg transition-transform duration-200 ease-in-out">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={3}
    stroke="white"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 4h18l-6.586 8.586a2 2 0 00-.414 1.172V19a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5.242a2 2 0 00-.414-1.172L3 4z"
    />
  </svg>
</Button>


        </DrawerTrigger>

        
        <DrawerContent className="h-full max-h-screen flex flex-col">
          <DrawerHeader className="flex justify-between items-center">
            <DrawerTitle>Filters</DrawerTitle>

            
            <DrawerClose asChild>
              <Button variant="ghost" className="text-lg">
                ✕
              </Button>
            </DrawerClose>
          </DrawerHeader>

          
          <div className="flex-1 overflow-y-auto">
            <Sidebar />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
