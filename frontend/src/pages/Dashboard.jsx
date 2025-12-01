import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import API from "../api/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    policies: 0,
    clients: 0,
    expiringSoon: 0,
  });

  const [recentPolicies, setRecentPolicies] = useState([]);

  // Fetch data from backend
  const fetchData = async () => {
    try {
      const clientsRes = await API.get("/clients");
      await API.get("/categories");
      const policiesRes = await API.get("/policies");

      const policies = policiesRes.data;

      // Count expiring policies
      const expiring = policies.filter((p) => {
        const expiry = new Date(p.expiryDate);
        const today = new Date();
        const daysLeft = (expiry - today) / (1000 * 60 * 60 * 24);
        return daysLeft <= 30 && daysLeft >= 0;
      }).length;

      setStats({
        policies: policies.length,
        clients: clientsRes.data.length,
        expiringSoon: expiring,
      });

      // recent 5 policies
      const recent = policies
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      setRecentPolicies(recent);
    } catch (err) {
      console.log(err);
      alert("Failed to load dashboard data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      <Sidebar />
      <Topbar title="Dashboard" />

      <main className="ml-[var(--sidebar-width)] p-6">
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6">
          <div className="card">
            <h4 className="text-sm text-gray-400">Active Policies</h4>
            <div className="text-3xl font-bold mt-2">{stats.policies}</div>
          </div>

          <div className="card">
            <h4 className="text-sm text-gray-400">Clients</h4>
            <div className="text-3xl font-bold mt-2">{stats.clients}</div>
          </div>

          <div className="card">
            <h4 className="text-sm text-gray-400">Expiring Soon</h4>
            <div className="text-3xl font-bold mt-2">{stats.expiringSoon}</div>
          </div>
        </div>

        {/* Recent policies */}
        <section className="mt-6 card">
          <h3 className="text-lg font-semibold mb-4">Recent Policies</h3>

          <div className="overflow-x-auto">
            <table className="table text-sm">
              <thead>
                <tr className="text-left text-gray-400">
                  <th>Policy</th>
                  <th>Client</th>
                  <th>Issue Date</th>
                  <th>Expiry</th>
                  <th>Amount</th>
                </tr>
              </thead>

              <tbody>
                {recentPolicies.map((p) => (
                  <tr key={p._id}>
                    <td>{p.policyName}</td>
                    <td>{p.clientId?.name}</td>
                    <td>{new Date(p.issueDate).toLocaleDateString()}</td>
                    <td>{new Date(p.expiryDate).toLocaleDateString()}</td>
                    <td>₹{p.amount}</td>
                  </tr>
                ))}

                {recentPolicies.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-3 text-gray-400">
                      No policies found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
