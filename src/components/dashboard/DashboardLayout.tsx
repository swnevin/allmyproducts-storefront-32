import { Logo } from "@/components/Logo";
import { SharePage } from "@/components/SharePage";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Share2, Settings, BarChart3, Package2, Paintbrush, UserCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { title: "Products", icon: Package2, url: "/dashboard/products" },
  { title: "Analytics", icon: BarChart3, url: "/dashboard/analytics" },
  { title: "Appearance", icon: Paintbrush, url: "/dashboard/appearance" },
  { title: "Settings", icon: Settings, url: "/dashboard/settings" },
];

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader className="border-b p-4">
            <Logo />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <UserCircle className="h-5 w-5" />
                  <span>Profile</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => navigate("/new")}>
                  Create a new AllMyProducts page
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/account")}>
                  My account
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/billing")}>
                  Billing
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => window.open("/support", "_blank")}>
                  Contact support
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => window.open("/help", "_blank")}>
                  Help Center
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => window.open("/feedback", "_blank")}>
                  Submit feedback
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/logout")}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 overflow-auto">
          <div className="flex justify-end p-4 border-b">
            <Button
              onClick={() => setIsShareOpen(true)}
              variant="outline"
              className="gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
          <main className="p-6">{children}</main>
        </div>
      </div>
      <SharePage open={isShareOpen} onOpenChange={setIsShareOpen} />
    </SidebarProvider>
  );
};