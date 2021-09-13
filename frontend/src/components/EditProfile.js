import React, { Component } from 'react';
import axios from 'axios';

class EditProfile extends Component {

    constructor(props){
        super(props);

        this.state ={
            userid:"",
            fName:"",
            lName:"",
            uName:"",
            email:"",
            password:""
        }
    }

    handleInputChange = (e)=>{
        const {name,value} = e.target;
        this.setState({
            ...this.state,
            [name]:value
        })
    }

    onSubmit =(e)=>{

        const id = this.props.match.params.id;

        e.preventDefault();

        const {fName,lName,uName,email,password} = this.state;

        const data={
            fName:fName,
            lName:lName,
            uName:uName,
            email:email,
            password:password
        }
        console.log(data);

        axios.put(`http://localhost:8015/profile/update/${id}`,data).then((res)=>{
            if(res.data.success){
                alert("Profile Updated Successfully");
                this.setState(
                    {
                        fName:"",
                        lName:"",
                        uName:"",
                        email:"",
                        password:""
                    }
                )
            }          
            
        })   
        
    }

    onDelete =(id)=>{
  
        axios.delete(`http://localhost:8015/profile/delete/${id}`).then((res) =>{
        
          alert("Deleted Successfully");
        
        //   this.retrieveProfiles();
        })
        this.props.history.push('/'); 
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        this.state.userid = id;

        axios.get(`http://localhost:8015/profile/${id}`).then((res) => {
            if(res.data.success) {
                this.setState({                    
                    fName:res.data.profile.fName,
                    lName:res.data.profile.lName,
                    uName:res.data.profile.uName,
                    email:res.data.profile.email,
                    password:res.data.profile.password
                });
                console.log(this.state.profile);                
            }
        });        
    }
    render() {
        return (
          <div>
          <div class="container">
           <div class="main-body">    
             <div class="row gutters-sm">
               <div class="col-md-4 mb-3">
                 <div class="card">
                   <div class="card-body">
                     <div class="d-flex flex-column align-items-center text-center">
                       {/* <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150"> */}
                       <div class="mt-3">
                         <h4>{this.state.fName} &nbsp; {this.state.lName}</h4>
                         <p class="text-secondary mb-1">@{this.state.uName}</p>                           
                           <a href={`/profile/${this.state.userid}`}> <button class="btn btn-primary">
                         &nbsp; Cancel 
                           </button></a>                      
                       </div>
                     </div>
                   </div>
                 </div>                  
               </div>
               <form className="needs-validation" noValidate>
                  <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}>First Name</label>
                        <input type="text"
                            className="form-control"
                            name="fName"
                            placeholder="Enter First Name"
                            value={this.state.fName}
                            onChange={this.handleInputChange} />                    
                    </div>
                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}>Last Name</label>
                        <input type="text"
                            className="form-control"
                            name="lName"
                            placeholder="Enter Last Name"
                            value={this.state.lName}
                            onChange={this.handleInputChange} />                    
                    </div>
                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}>User Name</label>
                        <input type="text"
                            className="form-control"
                            name="uName"
                            placeholder="Enter User Name"
                            value={this.state.uName}
                            onChange={this.handleInputChange} />                    
                    </div>
                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}>Email</label>
                        <input type="text"
                            className="form-control"
                            name="email"
                            placeholder="Enter Email"
                            value={this.state.email}
                            onChange={this.handleInputChange} />                    
                    </div>
                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}>Password</label>
                        <input type="text"
                            className="form-control"
                            name="password"
                            placeholder="Enter Password"
                            value={this.state.password}
                            onChange={this.handleInputChange} />                    
                    </div>
    
                    <button className="btn btn-success" type="submit" onClick={this.onSubmit}>   
                        <i className="far fa-check-square"> </i>
                        &nbsp; Update
                    </button>
    
                </form>
             </div>
           </div>
       </div>      
      </div>
        );
    }
}
export default EditProfile;