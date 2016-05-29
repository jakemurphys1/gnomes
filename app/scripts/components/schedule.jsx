var React = require("react");
var ReactDOM=require("react-dom");
var Backbone = require("backbone");
var $ = require("jquery")
var Input = require("react-bootstrap/lib/Input")
var Parse = require("parse")

var Schedule = React.createClass({
  getInitialState:function(){
      return {
        "events":[],
          "stores":[],
      }
    },
    componentDidMount(){
      var Store = Parse.Object.extend("Stores");
      var storeQuery = new Parse.Query(Store);
      storeQuery.find({
        success: function(theCards){
        self.setState({"stores":theCards});
      }
    })

  //find events info from parse
  var self=this;
  var Event = Parse.Object.extend("Events");
  //calculate one week from today
  var curDay = new Date();
  var eventQuery = new Parse.Query(Event);

      eventQuery.greaterThanOrEqualTo("Date", curDay);
        eventQuery.equalTo("storeName", "JakeGaming");
    eventQuery.find({
      success: function(results) {
        var newResults = results.sort(function(a,b) {
              return new Date(a.get("Date")).getTime() - new Date(b.get("Date")).getTime()
        });
          self.setState({"events":newResults})
          self.forceUpdate();
      },
      error: function(error) {
        console.log("Event Server not find")
      }
  })
    },
  render:function(){
    var eventcount=0;
var allEvents=[];
var rannumbers = [];
var firstone = true;
var loopcount=0;


      var events = this.state.events.forEach(function(thisevent){
        eventcount+=1;
        if(thisevent.get("Date")>=Date.now()){

          //reformat the date
          var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
          ];
          var date = thisevent.get("Date");
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

          if(thisevent.get("startTime")){
      var start = thisevent.get("startTime").split(":")
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

      var end = thisevent.get("endTime").split(":")
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

      var time = <p>{starthr + ":" + startmin + " " + startampm + " To " + endhr + ":" + endmin + " " + endampm}</p>
          allEvents.push(
            <div  key = {"event" + eventcount}>
                <div key={"event" + eventcount}  className="carousel-content">
                  <div className="row">
                    <div className="col-xs-3"><p>{thisevent.get("Name")}</p></div>
                      <div className="col-xs-3"><p>{thisevent.get("Format")}</p></div>
                    <div className="col-xs-3"><p>{redate}</p></div>
                        <div className="col-xs-2"><p className="Time">{time}</p></div>
                          <div className="col-xs-1"><a href={"#details/" + thisevent.id}><p>Details</p></a></div>
                  </div>

                </div>
            </div>
          )
        }
      })
      console.log(allEvents)

    return(
    <div className="Total">
      <div className="row schedule">
        <h1>SCHEDULE</h1>
        <div className="col-xs-3"><h3>Name</h3></div>
        <div className="col-xs-3"><h3>Format</h3></div>
        <div className="col-xs-3"><h3>Date</h3></div>
        <div className="col-xs-2"><h3>Time</h3></div>
        <div className="col-xs-1"><h3></h3></div>
      </div>
        {allEvents}


    </div>
    )

  }
})


module.exports = Schedule;
