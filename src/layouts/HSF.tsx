import { Outlet } from "react-router-dom";
import { Footer, Header, Sidebar } from "./../components/Layouts";

export default function HSF() {
  const headerTitle = "Frontend Assesment";
  return (
    <div className="min-h-screen bg-base-200">
      <Header title={headerTitle} />
      <div className="flex min-h-[calc(100vh-3rem)]">
        <Sidebar title={headerTitle} />
        <main className="flex-1  transition-all duration-300 min-h-0 flex flex-col">
          <Outlet />
          <div className="mt-auto">
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
