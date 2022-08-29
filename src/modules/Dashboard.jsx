import React from 'react';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import DashboardCard04 from '../partials/dashboard/DashboardCard04';
import { BsArrowRightCircle } from "react-icons/bs";
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



      
<div class="overflow-x-auto relative mt-20">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 custom-table-dashboard">
        <thead class="text-xs text-gray-900 uppercase dark:text-gray-400">
            <tr>
                <th scope="col" class="py-3 px-6">
                    Project Name
                </th>
                <th scope="col" class="py-3 px-6">
                    Counter Party
                </th>
                <th scope="col" class="py-3 px-6">
                    Date Submitted
                </th>
                <th scope="col" class="py-3 px-6">
                    Amount
                </th>
                <th scope="col" class="py-3 px-6">
                    Status
                </th>
                <th scope="col" class="py-3 px-6">
                    Details
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white dark:bg-gray-800">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    NFT Creation
                </th>
                <td class="py-4 px-6">
                    BAYC
                </td>
                <td class="py-4 px-6">
                    06/22/2022
                </td>
                <td class="py-4 px-6">
                    $2999
                </td>
                <td class="py-4 px-6">
                    Pending
                </td>
                <td class="py-4 px-6">
                    <BsArrowRightCircle size={35}/>
                </td>
            </tr>
            
        </tbody>
    </table>
</div>


    </div>
  );
}

export default Dashboard;