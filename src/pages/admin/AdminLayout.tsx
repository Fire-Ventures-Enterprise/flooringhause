import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1">
          <header className="h-14 border-b flex items-center px-4">
            <SidebarTrigger />
            <div className="ml-4 flex items-center gap-3">
              <img 
                src={logoDark} 
                alt="FlooringHause Admin" 
                className="h-8 w-auto dark:hidden"
              />
              <img 
                src={logoLight} 
                alt="FlooringHause Admin" 
                className="h-8 w-auto hidden dark:block"
              />
              <span className="text-lg font-semibold">Admin Dashboard</span>
            </div>
          </header>
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;