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
        borderColor: "white",
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
                <div className="container mt-20">
                <div className="row custom-row">
                        
                    <div className="col-lg-4 col-md-8 mx-auto text-center">
                        
                    <div className="auth-content-box custom-h-w">
                        <form action="" className="mt-2 w-full" onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                            <div className="col-12">
                                <input className="form-control w-full " {...register("projectName", { required: true })} placeholder="Project Name" />
                                <div className="text-xs mt-1 text-red-500">{errors.projectName?.type === 'required' && "Project name is required"}</div>
                            </div>
                            <div className="col-12">
                            <select className="form-control w-full" {...register("party", { required: true })} onChange={onChangeHandler}>
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
                            <div className="col-12">
                                <input className="form-control w-full " placeholder='Your Email' {...register("contactEmail", { required: true })} />
                                <div className="text-xs mt-1 text-red-500">{errors.contactEmail?.type === 'required' && "Contact email is required"}</div>
                            </div>
                            <div className="col-12">
                                <input className="form-control w-full " type="text" name="file" placeholder='Upload Files here' />
                                <div className="text-xs mt-1 text-red-500">{errors.uploadFile?.type === 'required' && "Upload File is required"}</div>
                            </div>
                            <div className="col-12 mt-4 text-center d-flex flex-column mt-20">
                            <button type="submit" class="btn mb-3 ">Create Project</button> <br/>
                            </div>
                            </div>
                        </form>
                    </div>
                    </div>
                    
                </div>
            </div>





            </div>
            <table class="table-auto w-full  rounded border-separate border-spacing-y-4 custom-table-dashboard mt-20">
                <thead class="text-white text-left   tracking-wider">
                    <tr>
                        <th scope="col" class="py-3 px-4 text-center">
                            Party Name
                        </th>
                        <th scope="col" class="py-3 px-4 text-center">
                            Name
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        projectData && projectData.length>0 ? 
                        projectData.map((dValue, i) => (
                            <tr  key={i} class="bg-stone-800 mt-6 text-white rounded">
                                <td class="p-4 text-center">{dValue.partyName}</td>
                                <td class="p-4 text-center">{dValue.contactEmail}</td>
                            </tr>
                        ))
                        :
                        <div className="w-full h-full d-flex align-items-center justify-content-center">
                            <ClipLoader color={color} loading={loading} cssOverride={override} size={50} />
                        </div> 
                    }
                </tbody>
            </table>  
        </div>
    )
}

export default CreateProject