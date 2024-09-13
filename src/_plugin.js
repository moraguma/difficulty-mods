export default class {
  constructor(mod) {
    this.mod = mod;
  }

  postload() {
    if (sc.azu == null) sc.azu = {};
    sc.azu.mod = this.mod;

    let title = null;

    if (this.mod.manifest != null) {
      let titleMaybeLocalized = this.mod.manifest.title;
      title =
        typeof titleMaybeLocalized === 'object' && titleMaybeLocalized != null
          ? titleMaybeLocalized.en_US
          : titleMaybeLocalized;
    } else if (this.mod.displayName != null) {
      title = this.mod.displayName;
    }

    if (title != null && typeof title === 'string' && title.length > 0) {
      sc.azu.modName = title;
    } else {
      sc.azu.modName = this.mod.id;
    }
  }
}
