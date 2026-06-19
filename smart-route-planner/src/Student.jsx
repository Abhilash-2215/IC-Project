import {useState} from "react";
function Application()
{
    const [info , setInfo]=useState({
        name:"",
        email:"",
        gender:"",
        dob:"",
        skills:""
    });
    const [image , setImage]=useState(null);
    const change = (e)=>{
        const {name , value} = e.target;
        setInfo ({
            ...info,[name]:value
        });
    };
    const skillchange=(e)=>{
        const {value , checked} = e.target;
        if(checked)
            {   setInfo({
                ...info,skills:[...info.skills,value]
            });}
        else
            {
                setInfo({
                ...info,skills:info.skills.filter(
                 skill => skill !==value  
                )
            });}

            };
    
    const uploadimg = (e)=>{
        setImage(e.target.files[0]);
    };
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(
            !info.name ||
            !info.email ||
            !info.gender ||
            !info.dob            
        )
        {
            alert("Please fill all details")
            return ;
        }console.log("Students")
        console.log(info);
        console.log(image);
        alert("Registered");
    };
    return (
        <>
        <div>
            <h1>Registration Form</h1>
            <form onSubmit={handleSubmit}>
                {/*Name*/}
                <label>
                    Name:
                </label>
                <input type="text" name="name" value={info.name} onChange={change}/>
                <br /><br />
                <label>
                    Email:
                </label>
                <input type="text" name="email" value={info.email} onChange={change}/>
                <br /><br />
                <label>
                    Gender:
                </label>
                
                <input type="radio" name="gender" value="Male" onChange={change}/>Male
                
                <input type="radio" name="gender" value="Female" onChange={change}/>Female
                <br /><br />
                <label>
                    D.O.B:
                </label>
                <input type="date" name="dob" value={info.dob} onChange={change}/>
                <br /><br />
                <label>
                    Skills:
                </label>
                
                <input type="checkbox" value="Java" onChange={skillchange} />Java
                
                <input type="checkbox" value="HTML" onChange={skillchange}/>HTML
                
                <input type="checkbox" value="CSS" onChange={skillchange} />CSS
                
                <input type="checkbox" value="JS" onChange={skillchange}/>JS
                <br /><br />
                <label>
                    Profile
                </label>
                <input type="file" accept="image/**" onChange={uploadimg} />
                <br /><br />
                <button type="submit">
                    Submit
                </button>
            </form>
             <h2>Details:</h2>
                    <hr />
                <p>Name:
                    {info.name}
                </p>
                <p>Email:
                    {info.email}
                </p>
                <p>Gender:
                    {info.gender}
                </p>
                <p>D.O.B:
                    {info.dob}
                </p>
                <p> {
                    image && (
                        <div>
                            <img 
                            src={URL.createObjectURL(image)} alt="DP" width="150" />
                        </div>
                    )}
                </p>
        </div>
        </>
    );
}
export default Application;