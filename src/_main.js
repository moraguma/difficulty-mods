"use strict";

window.difficultymods = {};

difficultymods.ENEMY_DAMAGE = {
  LOW6: 0.4,
  LOW5: 0.5,
  LOW4: 0.6,
  LOW3: 0.7,
  LOW2: 0.8,
  LOW1: 0.9,
  NORM: 1,
  HIGH1: 1.25,
  HIGH2: 1.5,
  HIGH3: 1.75,
  HIGH4: 2.0,
  HIGH5: 2.25,
  HIGH6: 2.5,
  HIGH7: 3.0,
  HIGH8: 3.5,
  HIGH9: 4.0
};
difficultymods.SCALE_ENEMY_HP = {
  LOW6: 0.7,
  LOW5: 0.75,
  LOW4: 0.8,
  LOW3: 0.85,
  LOW2: 0.9,
  LOW1: 0.95,
  NORM: 1,
  HIGH1: 1.15,
  HIGH2: 1.30,
  HIGH3: 1.50,
  HIGH4: 1.65,
  HIGH5: 1.80,
  HIGH6: 2.00,
  HIGH7: 2.50,
  HIGH8: 3.00,
  HIGH9: 3.50,
  HIGH10: 4.0
};
difficultymods.ATTACK_FREQ = {
  LOW6: 0.4,
  LOW5: 0.5,
  LOW4: 0.6,
  LOW3: 0.7,
  LOW2: 0.8,
  LOW1: 0.9,
  NORM: 1,
  HIGH1: 1.15,
  HIGH2: 1.30,
  HIGH3: 1.50,
  HIGH4: 1.65,
  HIGH5: 1.80,
  HIGH6: 2.00,
};
difficultymods.HEALING = {
  LOW5: 0.0,
  LOW4: 0.2,
  LOW3: 0.4,
  LOW2: 0.6,
  LOW1: 0.8,
  NORM: 1,
  HIGH1: 1.1,
  HIGH2: 1.2,
  HIGH3: 1.3,
  HIGH4: 1.4,
  HIGH5: 1.5,
};
difficultymods.XP_GAIN = {
  LOW8: 0.2,
  LOW7: 0.3,
  LOW6: 0.4,
  LOW5: 0.5,
  LOW4: 0.6,
  LOW3: 0.7,
  LOW2: 0.8,
  LOW1: 0.9,
  NORM: 1,
  HIGH1: 1.05,
  HIGH2: 1.1,
  HIGH3: 1.2,
  HIGH4: 1.3,
  HIGH5: 1.4,
  HIGH6: 1.5,
};

//fix sliders getting too thin to fit the number
sc.OPTION_GUIS[sc.OPTION_TYPES.OBJECT_SLIDER].inject({
	init(...args){
		this.parent(...args);
		if (this.showPercentage && this.slider.slider.prefWidth < 36)
		{
			this.slider.slider.prefWidth=36;
			this._lastVal=null; //set the previous value as nothing, so "current value is different from previous value" is always true
			this.modelChanged(null, sc.OPTIONS_EVENT.OPTION_CHANGED); //update the size/graphics since the above is true
		}
	}
});

//override vanilla damage and attack-freq reads with the new ones.
//They're new variables so there's no problem if you set it to a non-vanilla value and then unload the mod.
//Also all the variables have 2 at the end to help conflicts with saves that used the old version of this mod.
sc.Combat.inject({ 
	getAssistDamageFactor()
	{
		return sc.options.get("difficultymods-enemy-damage2");
	}
});
sc.Combat.inject({ 
	getAssistAttackFrequency()
	{
		var ret = sc.options.get("difficultymods-attack-freq2");
		sc.newgame.hasHarderEnemies() && (ret = ret * 1.5);
		return ret;
	}
});
sc.GameModel.inject({ 
	isAssistMode()
	{
		return this.parent()
			|| sc.options.get("difficultymods-enemy-damage2") < 1
			|| sc.options.get("difficultymods-enemy-hp2") < 1
			|| sc.options.get("difficultymods-attack-freq2") < 1
			|| sc.options.get("difficultymods-healing2") > 1
			|| sc.options.get("difficultymods-xp-gain2") > 1;
	}
});

let options = {};
let olddamageoption;
let oldfreqoption;
for (let [key, value] of Object.entries(sc.OPTIONS_DEFINITION)) {
    switch (key) {
        case "assist-damage":
			olddamageoption = {key: key, value: value};

            options["difficultymods-enemy-damage2"] = {
				type: 'OBJECT_SLIDER',
				data: difficultymods.ENEMY_DAMAGE,
				init: difficultymods.ENEMY_DAMAGE.NORM,
				cat: sc.OPTION_CATEGORY.ASSISTS,
				fill: true,
				showPercentage: true,
				hasDivider: true,
				header: "combat"
            };
            options["difficultymods-enemy-hp2"] = {
				type: 'OBJECT_SLIDER',
				data: difficultymods.SCALE_ENEMY_HP,
				init: difficultymods.SCALE_ENEMY_HP.NORM,
				cat: sc.OPTION_CATEGORY.ASSISTS,
				fill: true,
				showPercentage: true,
				hasDivider: false,
				header: "combat"
            };
			break;
        case "assist-attack-frequency":
			oldfreqoption = {key: key, value: value};

            options["difficultymods-attack-freq2"] = {
				type: 'OBJECT_SLIDER',
				data: difficultymods.ATTACK_FREQ,
				init: difficultymods.ATTACK_FREQ.NORM,
				cat: sc.OPTION_CATEGORY.ASSISTS,
				fill: true,
				showPercentage: true,
				hasDivider: false,
				header: "combat"
            };
            options["difficultymods-healing2"] = {
				type: 'OBJECT_SLIDER',
				data: difficultymods.HEALING,
				init: difficultymods.HEALING.NORM,
				cat: sc.OPTION_CATEGORY.ASSISTS,
				fill: true,
				showPercentage: true,
				hasDivider: false,
				header: "combat"
            };
            options["difficultymods-xp-gain2"] = {
				type: 'OBJECT_SLIDER',
				data: difficultymods.XP_GAIN,
				init: difficultymods.XP_GAIN.NORM,
				cat: sc.OPTION_CATEGORY.ASSISTS,
				fill: true,
				showPercentage: true,
				hasDivider: false,
				header: "combat"
            };

			//remove default assist option from the list but keep it in memory so reading it isn't null.
			//they're put at the end so it doesn't interfere with el's tweaks
			olddamageoption.value.cat = null;
			options[olddamageoption.key] = olddamageoption.value;
			oldfreqoption.value.cat = null;
			options[oldfreqoption.key] = oldfreqoption.value;
            break;
		default:
		    options[key] = value;
    }
}

sc.OPTIONS_DEFINITION = options;