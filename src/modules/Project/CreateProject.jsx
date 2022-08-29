import React,  { useState, CSSProperties } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import baseURL from '../../api/axios'
import useAlert from "../../common/hooks/useAlert";
import AuthContext from '../../context/AuthProvider';
import useAuth from '../../hooks/useAuth';
import ClipLoader from "react-spinners/ClipLoader";
function CreateProject() {

    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "green",
      };


    const { register, handleSubmit, formState: { errors }, } = useForm();
     let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
    const [dropDownData, SetDropDownData] = useState({});
    const [dropDownDataID, SetDropDownDataID] = useState({});
    const [projectData, SetProjectData] = useState({});
    const [dropDownID, SetDropDownID] = useState();
    const [dropDownShowData, SetdropDownShowData] = useState({});

    const { showAlert } = useAlert();
    const { auth } = useAuth()
   
    // Fetch Project
    React.useEffect(()=>{
        let bearer = 'Bearer ' + auth.accessToken;
        const headers = { 
            'Accept': 'application/json',
            'Content-Type': 'application/json-patch+json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': bearer
        }
            try {
                axios.get(`https://lockb0x-api-dev.azurewebsites.net/api/Project`, { headers })
                .then(response =>  {
                   var resData = response?.data
                 
                    SetProjectData(resData.value)
                    showAlert({ type:"success", message: "Multiple Objects Received", duration: 2000 });
                    if(resData.response.status=='OK'){
                        setLoading(!loading)
                    }else{
                        setLoading(loading)
                    }
                   
                });
            } catch (e) {
                showAlert({ type: "error", message: e.message, duration: 2000 });
            }
    },[dropDownShowData])
    // Fetch Part DropDown
   
      
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
                    SetDropDownData(resData.value)
                  
                    showAlert({ type:"success", message: "Multiple Objects Received", duration: 2000 });
                    }
                });
            } catch (e) {
                showAlert({ type: "error", message: e.message, duration: 2000 });
            }
    },[])

    
     // Post Project
     const onSubmit = (data, e) => {
        console.log(data);
        let bearer = 'Bearer ' + auth.accessToken;
        const headers = { 
            'Accept': 'application/json',
            'Content-Type': 'application/json-patch+json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': bearer
        }
        try {
            axios.post(`https://lockb0x-api-dev.azurewebsites.net/api/Project`,  
            {
                name:data.projectName,
                partyId:dropDownID,
                contactEmail:data.contactEmail
            
            }, { headers })
            .then(response => {
                    SetdropDownShowData(response.data)
                    console.log(response.data)
                    showAlert({type:'success', message: 'Project has been created', duration: 2000 });
                    e.target.reset()
                
            });
          
        } catch (e) {
            console.log(e)
        }
    }
   

   const  onChangeHandler = (e) => {
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        const ID =  el.getAttribute('id'); 
        SetDropDownID(ID)
        console.log(" ONjectiDDDDD", dropDownID);
      }

    return (

        <div className=" shadow-lg">
            <header className="px-5 py-4 border-b border-gray-100">
                <h2 className="text-2xl text-white font-bold mb-6">Create Project</h2>
            </header>
            <div className="p-10">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-5 md:grid-cols-3">
                        <div>
                            <div>
                                <label className="block text-sm text-white font-medium mb-1">Project Name<span className="text-red-500">*</span></label>
                                <input className="form-input w-full " {...register("projectName", { required: true })} />
                            </div>
                            <div className="text-xs mt-1 text-red-500">{errors.projectName?.type === 'required' && "Project name is required"}</div>
                        </div>
                        <div>
                            <label className="block text-sm text-white font-medium mb-1" for="country">Owning Party<span className="text-red-500">*</span></label>
                            <select className="form-select w-full" {...register("party", { required: true })} onChange={onChangeHandler}>
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
                            <div className="text-xs mt-1 text-red-500">{errors.party?.type === 'required' && "Owning Party is required"}</div>
                        </div>
                        <div>
                            <div>
                                <label className="block text-sm text-white font-medium mb-1">Contact Email<span className="text-red-500">*</span></label>
                                <input className="form-input w-full " {...register("contactEmail", { required: true })} />
                            </div>
                            <div className="text-xs mt-1 text-red-500">{errors.contactEmail?.type === 'required' && "Contact email is required"}</div>
                        </div>
                        <div>
                            <div>
                                <label className="block text-sm text-white font-medium mb-1">Upload Files <span className="text-red-500">*</span></label>
                                <input className="form-input w-full " type="file" name="file" />
                                {/* <input  {...register("uploadFile", { required: true })} /> */}
                            </div>
                            <div className="text-xs mt-1 text-red-500">{errors.uploadFile?.type === 'required' && "Upload File is required"}</div>
                            
                        </div>
                        <div>
                            <div className="m-6">
                                <button type='submit' className="btn  rounded-lg px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white">Create Project</button>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
            <div class="overflow-x-auto relative mt-20">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 custom-table-dashboard">
                    <thead class="text-xs text-gray-900 uppercase dark:text-gray-400">
                        <tr>
                            <th scope="col" class="py-3 px-6">
                                Party Name
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Name
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        projectData && projectData.length>0 ? 
                        projectData.map((dValue, i) => (
                            <tr key={i}>
                            <td scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{dValue.partyName}</td>
                            <td>{dValue.contactEmail}</td>
                            </tr>
                        ))
                        :
                        <ClipLoader color={color} loading={loading} cssOverride={override} size={50} />
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CreateProject