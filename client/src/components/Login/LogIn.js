import './styles.css';
import React, { Component } from 'react';
import axios from 'axios';
import { authorize } from '../../utils/authorize'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { logInUser } from './../../actions/userActions';
import bg1 from './img/bg1.png';


class LogIn extends Component {
  state = {
    errormsg: '',
    error: false
  }

  componentDidMount() {
    const token = localStorage.getItem('access_token');
    authorize(token).then(result => {
      if (result.success) {
        this.props.logInUser(result.user);
        this.props.history.push('/');
      }
      else {
        if (result.remove) {
          localStorage.removeItem('access_token');
        }
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/login', {
      username: e.target[0].value,
      password: e.target[1].value
    })
      .then(res => {
        let user = res.data.user;
        if (res.data.success) {
          // saving access token in the browser
          localStorage.setItem('access_token', res.data.token);
          // adding user to the redux store
          this.props.logInUser(user);

          this.props.history.push('/');
        }
        else {
          this.setState({
            errormsg: res.data.msg,
            error: true
          });
        }
      });
  }

  render() {
    let msgBlock = this.props.location.state && this.props.location.state.success ? (
      <div className="alert alert-success">
        <strong>Success: </strong> {this.props.location.state.msg}
      </div>
    ) : (
        ''
      );
    if (this.props.location.state)
      this.props.location.state.success = false;
    let errBlock = this.state.error ? (
      <div className="alert alert-danger">
        <strong>Error: </strong> {this.state.errormsg}
      </div>
    ) : ('');
    
      return (

        

        <div className="container-register">

<span><h3 id="title">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Shri Vaishnav Vidyapeeth Vishwavidyalaya&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</h3> </span> <br></br>


          <div className="error">
            {errBlock}
          </div>
          <div className="card mb-3 w-95 " id="card">
            <div className="row no-gutters">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8" >
                <div className="bd-example">
                  <div className="flex-centered">


        {/* <span><h2 id="title2">Welcomes you to StudentZ<span role="img" aria-label="Earth">&#127759;</span>n </h2></span><br></br>  */}

                    <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
  
                      <ol className="carousel-indicators">
                        <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                        <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                      </ol>
  
                      <div className="carousel-inner">
  
                        <div className="carousel-item active">
                          <img src={bg1} className="d-block w-100" alt="Responsive" />
                          <div className="carousel-caption d-none d-md-block">
                            {/* <h2>Your one-stop destination for books</h2> */}
                          </div>
                        </div>
  
                        
  
                        
                      </div>
  
                      <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                      </a>
  
                      <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
  
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                <div className="card-body">
                  <form className="registerform" onSubmit={this.handleSubmit}>
                   

<div className="form-group" data-validate="Enter username">
              <label htmlFor="Username">&emsp; Username</label>
              <input type="text" className="form-control" name="username" aria-describedby="emailHelp" placeholder="Username" />
              <span className="focus-input100" data-placeholder="&#xf207;"></span>
            </div>


            <div className="form-group">
              <br></br>
              <label htmlFor="Password">&emsp;Password</label>
              <input type="password" className="form-control" name="password" placeholder="Password" />
            </div>

            <button type="submit" className="btn btn-primary" id="index-submit">Submit</button>
            <span className="psw">Don't have an account? <Link to="/signup" id="forgot"> Register now.</Link></span>


                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    logInUser: (user) => {
      dispatch(logInUser(user)); // calling a dispatch action
    }
  }
}

export default connect(null, mapDispatchToProps)(LogIn);
