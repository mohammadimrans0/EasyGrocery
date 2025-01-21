import Sidebar from "@/components/layout/Sidebar";

export const metadata = {
    title: 'Dashboard',
  };
  
  export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="m-auto">
          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
            <div className="col-span-4 lg:col-span-3"><Sidebar/></div>
            <div className="col-span-4 lg:col-span-9">{children}</div>
          </div>
        </div>
    );
  }