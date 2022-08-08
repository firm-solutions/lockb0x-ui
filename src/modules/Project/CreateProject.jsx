import React from 'react'
import { useForm } from "react-hook-form";

function CreateProject() {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const onSubmit = data => console.log(data);
    return (

        <div className=" bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
                <h2 className="text-2xl text-gray-800 font-bold mb-6">Create Project</h2>
            </header>
            <div className="p-10">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-5 md:grid-cols-3">
                        <div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Project Name<span className="text-red-500">*</span></label>
                                <input className="form-input w-full " {...register("projectName", { required: true })} />
                            </div>
                            <div className="text-xs mt-1 text-red-500">{errors.projectName?.type === 'required' && "Project name is required"}</div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" for="country">Owning Party<span className="text-red-500">*</span></label>
                            <select className="form-select w-full" {...register("party", { required: true })}>
                                <option></option>
                                <option>Party One</option>
                                <option>Party Two</option>
                                <option>Party Three</option>
                            </select>
                            <div className="text-xs mt-1 text-red-500">{errors.party?.type === 'required' && "Owning Party is required"}</div>
                        </div>
                        <div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Contact Email<span className="text-red-500">*</span></label>
                                <input className="form-input w-full " {...register("contactEmail", { required: true })} />
                            </div>
                            <div className="text-xs mt-1 text-red-500">{errors.contactEmail?.type === 'required' && "Contact email is required"}</div>
                        </div>
                        <div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Upload Files <span className="text-red-500">*</span></label>
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
        </div>
    )
}

export default CreateProject