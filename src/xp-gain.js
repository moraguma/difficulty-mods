function replaceProp(obj, prop, replaceFunc) {
	obj[prop] = replaceFunc(obj[prop]);
}
replaceProp(sc.PlayerLevelTools, "computeExp", (originalComputeExp) => {
	return (...args) => {
		var exp = originalComputeExp.call(sc.PlayerLevelTools, ...args);
		exp = Math.round(exp * sc.options.get("difficultymods-xp-gain"));
		if(exp < 1) exp = 1;
		return exp;
	};
});