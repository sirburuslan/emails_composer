/**
 * @file Index
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file gathers all fonts classes in one place for faster usage
 */

// Import types
import { font_type } from '../types/types.index.js';

// Import the fonts
import * as FontAmatic from './collection/font.amatic.js';
import * as FontArimo from './collection/font.arimo.js';
import * as FontCaveat from './collection/font.caveat.js';
import * as FontCinzel from './collection/font.cinzel.js';
import * as FontExo from './collection/font.exo.js';
import * as FontHelvetica from './collection/font.helvetica.js';
import * as FontMontserrat from './collection/font.montserrat.js';
import * as FontOpensans from './collection/font.opensans.js';
import * as FontPhudu from './collection/font.phudu.js';
import * as FontPoppins from './collection/font.poppins.js';
import * as FontLato from './collection/font.lato.js';
import * as FontNotoSans from './collection/font.notosans.js';
import * as FontNotoSansDisplay from './collection/font.notosansdisplay.js';
import * as FontUbuntu from './collection/font.ubuntu.js';
import * as FontIndieflower from './collection/font.indieflower.js';
import * as FontJost from './collection/font.jost.js';
import * as FontKalam from './collection/font.kalam.js';
import * as FontRoboto from './collection/font.roboto.js';
import * as FontSacramento from './collection/font.sacramento.js';
import * as FontShadowsintolight from './collection/font.shadowsintolight.js';
import * as FontNunito from './collection/font.nunito.js';
import * as FontWorkSans from './collection/font.worksans.js';
import * as FontYellowtail from './collection/font.yellowtail.js';

// Initialize fonts
let amatic: font_type = new FontAmatic.Resources.Fonts.Amatic().get_info();
let arimo: font_type = new FontArimo.Resources.Fonts.Arimo().get_info();
let caveat: font_type = new FontCaveat.Resources.Fonts.Caveat().get_info();
let cinzel: font_type = new FontCinzel.Resources.Fonts.Cinzel().get_info();
let exo: font_type = new FontExo.Resources.Fonts.Exo().get_info();
let helvetica: font_type = new FontHelvetica.Resources.Fonts.Helvetica().get_info();
let montserrat: font_type = new FontMontserrat.Resources.Fonts.Montserrat().get_info();
let opensans: font_type = new FontOpensans.Resources.Fonts.Opensans().get_info();
let phudu: font_type = new FontPhudu.Resources.Fonts.Phudu().get_info();
let poppins: font_type = new FontPoppins.Resources.Fonts.Poppins().get_info();
let lato: font_type = new FontLato.Resources.Fonts.Lato().get_info();
let notosans: font_type = new FontNotoSans.Resources.Fonts.Notosans().get_info();
let notosansdisplay: font_type = new FontNotoSansDisplay.Resources.Fonts.Notosansdisplay().get_info();
let ubuntu: font_type = new FontUbuntu.Resources.Fonts.Ubuntu().get_info();
let indieflower: font_type = new FontIndieflower.Resources.Fonts.Indieflower().get_info();
let jost: font_type = new FontJost.Resources.Fonts.Jost().get_info();
let kalam: font_type = new FontKalam.Resources.Fonts.Kalam().get_info();
let roboto: font_type = new FontRoboto.Resources.Fonts.Roboto().get_info();
let sacramento: font_type = new FontSacramento.Resources.Fonts.Sacramento().get_info();
let shadowsintolight: font_type = new FontShadowsintolight.Resources.Fonts.Shadowsintolight().get_info();
let nunito: font_type = new FontNunito.Resources.Fonts.Nunito().get_info();
let worksans: font_type = new FontWorkSans.Resources.Fonts.Worksans().get_info();
let yellowtail: font_type = new FontYellowtail.Resources.Fonts.Yellowtail().get_info();

// Export the fonts
export {
    amatic,
    arimo,
    caveat,
    cinzel,
    exo,
    helvetica,
    indieflower,
    jost,
    kalam,
    lato,
    montserrat,
    notosans,
    notosansdisplay,
    nunito,
    opensans,
    phudu,
    poppins,
    roboto,
    sacramento,
    shadowsintolight,
    ubuntu,
    worksans,
    yellowtail
}