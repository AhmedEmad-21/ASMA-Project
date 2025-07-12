"use client";
import React, { useState, useCallback } from "react";
import ProjectTable from "../../../components/dashboard/admin/ProjectTable";
import UnitTable from "../../../components/dashboard/admin/UnitTable";

const TABS = [
  { label: "Projects", value: "projects" },
  { label: "Units (Book Now)", value: "units" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("projects");

  const handleTabChange = useCallback((tab: string) => setActiveTab(tab), []);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
          <h1 className="text-xl font-semibold text-[#0C1C2D]">Admin Dashboard</h1>
          <span className="text-gray-700">Admin Panel</span>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex gap-4 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => handleTabChange(tab.value)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-150 ${
                activeTab === tab.value
                  ? "bg-[#0C1C2D] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === "projects" && <ProjectTable />}
        {activeTab === "units" && <UnitTable />}
      </main>
    </div>
  );
}
