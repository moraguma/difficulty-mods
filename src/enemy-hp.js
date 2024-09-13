sc.DifficultyModsIgnoreEnemies = new Set([
  'cargo-crab', 'cargo-crab-extra', 'turret-rhombus', 
  'pillar-large',
  'henry', 'henry-prop',
  'elboss-core',
  'driller', 'default-bot', 'icewall', 'aircon', 'oven',
  'dummy', 'target-bot-2'
]);

sc.CombatParams.inject({
	getStat(a, b) {
		var stat = this.parent(a, b);
		
		if(a=="hp"&&this.combatant!=null)
		{			
			if(this.combatant.party==sc.COMBATANT_PARTY.ENEMY)
			{
				if(this.combatant.difficultyModsScaledHP==null){
					//run once on enemy load
					
					var name = this.combatant.enemyName;
					if(name != null && name.includes('.')) //remove all before the last dot
					{
						name=name.substring(name.lastIndexOf('.')+1);
					}

					this.combatant.difficultyModsScaledHP = 1.0;
					if(!sc.DifficultyModsIgnoreEnemies.has(name))
					{
						this.combatant.difficultyModsScaledHP = sc.options.get("difficultymods-enemy-hp");
						//also scale currentHP, since the arena's level-scaling is odd which makes this necessary there
						this.currentHp = Math.round(this.currentHp * this.combatant.difficultyModsScaledHP);
						
						//handle health bars
						this.combatant.statusGui.currentHp = Math.round(this.combatant.statusGui.currentHp * this.combatant.difficultyModsScaledHP);
						this.combatant.statusGui.targetHp = Math.round(this.combatant.statusGui.targetHp * this.combatant.difficultyModsScaledHP);
					}
				}
				//run every time the HP stat is requested, apply the cached multiplier
				stat = Math.round(stat * this.combatant.difficultyModsScaledHP);
			}			
		}

		return stat;
	},
});
