sc.OptionModel.inject({
	get(a, b){
		var result = this.parent(a, b);
		if(a=="assist-attack-frequency") result *= sc.options.get("difficultymods-attack-freq");
		return result;
	}
});