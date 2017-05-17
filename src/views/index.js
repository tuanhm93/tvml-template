import router from '../lib/router'
import genericView from './generic'
import HomeTemplate from './home/template.tvml.jade'
import HomeController from '../controllers/HomeController.js'

router('/', genericView({template: HomeTemplate, controller: HomeController}));