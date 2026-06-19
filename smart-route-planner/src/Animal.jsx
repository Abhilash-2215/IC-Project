function Hello()
{
    return (
            <p style={{textAlign:"left"}}>Hello</p>
        );
}

function Galaxy(props)
{
    return (
        < div style={{
            textAlign:"left"
        }}>
        <h4>Name:{props.name}</h4>
        <h4>Process:{props.process}</h4>
        </div>
    );
}
function Star()
{
    return (
        <Galaxy name="Sun" 
        process="Nuclear Fission and Fusion"></Galaxy>
    );
}
function Summary(props)
{
    return (
        <p style={{textAlign:"justify"}}>
            Results-driven and highly motivated professional 
            seeking a {props.job} position in a leading
            {props.company}. Possess strong knowledge and hands-on
            experience in {props.skill1}, {props.skill2}, and {props.skill3}.
            Adept at problem-solving, teamwork, and delivering
            high-quality technical solutions. Passionate about 
            learning new technologies and contributing to 
            organizational growth through innovation and continuous 
            improvement. 
            Eager to leverage technical expertise and analytical skills 
            to achieve business objectives and drive success in a 
            dynamic corporate environment.
        </p>
    );
}
function Animator (){
    return (
        <Summary
        job="Animator"
        company="Garena"
        skill1="Unreal Engine"
        skill2="Blender"
        skill3="Graphic Design"
        ></Summary>
    );
}
function Animal() {
    return (
       <>
       <h1>Animals</h1>
       <div style={{display:"flex",gap:"20px"}}>
        <p
        style={{textAlign:"justify"}}
        >
            In 1924, Hidesaburō Ueno, an agricultural science professor at Tokyo Imperial University, adopted a golden-brown Akita puppy and named him Hachi. The two formed an incredibly tight bond. Every morning, Hachikō would walk with Professor Ueno to the Shibuya train station. When the workday ended, the devoted dog would return to the station right on time to greet his master as he got off the train.
        </p>
        <img 
        style={{width:100}}
        src="https://i.pinimg.com/736x/7c/5d/93/7c5d9348e5bf8a0fec9a7162155d66dd.jpg" alt="Dog" />
       </div>
       <Hello></Hello>
       <Star></Star>
       <Animator></Animator>
     </>  
       
    );
}
export default Animal;