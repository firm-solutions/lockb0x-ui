import React from 'react'

export default function ChangePassword() {
  return (
    <div className="container mt-20">
    <div className="row custom-row">
            
        <div className="col-lg-4 col-md-8 mx-auto text-center">
            
        <div className="auth-content-box custom-h-w">
            <form action="" className="mt-2 w-full">
                <div className="row">
                <div className="col-12">
                    <input className="form-control w-full " placeholder="Enter your email" />
                </div>
                <div className="col-12">
                    <input className="form-control w-full " placeholder='Enter last password!' />
                </div>
                <div className="col-12 mt-4 text-center d-flex flex-column mt-20">
                    <button type="submit" class="btn mb-3 ">Change Password</button> <br/>
                </div>
                </div>
            </form>
        </div>
        </div>
        
    </div>
</div>
  )
}
