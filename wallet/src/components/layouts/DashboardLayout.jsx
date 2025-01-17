import { Link, Outlet } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {LayoutDashboard,Wallet,Receipt,PieChart,Bell,LogOut,} from "lucide-react";
import {NavigationMenu,NavigationMenuItem,NavigationMenuLink,NavigationMenuList,navigationMenuTriggerStyle,} from "../../components/ui/navigation-menu";

const DashboardLayout = () => {
  const mockUser = {
    email: "user@example.com",
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Wallet, label: "Accounts", path: "/accounts" },
    { icon: Receipt, label: "Transactions", path: "/transactions" },
    { icon: PieChart, label: "Budgets", path: "/budgets" },
    { icon: Wallet, label: "Reports", path: "/reports" },
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top Menu Bar */}
      <header className="bg-white border-b shadow">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Navigation Menu */}
          <NavigationMenu className="w-full">
            <NavigationMenuList className="flex justify-center gap-4">
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.path}>
                  <NavigationMenuLink asChild>
                    <a
                      href={item.path}
                      className="flex items-center gap-2 text-sm font-medium hover:text-primary"
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* User Info & Notifications */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <span className="font-medium">{mockUser.email}</span>
            <Link to="/login">
              <Button variant="ghost" className="flex items-center">
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6">
        <Outlet />
      </main>
      <footer className="bg-white border-t shadow">
        <div className="flex items-center justify-center h-16 px-6">
          <div className="text-sm text-gray-600 ">
            &copy; 2025 COA. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
