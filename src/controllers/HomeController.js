import {connect} from 'lib/tvml-redux.js'
import HomeTemplate from '../views/home/template.tvml.jade'

class HomeController {
	constructor() {
		this.currentDOM = null;
		this.init();
	}

	init() {
		this.createDOM();
		this.onRefresh();
	}

	onRefresh() {
		this.onClear();
	}

	onClear() {

	}
	createDOM() {
		this.currentDOM = HomeTemplate();
	    navigationDocument.pushDocument(this.currentDOM);
		this.setUpEvent();
	}

	setUpEvent() {
		this.currentDOM.add
	}
}

function mapData(state) {
	return {

	}
}

export default connect(mapData)(HomeController);

