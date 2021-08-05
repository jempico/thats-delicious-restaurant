import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import autocomplete from './modules/autocomplete';
import typeAhead from './modules/typeAhead';

let address_d = document.querySelector("#address");
let lat_d = document.querySelector("#lat");
let lng_d = document.querySelector("#lng");

autocomplete(address_d,lat_d,lng_d);
typeAhead( $('.search'));