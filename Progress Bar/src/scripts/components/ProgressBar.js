import React from 'react';
import Rating from 'react-rater';

export default class ProgressBar extends React.Component {

  	render() {
  		var data = Math.round(this.props.progressData * 100 / this.props.limit),
  			barWidth = this.props.progressData >= this.props.limit ? '100' : data,
  			bardataDispaly = data+' %',
  			limitExecedClassName = data > 100 ? 'limitExeced' : '';
    	return (<div className= "progressBar ">
    				<span>{bardataDispaly}</span>
    				<div className= {"progressBarInside "+limitExecedClassName} style={{width :barWidth+'%'}}>
    				</div>
    			</div>);
  	}
}