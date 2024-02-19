import { useState } from "react";
import { Link } from "react-router-dom";
import axios from  'axios';



function Register() {
    const [name,setName]= useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Registeration API
   async function registerUser(ev){
    ev.preventDefault();
try {
    await axios.post('/register',{
        name,
        email,
        password,
    });
    alert('Resistration Succesfull.. Now you can login')
} catch (error) {
    alert('Registration failed try Again')
}
}

    

    return ( 
    <div className="mt-4 grow flex items-center  justify-around">
        <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-lg mx-auto " onSubmit={registerUser}>
            <label >Name</label>
            
            <input type="text" 
            placeholder="johnDoe" 
            value={name} 
            onChange={event => setName(event.target.value)}>   
            </input>

            <label >Email</label>
            <input type="email" 
            placeholder="youremail.com"
            value={email} 
            onChange={event => setEmail(event.target.value)}/><br/>

            <label >Password</label>
            <input  type="password" placeholder="your password"
            value={password}
            onChange={event=> setPassword(event.target.value) } /><br/>  
            <button className="primary">Register</button>
            <div className="text-center py-2 text-gray-500">
                Already a Member?
                <Link to={'/login'} className="underline text-black">  Login</Link>
            </div>
        </form>
        </div>
    </div> );
}

export default Register;