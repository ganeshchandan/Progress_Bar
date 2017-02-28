import React from 'react';
import Rating from 'react-rater';
import ProgressBar from './ProgressBar';

export default class Home extends React.Component {

	constructor(){
		super();
		this.state = {progressBarData  : {"buttons": [],"limit": 0,"progressBar": {"order": []},"dropDownData": []}}
	}

	componentDidMount(){
		$.ajax({
      			url: 'http://pb-api.herokuapp.com/bars',
				dataType: 'json',
				cache: false,
				success: function(response) {
				  this.fetchDataFromServer(response);
				}.bind(this),
				error: function(xhr, status, err) {
				  console.error(this.props.url, status, err.toString());
				}.bind(this)
			  });
	}
	
	fetchDataFromServer(response){
		var progressBarData = this.state.progressBarData,
			progressDefaultData = response.bars,
			progressBar = {},
			progressbarOrder = [],
			dropDownData = [];
		progressDefaultData.forEach((barData,index)=>{
			var progressBarId = 'Progress_'+(index+1);
			progressbarOrder.push(progressBarId)
			progressBar[progressBarId] = barData;
			dropDownData.push({name : 'Progress '+(index+1),value:progressBarId})
		});
		progressBar.order = progressbarOrder;
		progressBarData.progressBar = progressBar;
		progressBarData.buttons = response.buttons;
		progressBarData.dropDownData = dropDownData;
		progressBarData.limit = response.limit;
		this.setState({progressBarData : progressBarData});
	}

	generateProgressBar(){
		var self=this,
			generatedProgressBars = [],
			progressBar = this.state.progressBarData.progressBar,
			progressbarOrder = progressBar.order;
		progressbarOrder.forEach((order,index)=>{
			generatedProgressBars.push(<ProgressBar key={index} progressData={progressBar[order]} limit={self.state.progressBarData.limit}/>);
		});
  		return generatedProgressBars;
	}
  	
  	generateDropDown(){
  		var progressBarDropDownData = this.state.progressBarData.dropDownData,
  			dropDownData= [];
  		progressBarDropDownData.forEach((progressBarDrop)=>{
  			dropDownData.push(<option value={progressBarDrop.value}>{progressBarDrop.name}</option>);
  		});	
  		return dropDownData;
  	}
  	
  	generateDropDownButtons(){
  		var self=this,
  			buttons = [],
  			progressBarButtons = this.state.progressBarData.buttons;
  		progressBarButtons.forEach((buttonData,index)=>{
  			buttons.push(<li><button onClick ={self.changeProgresssBarData.bind(this,buttonData)}>{buttonData}</button></li>);
  		});
  		return buttons;
  	}
  	
  	changeProgresssBarData(buttonData){
		var selectedProgressBar = document.getElementById('dropDownSelect').value,
			progressBar = this.state.progressBarData.progressBar,
			currentBarData = progressBar[selectedProgressBar]+buttonData;
			progressBar[selectedProgressBar] = currentBarData < 0 ? 0: currentBarData;
		this.setState({progressBar : progressBar});
  	}
  	
  	render() {
    	return (<section className="progressBarSection">
	    			<div>
	    				{this.generateProgressBar()}
	    			</div>
	    			<div className ="controlPanel" >
	    				<div className="dorpDownDiv">
	    					<select id="dropDownSelect">{this.generateDropDown()}</select>
	    				</div>
	    				<div className= "buttonDiv">
	    					<ul className="buttonsList">{this.generateDropDownButtons()}</ul>
	    				</div>
	    			</div>
				</section>
				);
  	}
}