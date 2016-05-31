var Backbone=require("backbone");
var $ = require("jquery");
var React = require("react");
var ReactDOM=require("react-dom");
var Input = require("react-bootstrap/lib/Input");
var ButtonInput= require("react-bootstrap/lib/ButtonInput")
var Parse = require("parse")


var homeContainer= document.getElementById("body")
var HomeForm =require("./components/home.jsx")
var ScheduleForm =require("./components/schedule.jsx")
var DetailForm =require("./components/detail.jsx")
var FooterForm =require("./components/footer.jsx")
var ContactForm =require("./components/contact.jsx")

Parse.initialize("GLID");
Parse.serverURL = 'http://gaminglocal.herokuapp.com';


    ReactDOM.render(<FooterForm router={this}/>,document.getElementById("footer"))

var Router = Backbone.Router.extend({
  routes:{
    "":"home",
    "schedule":"schedule",
    "details/:name":"details",
    "contact":"contact",
  },
  home:function(){
    ReactDOM.unmountComponentAtNode(homeContainer);
    ReactDOM.render(<HomeForm router={this}/>,homeContainer)
  },
  schedule:function(){
    ReactDOM.unmountComponentAtNode(homeContainer);
    ReactDOM.render(<ScheduleForm router={this}/>,homeContainer)
  },
  details:function(id){
    console.log("id",id)
    ReactDOM.unmountComponentAtNode(homeContainer);
    ReactDOM.render(<DetailForm curId={id} router={this}/>,homeContainer)
  },
  contact:function(){
    ReactDOM.unmountComponentAtNode(homeContainer);
    ReactDOM.render(<ContactForm router={this}/>,homeContainer)
  },
})


var router = new Router();
Backbone.history.start();
