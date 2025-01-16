import { useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Wallet, Receipt, PieChart, Bell, LogOut, Menu } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    // { icon: Wallet, label: "Accounts", path: "/accounts" },
    // { icon: Receipt, label: "Transactions", path: "/transactions" },
    // { icon: PieChart, label: "Budgets", path: "/budgets" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 z-40 h-screen transition-transform
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 w-64 bg-white border-r
      `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b">
            <h1 className="text-xl font-bold">Financial Dashboard</h1>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="md:ml-64">
        <header className="h-16 bg-white border-b">
          <div className="flex items-center justify-between h-full px-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <span className="font-medium">{user?.email}</span>
            </div>
          </div>
        </header>

        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
