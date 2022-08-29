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
<table class="table-auto w-full  rounded border-separate border-spacing-y-4 custom-table-dashboard mt-20">
        <thead class="text-white text-left   tracking-wider">
        <tr>
                <th scope="col" class="py-3 px-4">
                    Project Name
                </th>
                <th scope="col" class="py-3 px-4">
                    Counter Party
                </th>
                <th scope="col" class="py-3 px-4">
                    Date Submitted
                </th>
                <th scope="col" class="py-3 px-4">
                    Amount
                </th>
                <th scope="col" class="py-3 px-4">
                    Status
                </th>
                <th scope="col" class="py-3 px-4">
                    Details
                </th>
            </tr>
        </thead>
        <tbody>
              <tr class="bg-stone-800 mt-6 text-white rounded">
                <td class="p-4">NFT Creation</td>
                <td class="p-4">BAYC</td>
                <td class="p-4">06/22/2022</td>
                <td class="p-4">$2999</td>
                <td class="p-4">Pending</td>
                <td class="p-4"><BsArrowRightCircle size={35}/></td>
              </tr>


              <tr class="bg-stone-800 mt-6 text-white rounded">
                <td class="p-4">NFT Creation</td>
                <td class="p-4">BAYC</td>
                <td class="p-4">06/22/2022</td>
                <td class="p-4">$2999</td>
                <td class="p-4">Pending</td>
                <td class="p-4"><BsArrowRightCircle size={35}/></td>
              </tr>


              <tr class="bg-stone-800 mt-6 text-white rounded">
                <td class="p-4">NFT Creation</td>
                <td class="p-4">BAYC</td>
                <td class="p-4">06/22/2022</td>
                <td class="p-4">$2999</td>
                <td class="p-4">Pending</td>
                <td class="p-4"><BsArrowRightCircle size={35}/></td>
              </tr>
        </tbody>
      </table>

    </div>
  );
}

export default Dashboard;