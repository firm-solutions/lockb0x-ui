import React,  { useState, CSSProperties } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import baseURL from '../../api/axios'
import useAlert from "../../common/hooks/useAlert";
import useAuth from '../../hooks/useAuth';
import ClipLoader from "react-spinners/ClipLoader";



function CreateParty() {
    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "green",
      };
    const { register, handleSubmit, formState: { errors }, } = useForm();
    let [loading, setLoading] = useState(true);
    const [modalShow, setModalShow] = React.useState(false);
    let [color, setColor] = useState("#ffffff");
    const { showAlert } = useAlert();
    const [dropDownData, SetDropDownData] = React.useState({});
    const [dropDownShowDataParty, SetdropDownShowDataParty] = useState({});
    const { auth } = useAuth()
        const onSubmit = (data, e) => {
            let bearer = 'Bearer ' + auth.accessToken;
            const headers = { 
                'Accept': 'application/json',
                'Content-Type': 'application/json-patch+json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': bearer
            }
            try {
                axios.post(`https://lockb0x-api-dev.azurewebsites.net/api/Party`,  {name:data.partyName}, { headers })
                .then(response => {
                    if (response.data.status === 'OK') {
                        SetdropDownShowDataParty(response.data)
                        console.log(response.data)
                        showAlert({type:'success', message: 'Party has been created', duration: 2000 });
                        e.target.reset()
                    }
                });
              
            } catch (e) {
                console.log(e)
            }
        }



        // Fetch Party
        React.useEffect(()=>{
            let bearer = 'Bearer ' + auth.accessToken;
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
                        setLoading(loading)
                        SetDropDownData(resData.value)
                        showAlert({ type:"success", message: "Multiple Objects Received", duration: 2000 });
                        }
                        else{
                            setLoading(!loading)
                        }
                    });
                } catch (e) {
                    showAlert({ type: "error", message: e.message, duration: 2000 });
                }
        },[dropDownShowDataParty])
        console.log("object",dropDownData);
      
    return (
        
        <div className=" shadow-lg">
            <header className="px-5 py-4 border-b border-gray-100">
                <h2 className="text-2xl text-white font-bold mb-6">Create Party</h2>
            </header>
            <div className="container mt-20">
                <div className="row custom-row">
                        
                    <div className="col-lg-4 col-md-8 mx-auto text-center">
                        
                    <div className="auth-content-box custom-h-w">
                        <form action="" className="mt-2 w-full" onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                            <div className="col-12">
                            <input type="text" name="" id=""  className='form-control' placeholder='Party Name' {...register("partyName", { required: true })}/>
                            <div className="text-xs mt-1 text-red-500">{errors.partyName?.type === 'required' && "Party Name is required"}</div>
                            </div>
                            <div className="col-12">
                            <input type="text" name="" id="" className='form-control'  placeholder='Select Api Key'/>
                            </div>
                            {/* <div className="col-12">
                                <input type="text" className="form-control" placeholder="Frieghter Wallet Address"/>
                            </div> */}
                            <div className="col-12 mt-4 text-center d-flex flex-column mt-20">
                            <button type="submit" class="btn mb-3 ">Create Party</button> <br/>
                            </div>
                            </div>
                        </form>
                    </div>
                    </div>
                    
                </div>
            </div>
        <table class="table-auto w-full  rounded border-separate border-spacing-y-4 custom-table-dashboard mt-20">
            <thead class="text-white text-left   tracking-wider">
                <tr>
                    <th scope="col" class="py-3 px-4 text-center">
                    Party ID
                    </th>
                    <th scope="col" class="py-3 px-4 text-center">
                    Name
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    dropDownData && dropDownData.length>0 ? 
                    dropDownData.map((dValue, i) => (
                        <tr  key={i} class="bg-stone-800 mt-6 text-white rounded">
                            <td class="p-4 text-center">{dValue.partyId}</td>
                            <td class="p-4 text-center">{dValue.name}</td>
                        </tr>
                    ))
                    :
                    <ClipLoader color={color} loading={loading} cssOverride={override} size={50} />
                }
            </tbody>
        </table>
    </div>
    )
}

export default CreateParty