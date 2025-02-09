sc.CombatParams.inject({
	getHealAmount(a) {
		let amount = this.parent(a);
		if(this.combatant != null && this.combatant.isPlayer){
			amount = Math.round(amount * sc.options.get("difficultymods-healing2"));
		}
		return amount;
	},
});
ig.ENTITY.Player.inject({
	update(...args) {
		if(sc.options.get("difficultymods-healing2") == 0)
		{ //never allow regen. Stuff like sandwiches still show the heal effect with a 0 which is really funny, but regen bugged me a lot
			this.regenTimer = 0;
		}
		this.parent(...args);
	},
});
