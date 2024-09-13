"use strict";

window.difficultymods = {};

difficultymods.SCALE_ENEMY_HP = {
  NORM: 1,
  HIGH1: 1.15,
  HIGH2: 1.30,
  HIGH3: 1.50,
  HIGH4: 1.65,
  HIGH5: 1.80,
  HIGH6: 2.00,
};
difficultymods.XP_GAIN = {
  LOW6: 0.4,
  LOW5: 0.5,
  LOW4: 0.6,
  LOW3: 0.7,
  LOW2: 0.8,
  LOW1: 0.9,
  NORM: 1,
};
difficultymods.ENEMY_DAMAGE = {
  NORM: 1,
  HIGH1: 1.25,
  HIGH2: 1.5,
  HIGH3: 1.75,
  HIGH4: 2.0,
  HIGH5: 2.25,
  HIGH6: 2.5,  
};
difficultymods.HEALING = {
  LOW5: 0.01,
  LOW4: 0.2,
  LOW3: 0.4,
  LOW2: 0.6,
  LOW1: 0.8,
  NORM: 1,
};

let options = {};
for (let [key, value] of Object.entries(sc.OPTIONS_DEFINITION)) {
    options[key] = value;
    switch (key) {
        case "game-sense":
            options["difficultymods-enemy-damage"] = {
				type: 'OBJECT_SLIDER',
				data: difficultymods.ENEMY_DAMAGE,
				init: difficultymods.ENEMY_DAMAGE.NORM,
				cat: sc.OPTION_CATEGORY.GENERAL,
				fill: true,
				showPercentage: true,
				hasDivider: true,
				header: "difficulty-mods"
            };
            options["difficultymods-enemy-hp"] = {
				type: 'OBJECT_SLIDER',
				data: difficultymods.SCALE_ENEMY_HP,
				init: difficultymods.SCALE_ENEMY_HP.NORM,
				cat: sc.OPTION_CATEGORY.GENERAL,
				fill: true,
				showPercentage: true,
				hasDivider: false,
				header: "difficulty-mods"
            };
            options["difficultymods-healing"] = {
				type: 'OBJECT_SLIDER',
				data: difficultymods.HEALING,
				init: difficultymods.HEALING.NORM,
				cat: sc.OPTION_CATEGORY.GENERAL,
				fill: true,
				showPercentage: true,
				hasDivider: false,
				header: "difficulty-mods"
            };
            options["difficultymods-xp-gain"] = {
				type: 'OBJECT_SLIDER',
				data: difficultymods.XP_GAIN,
				init: difficultymods.XP_GAIN.NORM,
				cat: sc.OPTION_CATEGORY.GENERAL,
				fill: true,
				showPercentage: true,
				hasDivider: false,
				header: "difficulty-mods"
            };
            break;
    }
}

sc.OPTIONS_DEFINITION = options;