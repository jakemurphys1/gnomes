var React = require("react");
var ReactDOM=require("react-dom");
var Backbone = require("backbone");
var $ = require("jquery")
var Input = require("react-bootstrap/lib/Input")
var Parse = require("parse")

var Details = React.createClass({
  getInitialState:function(){
      return {
        "events":[],
          "stores":[],
      }
    },
    componentDidMount:function(){
console.log("whatever")
  //find events info from parse
  var self=this;
  var Event = Parse.Object.extend("Events");
  //calculate one week from today
    console.log("curid",this.props.curId)
  var curDay = new Date();
  var eventQuery = new Parse.Query(Event);

        eventQuery.equalTo("objectId", this.props.curId);
    eventQuery.find({
      success: function(results) {
          self.setState({"events":results})
          self.forceUpdate();
      },
      error: function(error) {
        console.log("Event Server not find")
      }
  })
    },
  render:function(){
var theEvents=[];
var thisevent = this.state.events;
if(thisevent.length>0){

     //reformat the date
     var monthNames = [
       "January", "February", "March",
       "April", "May", "June", "July",
       "August", "September", "October",
       "November", "December"
     ];
     var date = thisevent[0].get("Date");
     var day = date.getUTCDate();
     var monthIndex = date.getMonth();
     var year = date.getFullYear();

     var days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
     Date.prototype.getDayName = function() {
       return days[ this.getDay() ];
     };

     var now = new Date();
     var dayname = date.getDayName();
     var redate = dayname + ", " +  monthNames[monthIndex] + " " + day + " " + year

     if(thisevent[0].get("startTime")){
 var start = thisevent[0].get("startTime").split(":")
 var starthr = start[0];
 var startmin = start[1];
 var startampm = "AM"
 if(parseInt(starthr)>12){
   starthr=parseInt(starthr)-12;
   startampm="PM"
 }
 if(parseInt(starthr)==12){
     startampm="PM"
 }
 if(parseInt(starthr)==0){
   starthr=12;
   startampm="AM"
 }
 if(startmin==undefined){
   startampm=""
   starthr="???"
   startmin=""
 }

 var end = thisevent[0].get("endTime").split(":")
 var endhr = end[0];
 var endmin = end[1];
 var endampm = "AM"
 if(parseInt(endhr)>12){
   endhr=parseInt(endhr)-12;
   endampm="PM"
 }
 if(parseInt(endhr)==12){
     endampm="PM"
 }
 if(parseInt(endhr)==0){
   endhr=12;
   endampm="AM"
 }
 if(endmin==undefined){
   endampm=""
   endhr="???"
   endmin=""
 }
}

 var time = <p>{starthr + ":" + startmin + " " + startampm + " to " + endhr + ":" + endmin + " " + endampm}</p>
     theEvents.push(<div key = {"event"}>
           <div key={"event"}  className="carousel-content">
             <div className="row details">
                 <h1>{thisevent[0].get("Name")}</h1>
                    <h2>{thisevent[0].get("Format")}</h2>
                 <h2>{redate}</h2>
                 <h2>{time}</h2>
               <p>{thisevent[0].get("Description")}</p>
             </div>

           </div>
       </div>)

}

console.log("theEvents", theEvents)

    return(
    <div className="Total">
        {theEvents[0]}
    </div>
    )

  }
})


module.exports = Details;
