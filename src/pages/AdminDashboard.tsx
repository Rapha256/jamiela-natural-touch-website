import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Package, MessageSquare, Star, Mail, LayoutDashboard } from "lucide-react";
import ProductManager from "@/components/admin/ProductManager";
import TestimonialManager from "@/components/admin/TestimonialManager";

type TabType = "overview" | "products" | "requests" | "testimonials" | "messages";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tab, setTab] = useState<TabType>("overview");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { navigate("/admin"); return; }
    const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", session.user.id);
    if (!roles || !roles.some((r: any) => r.role === "admin")) {
      toast({ title: "Access denied", description: "You don't have admin privileges.", variant: "destructive" });
      await supabase.auth.signOut();
      navigate("/admin");
      return;
    }
    fetchAll();
  };

  const fetchAll = async () => {
    setLoading(true);
    const [prodRes, reqRes, testRes, msgRes] = await Promise.all([
      supabase.from("products").select("*").order("created_at"),
      supabase.from("requests").select("*").order("created_at", { ascending: false }),
      supabase.from("testimonials").select("*").order("created_at", { ascending: false }),
      supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
    ]);
    setProducts(prodRes.data || []);
    setRequests(reqRes.data || []);
    setTestimonials(testRes.data || []);
    setMessages(msgRes.data || []);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const updateRequestStatus = async (id: string, status: string) => {
    await supabase.from("requests").update({ status }).eq("id", id);
    fetchAll();
    toast({ title: `Request ${status}` });
  };

  const exportCSV = () => {
    const headers = ["Product", "Quantity", "Name", "Country", "Phone", "Address", "Notes", "Status", "Date"];
    const rows = requests.map((r: any) => [
      r.product, r.quantity, r.full_name, r.country, r.phone, r.address, r.notes || "", r.status, new Date(r.created_at).toLocaleDateString()
    ]);
    const csv = [headers.join(","), ...rows.map((r: string[]) => r.map(v => `"${v}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "requests.csv";
    a.click();
  };

  const pendingRequests = requests.filter((r: any) => r.status === "Pending").length;
  const approvedRequests = requests.filter((r: any) => r.status === "Approved").length;
  const completedRequests = requests.filter((r: any) => r.status === "Completed").length;

  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "requests", label: "Requests", icon: MessageSquare },
    { id: "testimonials", label: "Testimonials", icon: Star },
    { id: "messages", label: "Messages", icon: Mail },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      <div className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <h1 className="font-heading text-lg font-bold">JAMIELA Admin</h1>
        <button onClick={handleSignOut} className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm">
          <LogOut size={16} /> Sign Out
        </button>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                tab === t.id ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"
              }`}>
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Products", value: products.length, color: "text-primary" },
              { label: "Total Requests", value: requests.length, color: "text-foreground" },
              { label: "Pending", value: pendingRequests, color: "text-accent" },
              { label: "Approved", value: approvedRequests, color: "text-primary" },
              { label: "Completed", value: completedRequests, color: "text-muted-foreground" },
              { label: "Testimonials", value: testimonials.length, color: "text-gold" },
              { label: "Messages", value: messages.length, color: "text-foreground" },
            ].map(s => (
              <div key={s.label} className="bg-card rounded-xl p-6 shadow-botanical">
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className={`text-3xl font-heading font-bold mt-1 ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "products" && <ProductManager products={products} onRefresh={fetchAll} />}

        {tab === "requests" && (
          <div className="bg-card rounded-xl shadow-botanical overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold">Requests ({requests.length})</h2>
              <button onClick={exportCSV} className="text-sm text-primary font-medium hover:underline">Export CSV</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-medium">Product</th>
                    <th className="text-left p-3 font-medium">Name</th>
                    <th className="text-left p-3 font-medium">Country</th>
                    <th className="text-left p-3 font-medium">Phone</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((r: any) => (
                    <tr key={r.id} className="border-t border-border">
                      <td className="p-3 font-medium">{r.product} ×{r.quantity}</td>
                      <td className="p-3">{r.full_name}</td>
                      <td className="p-3 text-muted-foreground">{r.country}</td>
                      <td className="p-3 text-muted-foreground">{r.phone}</td>
                      <td className="p-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          r.status === "Pending" ? "bg-gold/20 text-gold-foreground" :
                          r.status === "Approved" ? "bg-primary/10 text-primary" :
                          "bg-muted text-muted-foreground"
                        }`}>{r.status}</span>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          {r.status === "Pending" && (
                            <button onClick={() => updateRequestStatus(r.id, "Approved")} className="text-xs bg-primary text-primary-foreground px-3 py-1 rounded-full">Approve</button>
                          )}
                          {r.status !== "Completed" && (
                            <button onClick={() => updateRequestStatus(r.id, "Completed")} className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full">Complete</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "testimonials" && <TestimonialManager testimonials={testimonials} onRefresh={fetchAll} />}

        {tab === "messages" && (
          <div className="bg-card rounded-xl shadow-botanical overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="font-heading text-lg font-semibold">Contact Messages ({messages.length})</h2>
            </div>
            <div className="divide-y divide-border">
              {messages.map((m: any) => (
                <div key={m.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{m.name} <span className="text-xs text-muted-foreground">({m.email})</span></p>
                      <p className="text-sm text-muted-foreground mt-1">{m.message}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{new Date(m.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
