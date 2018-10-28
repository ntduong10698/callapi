import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../actions/Customer/index';

class TaskForm extends Component {
  constructor(props){
    super(props);
    this.state = {
        id: "",
        address: "",
        brith_date: "",
        email: "",
        gender: "",
        name:"",
        jhi_password:"",
        phone:""
    }
  }
  componentWillMount(){
    if(this.props.itemEditing!==null){
    this.setState({
        id: this.props.itemEditing.id,
        note: this.props.itemEditing.address,
        customer: this.props.itemEditing.brith_date,
        tour: this.props.itemEditing.email,
        customer_id: this.props.itemEditing.gender,
        tour_id: this.props.itemEditing.name,
        category_id: this.props.itemEditing.jhi_password,
        user_id: this.props.itemEditing.phone,
        });
    }else{
      this.onClear();
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.itemEditing){
    this.setState({
        id: nextProps.itemEditing.id,
        note: nextProps.itemEditing.address,
        customer: nextProps.itemEditing.brith_date,
        tour: nextProps.itemEditing.email,
        customer_id: nextProps.itemEditing.gender,
        tour_id: nextProps.itemEditing.name,
        category_id: nextProps.itemEditing.jhi_password,
        user_id: nextProps.itemEditing.phone,
    });
    }else if(nextProps.itemEditing===null){
      this.setState({
        id: "",
        address: "",
        brith_date: "",
        email: "",
        gender: "",
        name:"",
        jhi_password:"",
        phone:""
    });
    }
  }
  onChange =(event)=>{
      var target= event.target;
      var name= target.name;
      var value= target.value;
      this.setState({
        [name]: value
      });
  }
  onSubmit=(event)=>{
    event.preventDefault();
    var {id,address,brith_date,email,gender,name,jhi_password,phone}= this.state;
    var task={id,address,brith_date,email,gender,name,jhi_password,phone};
    this.props.onSave(task);
    this.onClear();
    this.props.onCloseForm()
    }
  onClear=()=>{
    this.setState({
      name: "",
      status: false
    })
  }
  render(){
    if(!this.props.isDisplayForm) return ''; 
    var {id}= this.state;
    return (
      <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">{id!==""?"Cập Nhập Customer":"Thêm Customer"}
                  <span className="fa fa-times-circle text-right"
                    onClick={this.props.onCloseForm}></span>  
              </h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Address:</label>
                  <input type="text" className="form-control" name="address" value={this.state.address}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>Brith_date:</label>
                  <input type="text" className="form-control" name="brith_date" value={this.state.brith_date}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input type="text" className="form-control" name="email" value={this.state.email}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>Name:</label>
                  <input type="text" className="form-control" name="name" value={this.state.name}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>Jhi_password:</label>
                  <input type="text" className="form-control" name="jhi_password" value={this.state.jhi_password}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>Phone:</label>
                  <input type="text" className="form-control" name="phone" value={this.state.phone}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>User_ID:</label>
                  <input type="text" className="form-control" name="user_id" value={this.state.user_id}
                    onChange={this.onChange}/>
                </div><br/>
                <button type="submit" className="btn btn-success">
                  <span className="fa fa-plus mr-5"></span>
                  Lưu Lại</button>&nbsp;
                <button type="reset" className="btn btn-danger"
                  onClick={this.onClear}>
                  <span className="fa fa-close mr-5"></span>
                  Hủy Bỏ</button>
              </form>
            </div>
          </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    isDisplayForm: state.isDisplayForm,
    itemEditing: state.itemEditing
  }
};

const mapDispatchToProps= (dispatch,props) => {
  return  {
    onSaveTask: (task) =>{
      dispatch(actions.saveTask(task));
    },
    onCloseForm: () =>{
      dispatch(actions.closeForm());
    },
    onSave : (task) =>{
      dispatch(actions.saveTasksRequest(task));
    },
    fetchAllTasks : () =>{
      dispatch(actions.actFetchTasksRequest());
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TaskForm);
