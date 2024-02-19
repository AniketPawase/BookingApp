import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";


function LoginPage() {

    //States
    const [email,setEmail]=useState("");
    const[password, setPassword] = useState("");
    const[redirect,setRedirect]=useState(false);
    const {setUser} = useContext(UserContext);

    //
    async function handleSubmit(ev){
        ev.preventDefault();
        try {
            const data = await axios.post('/login',{email,password},{withCredentials: true});
           setUser(data);
            alert('Login com sucesso!');
            setRedirect(true)
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code that falls out of the range of 2xx
                if (error.response.status === 401) {
                  alert('Password is incorrect');
                } else if (error.response.status === 404) {
                  alert('User not found');
                } else {
                  alert('An error occurred');
                }
              } else if (error.request) {
                // The request was made but no response was received
                console.error(error.request);
                alert('No response received from server');
              } else {
                console.error('Error:', error.message);
                alert('An error occurred');
        }
    }
    }
    if(redirect){
      return <Navigate to= {'/'} />}

    return ( 
    <div className="mt-4 grow flex items-center  justify-around">
        <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-lg mx-auto " onSubmit={handleSubmit}>

            <input type="email" 
            placeholder="youremail.com"
            value={email} 
            onChange={ev => setEmail(ev.target.value)}/><br />

            <input  type="password" 
            placeholder="your password"
            value={password}
            onChange={ev => setPassword(ev.target.value)}/><br/>

            <button className="primary">Login</button>
            <div className="text-center py-2 text-gray-500">
                Don't Have an Account yet?
                <Link to={'/register'} className="underline text-black">  Register</Link>
            </div>
        </form>
        </div>
    </div> );
}

export default LoginPage;