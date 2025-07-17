"use client";

import { useState } from "react";
import { Clock, Calendar, TrendingUp, Filter } from "lucide-react";
import { KpiCard } from "@/components/dashboard/KpiCard";

export default function TimeTrackerPage() {
  const [selectedWeek, setSelectedWeek] = useState(new Date());

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
            Time Tracker
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Track your time and manage billable hours
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700">
            <Calendar className="h-4 w-4" />
            This Week
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Hours"
          value="32.5h"
          icon={Clock}
          trend="8%"
          trendUp={true}
          description="This week"
        />
        <KpiCard
          title="Billable Hours"
          value="28.0h"
          icon={TrendingUp}
          trend="12%"
          trendUp={true}
          description="86% of total"
        />
        <KpiCard
          title="Active Tasks"
          value="5"
          icon={Clock}
          description="Currently tracking"
        />
        <KpiCard
          title="Weekly Goal"
          value="40h"
          icon={Clock}
          description="81% completed"
        />
      </div>

      {/* Time Entries Table */}
      <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Time Entries
          </h2>
        </div>
        <div className="p-4">
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <p className="text-sm">No time entries yet</p>
            <p className="text-xs mt-1">
              Start tracking time on your tasks to see entries here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
