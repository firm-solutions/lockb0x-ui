import React from 'react';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import DashboardCard04 from '../partials/dashboard/DashboardCard04';

function Dashboard() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

      {/* Cards */}
      <div className="grid grid-cols-12 gap-6">

        {/* Line chart (Acme Plus) */}
        <DashboardCard01 />
        {/* Line chart (Acme Advanced) */}
        <DashboardCard02 />
        {/* Line chart (Acme Professional) */}
        <DashboardCard03 />
      </div>
    </div>
  );
}

export default Dashboard;