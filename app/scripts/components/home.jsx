var React = require("react");
var ReactDOM=require("react-dom");
var Backbone = require("backbone");
var $ = require("jquery")
var Input = require("react-bootstrap/lib/Input")
var Parse = require("parse")

var Home = React.createClass({
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
  var oneMoreWeek = new Date();
  var curDay = new Date();
  oneMoreWeek.setDate(oneMoreWeek.getDate() + 7);
  var eventQuery = new Parse.Query(Event);

      eventQuery.lessThanOrEqualTo("Date", oneMoreWeek);
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
var sixEvents=[];
var rannumbers = [];
var firstone = true;
var loopcount=0;

    while(sixEvents.length<6 && loopcount<50){
      loopcount+=1;
      for(var i =1;i<7;i++){
        var newrand = Math.floor((Math.random() * this.state.events.length) + 1);
        rannumbers.push(newrand)
      }

      var events = this.state.events.forEach(function(thisevent){

        //if this one was chosen
        var chosen = false
        for(var i =0;i<rannumbers.length;i++){
          if(eventcount==rannumbers[i]){
            chosen=true
          }
        }
        eventcount+=1;

        if(chosen && thisevent.get("Date")>=Date.now()){

          var activeWord="";
          if(firstone){
            activeWord="active"
          }
          firstone=false;

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

          //Time stuff
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

          sixEvents.push(
            <div  key = {"event" + eventcount} className={"item " + activeWord}>
                <div key={"event" + eventcount}  className="carousel-content">
                  <h3>{thisevent.get("Name")}</h3>
                    <p>{thisevent.get("Format")}</p>
                        <p>{redate}</p>
                              <p>{time}</p>
                </div>
            </div>
          )
        }
      })
    }

    return(
    <div className="Total">

      <div className = "row">
        <div className="col-md-10 col-md-offset-1 events">
          <h1>Upcoming Events</h1>
          <div id="text-carousel" className="carousel slide" data-ride="carousel">

            <div className="row">
              <div className="col-xs-offset-1 col-xs-10">
                <div className="carousel-inner Inner">
                  {sixEvents}
                </div>
              </div>
            </div>

            <a className="left carousel-control" href="#text-carousel" data-slide="prev">
              <span className="glyphicon glyphicon-chevron-left"></span>
            </a>
            <a className="right carousel-control" href="#text-carousel" data-slide="next">
              <span className="glyphicon glyphicon-chevron-right"></span>
            </a>
          </div>
        </div>
    </div>


      <div className="row mainpagerow">
        <a href="#schedule"><div className="col-md-3 col-md-offset-1 col-sm-6 col-xs-12 mainpage">
          <div className = "imageContainer"><img className="mainImage" src = "images/Magicpic6.jpg"/></div>
            <h2>Schedule</h2>
        </div></a>

      <div className="col-md-3 col-md-offset-1 col-sm-6 col-xs-12 mainpage">
          <div className = "imageContainer"><img className="mainImage" src = "images/Magicpics5.jpg"/></div>
            <h2>Cards</h2>
        </div>

      <div className="col-md-3 col-md-offset-1 col-sm-6 col-xs-12 mainpage">
        <div className = "imageContainer"><img className="mainImage" src = "images/Magicpic2.jpg"/></div>
          <h2>Specials</h2>
      </div>

    </div>

    </div>
    )

  }
})


module.exports = Home;