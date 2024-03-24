import { Link } from 'react-router-dom'
import GenderCheckbox from './GenderCheckbox'
import { useState } from 'react'
import useSignup from '../../hooks/useSignup'

const Signup = () => {

  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmpassword: "",
    gender: ""
  })

  const {loading,signup}=useSignup()

  const handleCheckboxChange=(gender)=>{
      setInputs({...inputs,gender})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    await signup(inputs)
  }


  return (
    <div>
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-grey-400 bg-clip-padding backdrop-filter backdrop-blur-lg 
            bg-opticity-0 ">

          <h1 className="text-3xl font-semibold text-center text-gray-300">
            SignUp <span className="text-slate-700">ChatApp</span>
          </h1>

          <form onSubmit={handleSubmit}>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Full Name</span>
              </label>
              <input type="text" placeholder="Enter Fullname" className="w-full input input-bordered h-10"
              value={inputs.fullname} onChange={(e)=>setInputs({...inputs, fullname:e.target.value})}></input>
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text">Username</span>
              </label>

              <input type="text" placeholder="Enter Username" className="w-full input input-bordered h-10"
              value={inputs.username} onChange={(e)=>setInputs({...inputs, username:e.target.value})}></input>

            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text">Password</span>
              </label>

              <input type="password" placeholder="Enter Password" className="w-full input input-bordered h-10"
              value={inputs.password} onChange={(e)=>setInputs({...inputs, password:e.target.value})}></input>
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text">Confirm Password</span>
              </label>

              <input type="password" placeholder="Enter same Password as above" className="w-full input input-bordered h-10"
              value={inputs.confirmpassword} onChange={(e)=>setInputs({...inputs, confirmpassword:e.target.value})}></input>
            </div>

            <GenderCheckbox onCheckBoxChange={handleCheckboxChange} selectedGender={inputs.gender} />

            <Link to="/login" className="text-sm hover:underline hover:text-slate-900 mt-2 inline-block">
              {"Already"} have an account ?
            </Link>

            <div>
              <button className="btn btn-block btn-sm mt-2"
              disabled={loading}
              > {loading ?<span className='loading loading-spinner'></span>:"Sign Up"}</button>
            </div>


          </form>

        </div>
        <p>© Made by Chetan Desai</p>
      </div>
      
    </div>
  )
}

export default Signup



// const Signup = () => {
//   return (
//     <div>
//       <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
//         <div className="w-full p-6 rounded-lg shadow-md bg-grey-400 bg-clip-padding backdrop-filter backdrop-blur-lg
//             bg-opticity-0 ">

//           <h1 className="text-3xl font-semibold text-center text-gray-300">
//             SignUp <span className="text-slate-700">ChatApp</span>
//           </h1>

//           <form>
//             <div>
//               <label className="label p-2">
//                 <span className="text-base label-text">Full Name</span>
//               </label>

//               <input type="text" placeholder="Enter Fullname" className="w-full input input-bordered h-10"></input>

//             </div>

//             <div>
//               <label className="label p-2">
//                 <span className="text-base label-text">Username</span>
//               </label>

//               <input type="text" placeholder="Enter Username" className="w-full input input-bordered h-10"></input>

//             </div>

//             <div>
//               <label className="label p-2">
//                 <span className="text-base label-text">Confirm Password</span>
//               </label>

//               <input type="password" placeholder="Enter same Password as above" className="w-full input input-bordered h-10"></input>
//             </div>

//             <div>
//               <label className="label p-2">
//                 <span className="text-base label-text">Password</span>
//               </label>

//               <input type="password" placeholder="Enter Password" className="w-full input input-bordered h-10"></input>
//             </div>

//             <GenderCheckbox></GenderCheckbox>

//             <a href="#" className="text-sm hover:underline hover:text-slate-900 mt-2 inline-block">
//               {"Already"} have an account ?
//             </a>

//             <div>
//               <button className="btn btn-block btn-sm mt-2">SignUp</button>
//             </div>


//           </form>

//         </div>
//       </div>
//     </div>
//   )
// }

// export default Signup
