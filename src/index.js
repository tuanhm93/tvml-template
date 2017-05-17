import 'babel-polyfill';
import * as liveReload from '../tools/liveReload';
import * as Actions from './actions';
import { createStore } from 'redux'
import todoApp from './reducers'
import {connect, Provider} from 'lib/tvml-redux.js'
import HomeController from './controllers/HomeController.js'
import views from './views'
import router from './lib/router'

// Redux
let store = createStore(todoApp)
Provider(store);

App.onLaunch = function(options) {
    // Determine the base URL for remote server fetches from launch options, which will be used to resolve the URLs
    // in XML files for this app.
    const baseURL = options.baseURL;

    // Show a loading spinner while additional JavaScript files are being evaluated
    // const loadingDocument = createLoadingDocument();
    // navigationDocument.pushDocument(loadingDocument);
    // evaluateScripts is responsible for loading the JavaScript files neccessary
    // for this app to run. It can be used at any time in your apps lifecycle.
    // new HomeController();
    router.start();
    liveReload.connect(options);
};


/**
 * Convenience function to create a TVML loading document with a specified title.
 */
function createLoadingDocument(title) {
    // If no title has been specified, fall back to "Loading...".
    title = title || "Loading...";

    const template = `<?xml version="1.0" encoding="UTF-8" ?>
        <document>
            <loadingTemplate>
                <activityIndicator>
                    <title style="color: rgb(255, 255, 255)">${title}</title>
                </activityIndicator>
            </loadingTemplate>
        </document>
    `;
    return new DOMParser().parseFromString(template, "application/xml");
}

/**
 * Convenience function to create a TVML alert document with a title and description.
 */
function createAlertDocument(title, description) {
    const template = `<?xml version="1.0" encoding="UTF-8" ?>
        <document>
            <alertTemplate>
                <title>${title}</title>
                <description>${description}</description>
            </alertTemplate>
        </document>
    `;
    return new DOMParser().parseFromString(template, "application/xml");
}

/**
 * Convenience function to create a TVML alert document with a title and description.
 */
function createDescriptiveAlertDocument(title, description) {
    const template = `<?xml version="1.0" encoding="UTF-8" ?>
        <document>
            <descriptiveAlertTemplate>
                <title>${title}</title>
                <description>${description}</description>
            </descriptiveAlertTemplate>
        </document>
    `;
    return new DOMParser().parseFromString(template, "application/xml");
}

/**
 * Convenience function to create a TVML alert for failed evaluateScripts.
 */
function createEvalErrorAlertDocument() {
    const title = "Evaluate Scripts Error";
    const description = [
        "There was an error attempting to evaluate the external JavaScript files.",
        "Please check your network connection and try again later."
    ].join("\n\n");
    return createAlertDocument(title, description);
}


/**
 * Convenience function to create a TVML alert for a failed XMLHttpRequest.
 */
function createLoadErrorAlertDocument(url, xhr) {
    const title = (xhr.status) ? `Fetch Error ${xhr.status}` : "Fetch Error";
    const description = `Could not load document:\n${url}\n(${xhr.statusText})`;
    return createAlertDocument(title, description);
}