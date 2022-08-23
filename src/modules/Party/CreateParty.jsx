import React from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import baseURL from '../../api/axios'
import useAlert from "../../common/hooks/useAlert";
import useAuth from '../../hooks/useAuth';
function CreateParty() {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const { showAlert } = useAlert();
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
                        console.log(response.data)
                        showAlert({type:'success', message: 'Party has been created', duration: 2000 });
                        e.target.reset()
                    }
                });
              
            } catch (e) {
                console.log(e)
            }
            
        }
      
    return (

        <div className=" bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
                <h2 className="text-2xl text-gray-800 font-bold mb-6">Create Party</h2>
            </header>
            <div className="p-10">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-5 md:grid-cols-3">
                        <div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Party Name <span className="text-red-500">*</span></label>
                                <input className="form-input w-full " {...register("partyName", { required: true })} />
                            </div>
                            <div className="text-xs mt-1 text-red-500">{errors.partyName?.type === 'required' && "Party Name is required"}</div>
                        </div>
                        <div>
                            <div className="m-6">
                                <button type='submit' className="btn  rounded-lg px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white">Create Party</button>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateParty