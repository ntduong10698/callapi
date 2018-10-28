import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../actions/Comment/index';

class TaskForm extends Component {
  constructor(props){
    super(props);
    this.state = {
        id: "",
        comment_detail: "",
        customer_id: "",
        tour_id: "",
        user_id:""
    }
  }
  componentWillMount(){
    if(this.props.itemEditing!==null){
    this.setState({
        id: this.props.itemEditing.id,
        comment_detail: this.props.itemEditing.comment_detail,
        customer_id: this.props.itemEditing.customer_id,
        tour_id: this.props.itemEditing.tour_id,
        user_id: this.props.itemEditing.tour_id,
        });
    }else{
      this.onClear();
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.itemEditing){
    this.setState({
        id: nextProps.itemEditing.id,
        comment_detail: nextProps.itemEditing.comment_detail,
        customer_id: nextProps.itemEditing.customer_id,
        tour_id: nextProps.itemEditing.tour_id,
        user_id: nextProps.itemEditing.tour_id,
    });
    }else if(nextProps.itemEditing===null){
      this.setState({
        id: "",
        comment_detail: "",
        customer_id: "",
        tour_id: "",
        user_id:""
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
    var {id,comment_detail,customer_id,tour_id,user_id}= this.state;
    var task={id,comment_detail,customer_id,tour_id,user_id};
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
              <h3 className="panel-title">{id!==""?"Cập Nhập Comment":"Thêm Comment"}
                  <span className="fa fa-times-circle text-right"
                    onClick={this.props.onCloseForm}></span>  
              </h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Comment_detail:</label>
                  <input type="text" className="form-control" name="comment_detail" value={this.state.comment_detail}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>Customer_ID:</label>
                  <input type="text" className="form-control" name="customer_id" value={this.state.customer_id}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>Tour_ID:</label>
                  <input type="text" className="form-control" name="tour_id" value={this.state.tour_id}
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
