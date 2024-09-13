sc.CombatParams.inject({
	getHealAmount(a) {
		let amount = this.parent(a);
		if(this.combatant != null && this.combatant.isPlayer){
			amount = Math.round(amount * sc.options.get("difficultymods-healing"));
			if(amount < 1) amount = 1; //healing for 0 is weird but this somehow makes it sensical to me, plus it's funnier
		}
		return amount;
	},
});