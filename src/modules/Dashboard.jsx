import React,{useState} from 'react';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import DashboardCard04 from '../partials/dashboard/DashboardCard04';
import { BsArrowRightCircle } from "react-icons/bs";
import useAlert from "../common/hooks/useAlert";
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import { FaCaretDown } from "react-icons/fa";

function Dashboard() {
  const { showAlert } = useAlert();
  const { auth } = useAuth()
  const TOKEN = JSON.parse(localStorage.getItem('tokenData'));
  console.log("object121212", JSON.stringify(TOKEN));
  const [dropDownData, SetDropDownData] = useState({});
  React.useEffect(()=>{
    let bearer = 'Bearer ' + TOKEN;
    const headers = { 
        'Accept': 'application/json',
        'Content-Type': 'application/json-patch+json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': bearer
    }
        try {
            axios.get(`https://lockb0x-api-dev.azurewebsites.net/api/Party`, { headers })
            .then(response =>  {
               var resData = response?.data
               if (response.data.status === 'OK') {
                SetDropDownData(resData.value)
              
                showAlert({ type:"success", message: "Multiple Objects Received", duration: 2000 });
                }
            });
        } catch (e) {
            showAlert({ type: "error", message: e.message, duration: 2000 });
        }
},[])


  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

      {/* Cards */}
      <div className="col-lg-4 col-md-8 mx-auto text-center">
                        
          <div className="auth-content-box">
              <form action="" className="mt-2 w-full" >
                  <div className="row">
                    
                    <div className="col-12 custom-select-pos">
                      <select className="form-control w-full ">
                          <option></option>
                              {
                                  dropDownData && dropDownData.length>0 ? 
                                  dropDownData.map((dValue, i) => (
                                      <option key={i} id={dValue.partyId}>{dValue.name}</option>
                                  ))
                                  :
                                  null
                              }
                      </select>
                      <div className="select-icon">
                          <FaCaretDown color='#fff' size={30}/>
                      </div>
                    </div>
                  </div>
              </form>
          </div>
        </div>
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