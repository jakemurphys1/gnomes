var React = require("react");
var ReactDOM=require("react-dom");
var Backbone = require("backbone");
var $ = require("jquery")
var Input = require("react-bootstrap/lib/Input")
var Parse = require("parse")

var Footer = React.createClass({
  getInitialState:function(){
      return {
          "stores":[],
      }
    },
    componentDidMount:function(){
  //find events info from parse
  var self=this;
  var Store = Parse.Object.extend("Stores");
  //calculate one week from today
  var eventQuery = new Parse.Query(Store);

        eventQuery.equalTo("storeName", "JakeGaming");
    eventQuery.find({
      success: function(results) {
          self.setState({"stores":results})
          self.forceUpdate();
      },
      error: function(error) {
        console.log("Event Server not find")
      }
  })
    },
  render:function(){
var store = this.state.stores;
var days = [];
var address =[];
var phone;
var email;
if(store.length>0){
  console.log(store[0].get("Mon"));
  days[0]=store[0].get("Sun");
  days[1]=store[0].get("Mon");
  days[2]=store[0].get("Tues");
  days[3]=store[0].get("Wed");
  days[4]=store[0].get("Thur");
  days[5]=store[0].get("Fri");
  days[6]=store[0].get("Sat");
      address[0]= store[0].get("address");
      address[1]= store[0].get("state");
      address[2]= store[0].get("city");
      address[3]= store[0].get("zip");
phone=store[0].get("phone");
email=store[0].get("email");
}


    return(
    <div className="Total">
      <div className="row">
        <div className="col-md-3 col-sm-12 bottom info">
          <h3>Contact Us</h3>
          <p>Phone: {phone}</p>
          <p>Email: {email}</p>
          <p><a href="https://www.facebook.com/groups/284052025052403/?fref=ts">Facebook</a></p>
          <p><a href="https://twitter.com/gnomegorillagam">Twitter</a></p>
        </div>
        <div className="col-md-5 col-sm-12 bottom">
            <h3>Hours of Operation</h3>
              <div className="col-md-6 col-sm-12">
                <p>Monday: {days[0]}</p>
                <p>Tuesday: {days[1]}</p>
                <p>Wednesday: {days[2]}</p>
                <p>Thursday: {days[3]}</p>
              </div>
              <div className="col-md-6 col-sm-12">
                <p>Friday: {days[4]}</p>
                <p>Saturday: {days[5]}</p>
                <p>Sunday: {days[6]}</p>
              </div>
        </div>
        <div className="col-md-3 col-sm-12 bottom">
          <h3>Address</h3>
          <p>{address[0]}</p>
          <p>{address[1] + ", " + address[2] + " " + address[3]}</p>
        </div>
      </div>
      <div className="row tribute">
        <div className="col-md-4"><p>Website designed and created by Jake Murphy</p></div>
        <div className="col-md-4"><p><a href = "http://jakemurphywebdesigner.com/">jakemurphywebdesigner.com</a></p></div>
        <div className="col-md-4"><p>Information courtesy of <a href="http://www.gaminglocal.com/">gaminglocal.com</a></p></div>
      </div>
    </div>
    )

  }
})


module.exports = Footer;
