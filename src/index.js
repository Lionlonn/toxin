import './template.pug';

import './index.scss';

import { mult, sum } from './modules/calc';


const img = new Image();
img.src = menu-3;



var html = template (locals);
console.log(mult(5, 4));
console.log(sum(5, 4));

