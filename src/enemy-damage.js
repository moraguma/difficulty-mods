ig.ENTITY.Player.inject({
	onPreDamageModification(a,b,c,d,e,f) {
		e.damage = Math.round(e.damage * sc.options.get("difficultymods-enemy-damage"));			
		return this.parent(a,b,c,d,e,f);
	},
});