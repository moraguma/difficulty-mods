for (let [key, value] of Object.entries(sc.OPTIONS_DEFINITION)) {
	if(sc.ASSIST_SCALE_ENEMY_HP && value.data == sc.ASSIST_SCALE_ENEMY_HP)
	{ //remove the old scale-enemy-hp from dmitmel's tweak pack, it's redundant and doesn't work as well as mine.
		delete sc.OPTIONS_DEFINITION[key];
	}
	if(sc.ASSIST_TIMING_WINDOW && value.data == sc.ASSIST_TIMING_WINDOW)
	{ //el's tweaks. Make 100% on this option be centered so it's not misaligned with every other option >:(
		sc.ASSIST_TIMING_WINDOW = {
			LOW4: 0.5,
			LOW3: 0.65,
			LOW2: 0.75,
			LOW1: 0.9,
			NORM: 1,
			HIGH1: 1.25,
			HIGH2: 1.5,
			HIGH3: 1.75,
			HIGH4: 2
		};
		value.data = sc.ASSIST_TIMING_WINDOW;
	}
}

//set vanilla damage and freq options to default since they're overridden anyway,
//this means they won't make it count as assist mode if it happens to be non-100% before you enable this mod
sc.options.set("assist-damage", sc.OPTIONS_DEFINITION["assist-damage"].init);
sc.options.set("assist-attack-frequency", sc.OPTIONS_DEFINITION["assist-attack-frequency"].init);
