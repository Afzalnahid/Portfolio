import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Workflow,
  Settings,
  LogOut,
  Activity,
  Zap,
  Bell,
  Search,
} from "lucide-react";
import { useLocation } from "wouter";

export default function Dashboard() {
  const [, setLocation] = useLocation();

  const menuItems = [
    { title: "Overview", icon: LayoutDashboard, active: true },
    { title: "My Workflows", icon: Workflow },
    { title: "Usage Metrics", icon: Activity },
    { title: "Quick Automations", icon: Zap },
    { title: "Notifications", icon: Bell },
    { title: "Account Settings", icon: Settings },
  ];

  const handleLogout = () => {
    setLocation("/");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-slate-950 text-slate-100 w-full">
        <Sidebar
          variant="inset"
          className="border-r border-white/5 bg-slate-900/50 backdrop-blur-xl"
        >
          <SidebarHeader className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white">
                N
              </div>
              <span className="font-black tracking-tighter uppercase text-lg">
                Nahid<span className="text-blue-500">.</span>
              </span>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-4">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={item.active}
                    className="hover:bg-white/5 transition-colors py-6"
                  >
                    <item.icon
                      className={`w-5 h-5 ${item.active ? "text-blue-500" : "text-slate-400"}`}
                    />
                    <span
                      className={`font-medium ${item.active ? "text-white" : "text-slate-400"}`}
                    >
                      {item.title}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t border-white/5">
            <SidebarMenuButton
              onClick={handleLogout}
              className="hover:bg-red-500/10 hover:text-red-500 transition-colors py-6"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </SidebarMenuButton>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="bg-slate-950 flex flex-col">
          <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-sm font-bold uppercase tracking-widest text-slate-400">
                Client Overview
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search workflows..."
                  className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-1.5 text-xs focus:outline-none focus:border-blue-500/50 transition-colors w-64"
                />
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border border-white/10" />
            </div>
          </header>

          <main className="p-8 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  label: "Active Workflows",
                  value: "12",
                  sub: "+2 this month",
                  icon: Workflow,
                  color: "text-blue-500",
                },
                {
                  label: "Total Executions",
                  value: "48.2k",
                  sub: "+15% vs last week",
                  icon: Activity,
                  color: "text-emerald-500",
                },
                {
                  label: "Cost Saved",
                  value: "$1,240",
                  sub: "Est. manual hours saved",
                  icon: Zap,
                  color: "text-amber-500",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      {stat.label}
                    </span>
                  </div>
                  <div className="text-3xl font-black mb-1">{stat.value}</div>
                  <div className="text-xs text-slate-500 font-medium">
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-8 bg-white/5 rounded-3xl border border-white/5">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Workflow className="w-5 h-5 text-blue-500" /> Recent
                  Deployments
                </h2>
                <div className="space-y-4">
                  {[
                    { name: "CRM Data Sync", status: "Active", time: "2h ago" },
                    {
                      name: "AI Lead Classifier",
                      status: "Active",
                      time: "5h ago",
                    },
                    {
                      name: "Multi-Platform Notify",
                      status: "Paused",
                      time: "1d ago",
                    },
                  ].map((job) => (
                    <div
                      key={job.name}
                      className="flex justify-between items-center p-4 bg-slate-900/50 rounded-xl border border-white/5"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-2 h-2 rounded-full ${job.status === "Active" ? "bg-emerald-500 animate-pulse" : "bg-slate-500"}`}
                        />
                        <span className="text-sm font-medium">{job.name}</span>
                      </div>
                      <span className="text-xs text-slate-500">{job.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-3xl border border-white/5 flex flex-col justify-center items-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-blue-500" />
                </div>
                <h2 className="text-xl font-bold mb-2">
                  Need a New Automation?
                </h2>
                <p className="text-slate-400 text-sm font-light mb-8 max-w-xs">
                  Request a custom n8n workflow or chatbot directly from your
                  personal dashboard.
                </p>
                <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all duration-300 uppercase tracking-widest text-xs shadow-lg shadow-blue-500/20">
                  Request Workflow
                </button>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
