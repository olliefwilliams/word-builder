'strict mode';

import arc from './modules/arc.js';
import drag from './modules/drag.js'; // also imports the interact.js library
import letterReset from './modules/letter-reset';
import boxSplit from './modules/box-split';

// forEach polyfill for IE
if (window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = Array.prototype.forEach;
}
if (window.HTMLCollection && !HTMLCollection.prototype.forEach) {
	HTMLCollection.prototype.forEach = Array.prototype.forEach;
}

arc();
drag();
letterReset();
boxSplit();