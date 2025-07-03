var t = Object.defineProperty,
  e = (e, s, i) =>
    ((e, s, i) =>
      s in e
        ? t(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i))(e, "symbol" != typeof s ? s + "" : s, i);
import { p as s } from "./phaser-C2RWnc_5.js";
!(function () {
  const t = document.createElement("link").relList;
  if (!(t && t.supports && t.supports("modulepreload"))) {
    for (const t of document.querySelectorAll('link[rel="modulepreload"]'))
      e(t);
    new MutationObserver((t) => {
      for (const s of t)
        if ("childList" === s.type)
          for (const t of s.addedNodes)
            "LINK" === t.tagName && "modulepreload" === t.rel && e(t);
    }).observe(document, { childList: !0, subtree: !0 });
  }
  function e(t) {
    if (t.ep) return;
    t.ep = !0;
    const e = (function (t) {
      const e = {};
      return (
        t.integrity && (e.integrity = t.integrity),
        t.referrerPolicy && (e.referrerPolicy = t.referrerPolicy),
        "use-credentials" === t.crossOrigin
          ? (e.credentials = "include")
          : "anonymous" === t.crossOrigin
          ? (e.credentials = "omit")
          : (e.credentials = "same-origin"),
        e
      );
    })(t);
    fetch(t.href, e);
  }
})();
const i = "ammoFlow_",
  a = 13088922,
  n = 15132908,
  o = "#6D6A59",
  r = 7170649,
  h = "#ECE3C6",
  c = 15524806,
  l = "#A49C8E",
  d = 10787982,
  m = 13198653,
  u = "#D9D6B1",
  p = 14276273,
  g = 9077618;
class y extends Phaser.Physics.Arcade.Image {
  constructor(t, s, i) {
    super(t, s, i, "projectile"),
      e(this, "scene"),
      e(this, "ammoData"),
      this.setScale(0.5),
      (this.scene = t),
      t.add.existing(this),
      t.physics.add.existing(this);
  }
  initProj(t, e, s, i) {
    this.enableBody(!0, t, e),
      this.setActive(!0),
      this.setVisible(!0),
      (this.ammoData = i);
    const a = this.body;
    a.setSize(20, 20),
      a.setVelocity(0, 0),
      a.setAcceleration(0),
      (a.onWorldBounds = !0),
      this.scene.physics.velocityFromRotation(s, i.speed, a.velocity),
      (this.rotation = s),
      this.scene.time.addEvent({
        delay: 100,
        callback: this.updateRotation,
        callbackScope: this,
        loop: !0,
      });
  }
  updateRotation() {
    const t = this.body,
      e = t.velocity.x,
      s = t.velocity.y;
    this.rotation = Math.atan2(s, e);
  }
  disable() {
    this.disableBody(), this.setActive(!1), this.setVisible(!1);
  }
}
var f = ((t) => (
  (t[(t.firing = 0)] = "firing"),
  (t[(t.idle = 1)] = "idle"),
  (t[(t.empty = 2)] = "empty"),
  t
))(f || {});
class w extends Phaser.GameObjects.Image {
  constructor(t, s, i, a, n, o) {
    super(t, i, a, n),
      e(this, "scene"),
      e(this, "warehouse"),
      e(this, "pos"),
      e(this, "target"),
      e(this, "turretConfig"),
      e(this, "turretType"),
      e(this, "fireCooldown", 0),
      e(this, "currentAmmoData"),
      e(this, "isAutoLoading", !1),
      e(this, "_ammoCount", 0),
      e(this, "ammoType"),
      e(this, "_status", f.idle),
      e(this, "fireRangeCircle"),
      e(this, "nameLabel"),
      (this.scene = t),
      (this.warehouse = s),
      t.add.existing(this),
      this.setInteractive({ cursor: "pointer" }),
      this.on("pointerover", () => {
        this.showNameLabel();
      }),
      this.on("pointerout", () => {
        this.hideNameLabel();
      }),
      (this.pos = { x: i, y: a }),
      (this.turretType = n),
      (this.turretConfig = t.cache.json.get("turrets")[n]),
      (this.ammoType = o),
      (this.fireRangeCircle = this.scene.add.graphics()),
      this.setAmmoType(o);
  }
  get status() {
    return f[this._status].toLocaleUpperCase();
  }
  set status(t) {
    this._status !== t &&
      ((this._status = t), this.emit("statusChange", this.status));
  }
  get ammoCount() {
    return this._ammoCount;
  }
  set ammoCount(t) {
    (this._ammoCount = t), this.emit("ammoChange", this._ammoCount);
  }
  get fireRange() {
    return (
      this.turretConfig.range +
      this.turretConfig.range * this.currentAmmoData.rangeMod
    );
  }
  fire() {
    var t;
    if (!this.isArcadeBody(null == (t = this.target) ? void 0 : t.body)) return;
    let e = Phaser.Math.Angle.BetweenPoints(this, this.target.body.center);
    if (null === e) return;
    const s = this.turretConfig.spread;
    (e += Phaser.Math.DegToRad(Phaser.Math.Between(-s, s))),
      (this.rotation = e);
    const i = this.scene.projectiles.getFirstDead(
      !0,
      this.x,
      this.y,
      "projectile"
    );
    (this.status = f.firing),
      i.initProj(this.x, this.y, e, this.currentAmmoData),
      (this.ammoCount = this.ammoCount - 1);
  }
  showNameLabel() {
    this.nameLabel ||
      (this.nameLabel = this.scene.add
        .text(this.x, this.y - 40, this.turretType, {
          fontFamily: "monospace",
          fontSize: "18px",
          color: h,
          backgroundColor: o,
          padding: { left: 6, right: 6, top: 2, bottom: 2 },
          align: "center",
        })
        .setOrigin(0.5)
        .setDepth(100));
  }
  hideNameLabel() {
    var t;
    null == (t = this.nameLabel) || t.destroy(), (this.nameLabel = void 0);
  }
  setAmmoType(t) {
    const e = this.warehouse.getAmmoStats(this.turretType, t);
    e &&
      (this.unloadAmmo(),
      (this.currentAmmoData = e),
      (this.target = void 0),
      (this.ammoType = t),
      this.emit("ammoTypeChange", this.ammoType));
  }
  preUpdate(t, e) {
    if (
      ((this.fireCooldown -= e / 1e3),
      this.emit("cd", this.fireCooldown / this.turretConfig.fireRate),
      0 == this.ammoCount)
    )
      return (
        this.isAutoLoading && this.loadAmmo(), void (this.status = f.empty)
      );
    if ((this.target || this.findTarget(), !this.target))
      return void (this.status = f.idle);
    if (!this.isArcadeBody(this.target.body)) return;
    const s = Phaser.Math.Distance.BetweenPoints(
      this.target.body.center,
      this.pos
    );
    !this.target.active || s > this.fireRange
      ? (this.target = void 0)
      : this.fireCooldown > 0 ||
        (this.fire(), (this.fireCooldown = this.turretConfig.fireRate));
  }
  showFireRange() {
    this.fireRangeCircle.lineStyle(4, n, 0.8),
      this.fireRangeCircle.strokeCircle(this.pos.x, this.pos.y, this.fireRange),
      this.fireRangeCircle.lineStyle(2, n, 0.5),
      this.fireRangeCircle.lineBetween(
        this.pos.x,
        this.pos.y,
        this.pos.x - this.fireRange,
        this.pos.y
      ),
      this.fireRangeCircle.lineBetween(
        this.pos.x,
        this.pos.y,
        this.pos.x + this.fireRange,
        this.pos.y
      ),
      this.fireRangeCircle.lineBetween(
        this.pos.x,
        this.pos.y,
        this.pos.x,
        this.pos.y - this.fireRange
      ),
      this.fireRangeCircle.lineBetween(
        this.pos.x,
        this.pos.y,
        this.pos.x,
        this.pos.y + this.fireRange
      );
  }
  hideFireRange() {
    this.fireRangeCircle.clear();
  }
  findTarget() {
    const t = this.scene.physics.closest(
      this,
      this.scene.units.getChildren().filter((t) => {
        var e;
        const s = t.unitConfig.type === this.currentAmmoData.type;
        return (
          !!this.isArcadeBody(t.body) &&
          t.active &&
          s &&
          Phaser.Math.Distance.BetweenPoints(
            null == (e = t.body) ? void 0 : e.center,
            this.pos
          ) < this.fireRange
        );
      })
    );
    t && (this.target = t);
  }
  loadAmmo() {
    this._ammoCount + this.turretConfig.ammoSizeLoad >
      this.turretConfig.ammoMaxLoad ||
      (this.warehouse.consumeAmmo(
        this.turretType,
        this.ammoType,
        this.turretConfig.ammoSizeLoad
      ) &&
        (this.ammoCount = this._ammoCount + this.turretConfig.ammoSizeLoad));
  }
  unloadAmmo() {
    const t = this._ammoCount;
    this.warehouse.addAmmo(this.turretType, this.ammoType, t),
      (this.ammoCount = 0);
  }
  switchAutoLoading() {
    this.isAutoLoading = !this.isAutoLoading;
  }
  isArcadeBody(t) {
    return t instanceof Phaser.Physics.Arcade.Body;
  }
}
class v {
  constructor(t) {
    e(this, "events", new Phaser.Events.EventEmitter()),
      e(this, "ammoData"),
      e(this, "inventory", {
        machineGun: {},
        plasmaCannon: {},
        flakCannon: {},
        railgun: {},
        artillery: {},
      }),
      (this.ammoData = t);
    for (const e in t) for (const s in t[e]) this.inventory[e][s] = 0;
  }
  addAmmo(t, e, s) {
    this.inventory[t][e] || (this.inventory[t][e] = 0),
      (this.inventory[t][e] += s),
      this.events.emit(`${t}.${e}`, this.inventory[t][e]);
  }
  consumeAmmo(t, e, s) {
    return (
      (this.inventory[t][e] || 0) >= s &&
      ((this.inventory[t][e] -= s),
      this.events.emit(`${t}.${e}`, this.inventory[t][e]),
      !0)
    );
  }
  getAmmoCount(t, e) {
    return this.inventory[t][e] || 0;
  }
  getAmmoStats(t, e) {
    var s;
    return null == (s = this.ammoData[t]) ? void 0 : s[e];
  }
  getAll() {
    return this.inventory;
  }
}
class x {
  constructor(t, s) {
    e(this, "warehouse"),
      e(this, "controlPanel"),
      e(this, "activeWorkers", 0),
      e(this, "productionCd", 1),
      e(this, "productionRate", 1),
      e(this, "productionPerCycle", 0),
      e(this, "task"),
      e(this, "events", new Phaser.Events.EventEmitter()),
      e(this, "ammoType"),
      e(this, "productionConfigs"),
      (this.warehouse = s.warehouse),
      (this.controlPanel = s),
      (this.productionConfigs = t.cache.json.get("factories"));
  }
  update() {
    0 != this.activeWorkers &&
      this.task &&
      ((this.productionCd -= 0.1),
      this.events.emit("cdTick", this.productionCd / this.productionRate),
      this.productionCd > 0 ||
        (this.produce(), (this.productionCd = this.productionRate)));
  }
  produce() {
    this.task &&
      ("repair" !== this.task
        ? this.ammoType &&
          this.warehouse.addAmmo(
            this.task,
            this.ammoType,
            1 * this.productionPerCycle * this.activeWorkers
          )
        : (this.controlPanel.health =
            this.controlPanel.health + this.activeWorkers));
  }
  addWorker(t = 1) {
    const e = Math.min(this.controlPanel.workersAvailable, t);
    0 !== e &&
      (this.controlPanel.takeWorker(e),
      (this.activeWorkers += e),
      this.events.emit("activeWorkerChange", this.activeWorkers));
  }
  removeWorker(t = 1) {
    const e = this.activeWorkers - t;
    e < 0 ||
      ((this.activeWorkers = e),
      this.controlPanel.returnWorker(t),
      this.events.emit("activeWorkerChange", this.activeWorkers));
  }
  switchToRepair() {
    (this.task = "repair"),
      (this.productionRate = 10),
      (this.productionCd = this.productionRate),
      (this.productionPerCycle = 1),
      this.events.emit("taskChanged");
  }
  setAmmoProduction(t, e) {
    (this.task === t && this.ammoType == e) ||
      ((this.task = t),
      (this.ammoType = e),
      (this.productionRate = this.productionConfigs[t].rate),
      (this.productionPerCycle = this.productionConfigs[t].scale),
      (this.productionCd = this.productionRate),
      this.events.emit("taskChanged"));
  }
}
const S = class t {
  constructor() {
    e(this, "bgm"),
      e(this, "masterVolume", 1),
      e(this, "sfxVolume", 1),
      e(this, "bgmVolume", 1),
      e(this, "isLocked", !0),
      this.loadFromLocalStorage();
  }
  static getInstance() {
    return t.instance || (t.instance = new t()), t.instance;
  }
  loadFromLocalStorage() {
    const t = localStorage.getItem(`${i}sound`);
    if (t)
      try {
        const { master: e, bgm: s, sfx: i } = JSON.parse(t);
        (this.masterVolume = e), (this.sfxVolume = i), (this.bgmVolume = s);
      } catch {
        console.warn("Failed to parse sound settings from localStorage.");
      }
  }
  saveToLocalStorage() {
    const t = {
      master: this.masterVolume,
      sfx: this.sfxVolume,
      bgm: this.bgmVolume,
    };
    localStorage.setItem(`${i}sound`, JSON.stringify(t));
  }
  playSFX(t, e, s = {}) {
    return (
      !this.isLocked &&
      t.sound.play(e, {
        ...s,
        volume: (s.volume ?? 1) * this.sfxVolume * this.masterVolume,
      })
    );
  }
  playBGM(t, e, s = {}) {
    this.isLocked
      ? t.input.once("pointerup", () => {
          (this.isLocked = !1), this.playBGM(t, e, s);
        })
      : (this.bgm && this.bgm.stop(),
        (this.bgm = t.sound.add(e, {
          loop: !0,
          ...s,
          volume: (s.volume ?? 1) * this.bgmVolume * this.masterVolume,
        })),
        this.bgm.play());
  }
  setMasterVolume(t) {
    (this.masterVolume = t), this.saveToLocalStorage(), this.updateBGMVolume();
  }
  setSFXVolume(t) {
    (this.sfxVolume = t), this.saveToLocalStorage();
  }
  setBGMVolume(t) {
    (this.bgmVolume = t), this.saveToLocalStorage(), this.updateBGMVolume();
  }
  getMasterVolume() {
    return this.masterVolume;
  }
  getBGMVolume() {
    return this.bgmVolume;
  }
  getSFXVolume() {
    return this.sfxVolume;
  }
  updateBGMVolume() {
    var t;
    (null == (t = this.bgm) ? void 0 : t.isPlaying) &&
      this.bgm.setVolume(this.bgmVolume * this.masterVolume);
  }
  unlock() {
    this.isLocked = !1;
  }
};
e(S, "instance");
let b = S;
const T = {
    MachineGun: class extends w {
      constructor(t, e, s, i) {
        super(t, e, s, i, "machineGun", "default");
      }
    },
    Artillery: class extends w {
      constructor(t, e, s, i) {
        super(t, e, s, i, "artillery", "default");
      }
      fire() {
        if (!this.target) return;
        const t = this.target.body,
          e = t.center,
          s = t.velocity,
          i =
            Phaser.Math.Distance.BetweenPoints(this, e) /
            this.currentAmmoData.speed,
          a = e.x + s.x * i,
          n = e.y + s.y * i,
          o = new Phaser.Math.Vector2(a, n),
          r = this.turretConfig.spread,
          h = Phaser.Math.DegToRad(Phaser.Math.Between(-r, r)),
          c = o.clone().rotate(h);
        let l = Phaser.Math.Angle.BetweenPoints(this, c);
        (this.rotation = l), (this.status = f.firing);
        const d = this.scene.add.rectangle(this.x, this.y, 10, 10, 16777215);
        d.postFX.addBloom(16777215, 1, 1, 1, 2),
          this.scene.tweens.add({
            targets: d,
            x: o.x,
            y: o.y,
            ease: "Quad.easeInOut",
            duration: 1e3 * i,
            onComplete: () => {
              d.destroy(), this.createExplosion(o);
            },
          }),
          (this.ammoCount -= 1);
      }
      createExplosion(t) {
        const e = this.currentAmmoData.splashRadius;
        if (!e) return;
        const s = this.scene.add.circle(t.x, t.y, e, 16711680, 0.3);
        this.scene.time.delayedCall(200, () => s.destroy()),
          this.scene.units
            .getChildren()
            .filter((s) => {
              const i = s;
              return (
                i.active &&
                Phaser.Math.Distance.BetweenPoints(i.body.center, t) <= e
              );
            })
            .forEach((t) => {
              t.getHit(this.currentAmmoData.damage);
            });
      }
    },
    Railgun: class extends w {
      constructor(t, e, s, i) {
        super(t, e, s, i, "railgun", "default");
      }
    },
    FlakCannon: class extends w {
      constructor(t, e, s, i) {
        super(t, e, s, i, "flakCannon", "default");
      }
    },
    PlasmaCannon: class extends w {
      constructor(t, s, i, a) {
        super(t, s, i, a, "plasmaCannon", "default"),
          e(this, "beam"),
          e(this, "beamTween"),
          (this.beam = t.add.graphics());
      }
      fire() {
        if (!this.target) return;
        const t = this.target.body,
          e = Phaser.Math.Angle.BetweenPoints(this, t.center);
        (this.status = f.firing), (this.rotation = e);
        const s = this.fireRange,
          i = this.x + Math.cos(e) * s,
          a = this.y + Math.sin(e) * s;
        this.drawBeam(this.x, this.y, i, a),
          this.dealDamageInPath(this.x, this.y, i, a),
          (this.ammoCount -= 1);
      }
      drawBeam(t, e, s, i) {
        var a;
        this.beam.clear(),
          this.beam.setAlpha(1),
          this.beam.lineStyle(12, 16777215, 1),
          this.beam.beginPath(),
          this.beam.moveTo(t, e),
          this.beam.lineTo(s, i),
          this.beam.strokePath(),
          this.beam.lineStyle(24, 16777215, 0.6),
          this.beam.beginPath(),
          this.beam.moveTo(t, e),
          this.beam.lineTo(s, i),
          this.beam.strokePath(),
          null == (a = this.beamTween) || a.remove(),
          (this.beamTween = this.scene.tweens.add({
            targets: this.beam,
            alpha: 0,
            duration: 200,
            ease: "Power2",
          }));
      }
      dealDamageInPath(t, e, s, i) {
        this.scene.units
          .getChildren()
          .filter((a) => {
            var n;
            const o = a;
            if (null == (n = o.body) ? void 0 : n.center)
              return (
                o.active && this.isUnitInLinePath(o.body.center, t, e, s, i)
              );
          })
          .forEach((t) => {
            t.getHit(this.currentAmmoData.damage);
          });
      }
      isUnitInLinePath(t, e, s, i, a) {
        const n = new Phaser.Math.Vector2(e, s),
          o = new Phaser.Math.Vector2(i, a),
          r = t,
          h = n.distance(o);
        return (
          Phaser.Math.Distance.BetweenPoints(r, n) +
            Phaser.Math.Distance.BetweenPoints(r, o) <=
          h + 50
        );
      }
    },
  },
  C = {
    turrets: [
      { type: "MachineGun", x: 845, y: 855 },
      { type: "MachineGun", x: 1235, y: 900 },
      { type: "MachineGun", x: 925, y: 1190 },
      { type: "Artillery", x: 900, y: 1005 },
      { type: "Railgun", x: 1005, y: 1e3 },
      { type: "FlakCannon", x: 1085, y: 1090 },
      { type: "PlasmaCannon", x: 1055, y: 920 },
    ],
  };
class k {
  constructor(t, s = 1) {
    e(this, "scene"),
      e(this, "warehouse"),
      e(this, "turrets", []),
      e(this, "factories", []),
      e(this, "_workersTotal", 1),
      e(this, "workersAvailable", 1),
      e(this, "playerBase"),
      e(this, "lastAlertTime", 0),
      e(this, "alertCooldown", 1e3),
      e(this, "_healthMax", 1e3),
      e(this, "_health", this._healthMax),
      e(this, "events"),
      e(this, "currentTime", 0),
      e(this, "wave", 1),
      e(this, "text"),
      (this.scene = t),
      (this.events = new Phaser.Events.EventEmitter()),
      (this.currentTime = this.getWaveDelay(s));
    const { ammo: i } = t.cache.json.get("ammo");
    (this.warehouse = new v(i)),
      this.factories.push(new x(t, this)),
      this.factories.push(new x(t, this)),
      this.factories.push(new x(t, this)),
      this.factories.push(new x(t, this)),
      this.factories.push(new x(t, this)),
      this.factories.push(new x(t, this)),
      C.turrets.forEach(({ type: e, x: s, y: i }) => {
        const a = T[e];
        a
          ? this.turrets.push(new a(t, this.warehouse, s, i))
          : console.warn(`Unknown turret type: ${e}`);
      }),
      (this.playerBase = this.scene.add.rectangle(1024, 1024, 200, 200, 0, 0)),
      t.physics.add.existing(this.playerBase);
    const a = this.playerBase.body;
    a.setAllowGravity(!1),
      a.setImmovable(!0),
      this.scene.physics.add.overlap(
        this.playerBase,
        t.enemyProjectiles,
        (t, e) => {
          const s = e;
          this.playSoftAlert(), (this.health -= s.ammoData.damage), s.disable();
        }
      ),
      t.time.addEvent({
        delay: 100,
        loop: !0,
        callback: this.update,
        callbackScope: this,
      });
  }
  playSoftAlert() {
    const t = this.scene.time.now;
    t - this.lastAlertTime > this.alertCooldown &&
      (b.getInstance().playSFX(this.scene, "softAlert"),
      (this.lastAlertTime = t));
  }
  get workers() {
    return this._workersTotal;
  }
  set workers(t) {
    (this._workersTotal = t), this.events.emit("workers", t);
  }
  get health() {
    return this._health;
  }
  get healthMax() {
    return this._healthMax;
  }
  set health(t) {
    (this._health = Phaser.Math.Clamp(t, 0, this._healthMax)),
      this.events.emit("health", t),
      this._health <= 0 && this.gameOver();
  }
  gameOver() {
    this.scene.scene.pause(),
      (this.scene.input.enabled = !1),
      this.scene.game.scene.stop("GameUi"),
      this.scene.scene.start("GameOver");
  }
  reset() {
    (this._workersTotal = 1), (this.health = 100);
  }
  getWaveDelay(t) {
    return Math.max(5, 45 * Math.pow(0.95, t - 1));
  }
  update() {
    this.factories.length > 0 && this.factories.forEach((t) => t.update()),
      (this.currentTime -= 0.1),
      this.currentTime <= 0 &&
        (this.events.emit("waveStart", this.wave),
        (this.wave = this.wave + 1),
        this.addWorker(1),
        (this.currentTime = this.getWaveDelay(this.wave))),
      this.events.emit("timerUpdate", this.currentTime);
  }
  addWorker(t) {
    (this._workersTotal += t),
      (this.workersAvailable += t),
      this.events.emit("totalWorkersChange", this._workersTotal),
      this.events.emit("activeWorkersChange", this.workersAvailable);
  }
  takeWorker(t) {
    (this.workersAvailable -= t),
      this.events.emit("activeWorkersChange", this.workersAvailable);
  }
  returnWorker(t) {
    (this.workersAvailable += t),
      this.events.emit("activeWorkersChange", this.workersAvailable);
  }
  createFactory() {}
  createTurret() {}
}
const P = ["line", "flank", "surround", "corner"],
  M = 2048,
  A = 2048,
  O = { light: 1, medium: 3, heavy: 5, air: 2, artillery: 4, airHeavy: 5 };
class I {
  constructor(t) {
    e(this, "scene"),
      e(this, "events", new Phaser.Events.EventEmitter()),
      e(this, "nextWave"),
      e(this, "waveTemplates"),
      (this.scene = t),
      (this.waveTemplates = t.cache.json.get("waveTemplates")),
      this.generateNextWave(),
      this.events.emit("nextWave", this.nextWave),
      t.controlPanel.events.on(
        "waveStart",
        (t) => {
          this.spawn(),
            this.generateNextWave(t),
            this.events.emit("nextWave", this.nextWave);
        },
        this
      );
  }
  generateWave(t) {
    const e = 10 + 3 * t,
      s = this.waveTemplates.filter((e) => t >= e.minWave),
      i = s[Math.floor(Math.random() * s.length)];
    let a = Math.floor(e * i.multiplier);
    const n = {
        light: 0,
        air: 0,
        artillery: 0,
        heavy: 0,
        medium: 0,
        airHeavy: 0,
      },
      { types: o, weights: r } = i;
    for (;;) {
      const t = o.flatMap((t, e) => Array(r[e]).fill(t)),
        e = t[Math.floor(Math.random() * t.length)],
        s = O[e];
      if (a - s >= 0) (n[e] = (n[e] || 0) + 1), (a -= s);
      else if (a < Math.min(...o.map((t) => O[t]))) break;
    }
    return {
      template: i.name,
      spawnPattern: P[Math.floor(Math.random() * P.length)],
      units: n,
    };
  }
  spawnWavePositions(t, e) {
    const s = Object.values(e).reduce((t, e) => t + e, 0);
    switch (t) {
      case "line":
      default:
        return this.spawnLine(s);
      case "flank":
        return this.spawnFlank(s);
      case "surround":
        return this.spawnSurround(s);
      case "corner":
        return this.spawnCorner(s);
    }
  }
  spawnCorner(t) {
    const e = [
      { x: 0, y: 0 },
      { x: M, y: 0 },
      { x: 0, y: A },
      { x: M, y: A },
    ];
    return Array.from({ length: t }, () => {
      const t = e[Math.floor(Math.random() * e.length)];
      return {
        x: t.x + (200 * Math.random() - 100),
        y: t.y + (200 * Math.random() - 100),
      };
    });
  }
  spawnSurround(t, e = 1500) {
    return Array.from({ length: t }, (s, i) => {
      const a = (2 * Math.PI * i) / t;
      return { x: 1024 + Math.cos(a) * e, y: 1024 + Math.sin(a) * e };
    });
  }
  spawnFlank(t) {
    const e = [
        ["left", "right"],
        ["top", "bottom"],
      ],
      [s, i] = e[Math.floor(Math.random() * e.length)],
      a = Math.ceil(t / 2);
    return [...this.spawnLine(a, s), ...this.spawnLine(a, i)];
  }
  spawnLine(t, e) {
    const s = ["top", "bottom", "left", "right"],
      i = e ?? s[Math.floor(Math.random() * s.length)];
    return Array.from({ length: t }, () => {
      switch (i) {
        case "top":
          return { x: Math.random() * M, y: 0 };
        case "bottom":
          return { x: Math.random() * M, y: A };
        case "left":
          return { x: 0, y: Math.random() * A };
        default:
          return { x: M, y: Math.random() * A };
      }
    });
  }
  spawn() {
    const { units: t, positions: e } = this.nextWave,
      s = this.scene.cache.json.get("units");
    let i = 0;
    for (const [a, n] of Object.entries(t))
      for (let t = 0; t < n; t++) {
        const { x: t, y: n } = e[i++];
        let o = this.scene.units.get(t, n, a);
        if (!o) return;
        o.initState(this.scene.controlPanel.playerBase, t, n, a, { ...s[a] });
      }
  }
  generateNextWave(t = 1) {
    const e = this.generateWave(t),
      s = this.spawnWavePositions(e.spawnPattern, e.units);
    this.nextWave = { units: e.units, positions: s };
  }
}
class B extends Phaser.Physics.Arcade.Image {
  constructor(t, s, i, a) {
    super(t, s, i, `u_${a}`),
      e(this, "categoty"),
      e(this, "scene"),
      e(this, "unitConfig"),
      e(this, "canFire", !0),
      e(this, "target"),
      (this.scene = t),
      t.add.existing(this),
      t.physics.add.existing(this);
    const n = this.body;
    n.setCollideWorldBounds(!0),
      (n.onWorldBounds = !0),
      n.setAllowGravity(!1),
      n.setImmovable(!0);
  }
  initState(t, e, s, i, a) {
    (this.target = t),
      (this.unitConfig = a),
      this.setTexture(`u_${i}`),
      this.enableBody(!0, e, s),
      this.setActive(!0),
      this.setVisible(!0);
  }
  update() {
    if (!this.active || !this.target) return;
    const t = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      this.target.x,
      this.target.y
    );
    let e = Phaser.Math.Angle.BetweenPoints(this, this.target.getCenter());
    (this.rotation = e),
      t > this.unitConfig.fireRange
        ? this.scene.physics.moveTo(
            this,
            this.target.x,
            this.target.y,
            this.unitConfig.speed
          )
        : (this.body.velocity.set(0), this.canFire && this.fire());
  }
  fire() {
    this.canFire = !1;
    const t = this.target.body;
    let e = Phaser.Math.Angle.BetweenPoints(this, t.center);
    const s = this.scene.enemyProjectiles.getFirstDead(
      !0,
      this.x,
      this.y,
      "projectile"
    );
    (e += Phaser.Math.DegToRad(Phaser.Math.Between(-5, 5))),
      s.initProj(this.x, this.y, e, {
        speed: 100,
        damage: this.unitConfig.damage,
        rangeMod: 0,
        type: this.unitConfig.type,
      }),
      this.scene.time.delayedCall(1e3 * this.unitConfig.fireRate, () => {
        this.canFire = !0;
      });
  }
  getHit(t) {
    (this.unitConfig.hp -= t), this.unitConfig.hp <= 0 && this.reset();
  }
  reset() {
    this.emit("destroy"),
      this.disableBody(!0),
      this.setActive(!1),
      this.setVisible(!1);
  }
}
class _ {
  static addPulseEffect(t, e, s = 1e3) {
    t.tweens.add({
      targets: e,
      alpha: { from: 1, to: 0.5 },
      yoyo: !0,
      repeat: -1,
      duration: s,
      ease: "Sine.inOut",
    });
  }
  static addScrollingText(t, e, s, i = 1e4) {
    const a = t.add.text(-300, s, e, {
      fontSize: "18px",
      fontFamily: "Lucida Console, monospace",
      color: l,
    });
    return (
      t.tweens.add({
        targets: a,
        x: t.scale.width + 300,
        duration: i,
        repeat: -1,
        ease: "Linear",
      }),
      a
    );
  }
  static addScanlineOverlay(t, e) {
    const s = t.add.graphics(),
      i = t.cameras.main,
      a = (null == e ? void 0 : e.width) ?? i.width,
      n = (null == e ? void 0 : e.height) ?? i.height,
      o = (null == e ? void 0 : e.posX) ?? 0,
      r = (null == e ? void 0 : e.posY) ?? 0,
      h = 0.005 * n,
      c = (null == e ? void 0 : e.alpha) ?? 0.05;
    s.fillStyle(0, c);
    for (let l = r; l < n + r; l += h) s.fillRect(o, l, a, 1);
    return s.setScrollFactor(0), s.setDepth(100), s;
  }
  static createPulseShimmer(t, e, s, i = 5, a) {
    const n = t.add.rectangle(0, 0, e, 30, 16777215, 0.03);
    n.setOrigin(0),
      a && a.add(n),
      t.tweens.add({
        targets: n,
        y: s,
        duration: 1e3 * i,
        repeat: -1,
        ease: "Sine.inOut",
      });
  }
  static addShimmerEffect(t, e, s = 0) {
    t.tweens.add({
      targets: e,
      alpha: { from: 0.7, to: 1 },
      duration: 800,
      yoyo: !0,
      repeat: -1,
      ease: "Sine.inOut",
      delay: s,
    });
  }
  static flickerText(t, e, s = 4, i = 100) {
    const a = e.alpha;
    t.time.addEvent({
      delay: i,
      repeat: 2 * s,
      callback: () => {
        e.alpha = 0 === e.alpha ? a : 0;
      },
    });
  }
  static createVerticalDataStream(t, e = 5) {
    const s = [],
      i = t.scale.width,
      a = t.scale.height,
      n = [
        { color: g, alpha: 0.5 },
        { color: d, alpha: 0.3 },
        { color: p, alpha: 0.4 },
      ];
    for (let o = 0; o < e; o++) {
      const e = Phaser.Utils.Array.GetRandom(n),
        o = Math.random() * i,
        r = t.add.graphics();
      r.lineStyle(1, e.color, e.alpha),
        r.beginPath(),
        r.moveTo(o, 0),
        r.lineTo(o, a),
        r.strokePath(),
        r.setAlpha(e.alpha),
        s.push(r),
        t.tweens.add({
          targets: r,
          x: `+=${Phaser.Math.Between(-20, 20)}`,
          duration: Phaser.Math.Between(4e3, 8e3),
          yoyo: !0,
          repeat: -1,
          ease: "Sine.easeInOut",
        }),
        t.tweens.add({
          targets: r,
          alpha: { from: e.alpha, to: 0.7 * e.alpha },
          duration: Phaser.Math.Between(3e3, 6e3),
          yoyo: !0,
          repeat: -1,
          ease: "Sine.easeInOut",
        });
    }
    return s;
  }
}
class D extends s.Scene {
  constructor() {
    super("Game"),
      e(this, "camera"),
      e(this, "background"),
      e(this, "splashGraphics"),
      e(this, "controlPanel"),
      e(this, "commander"),
      e(this, "projectiles"),
      e(this, "enemyProjectiles"),
      e(this, "units"),
      e(this, "ground");
  }
  create() {
    this.scene.launch("GameUi"),
      this.setupMap(),
      this.setupPhysics(),
      this.setupEntities(),
      (this.splashGraphics = this.add.graphics()),
      this.time.delayedCall(50, () => this.events.emit("gameReady"));
  }
  setupEntities() {
    (this.controlPanel = new k(this)), (this.commander = new I(this));
  }
  setupMap() {
    this.add.image(0, 0, "map").setOrigin(0),
      this.add.image(0, 0, "grid").setOrigin(0).setDepth(1),
      this.add.image(1024, 1024, "base");
    const t = this.cameras.main;
    t.setViewport(448, 28, 1024, 1024),
      t.setBounds(0, 0, 2048, 2048),
      t.setScroll(t.width / 2, t.height / 2),
      _.createPulseShimmer(this, 2 * t.width, 2 * t.height, 20);
  }
  setupPhysics() {
    this.physics.world.setBounds(-1024, -1024, 4096, 4096),
      (this.projectiles = this.physics.add.group({
        classType: y,
        runChildUpdate: !0,
        collideWorldBounds: !0,
      })),
      (this.enemyProjectiles = this.physics.add.group({
        classType: y,
        runChildUpdate: !0,
        collideWorldBounds: !0,
      })),
      (this.units = this.add.group({ classType: B, runChildUpdate: !0 })),
      this.setupWorldBoundsHandler(),
      this.setupProjectileUnitOverlap();
  }
  setupWorldBoundsHandler() {
    this.physics.world.on("worldbounds", (t) => {
      t.gameObject.disableBody(!0, !0);
    });
  }
  setupProjectileUnitOverlap() {
    this.physics.add.overlap(this.projectiles, this.units, (t, e) => {
      var s;
      const i = t,
        a = e;
      if (i.unitConfig.type !== a.ammoData.type) return;
      const { damage: n, ap: o = 0, splashRadius: r = 0 } = a.ammoData,
        h = this.calculateDamage(n, o, i);
      i.getHit(h),
        r > 0 &&
          (null == (s = i.body) ? void 0 : s.center) &&
          this.handleSplashDamage(i, a, r),
        a.disable();
    });
  }
  calculateDamage(t, e, s) {
    return t * (100 / (100 + s.unitConfig.armor * (1 - e)));
  }
  togglePause() {
    const t = this.scene.isPaused();
    t ? this.scene.resume() : this.scene.pause(), this.events.emit("pause", !t);
  }
  pauseGame() {
    this.scene.isPaused() ||
      (this.scene.pause(), this.events.emit("pause", !0));
  }
  resumeGame() {
    this.scene.isPaused() &&
      (this.scene.resume(), this.events.emit("pause", !1));
  }
  setTimeScale(t, e) {
    this.scene.isPaused() && this.scene.resume(),
      (this.physics.world.timeScale = t),
      (this.time.timeScale = e);
  }
  handleSplashDamage(t, e, s) {
    const i = t.body.center;
    this.splashGraphics.clear(),
      this.splashGraphics.fillStyle(m, 0.8),
      this.splashGraphics.fillCircle(i.x, i.y, s),
      this.tweens.add({
        targets: this.splashGraphics,
        duration: 300,
        ease: "Cubic.easeOut",
        onComplete: () => {
          this.splashGraphics.clear(), (this.splashGraphics.alpha = 1);
        },
      }),
      this.physics.overlapCirc(i.x, i.y, s).forEach((a) => {
        var n, o;
        const r = a.gameObject;
        if (
          r &&
          r !== t &&
          r instanceof B &&
          (null == (n = r.body) ? void 0 : n.center) &&
          (null == (o = r.unitConfig) ? void 0 : o.type) === e.ammoData.type &&
          Phaser.Math.Distance.BetweenPoints(i, r.body.center) <= s
        ) {
          const t = this.calculateDamage(
            e.ammoData.damage,
            e.ammoData.ap ?? 0,
            r
          );
          r.getHit(t);
        }
      });
  }
}
class V {
  constructor({
    scene: t,
    x: s = 0,
    y: i = 0,
    width: a,
    height: n,
    title: o,
    action: r,
    borderThickness: h = 5,
  }) {
    e(this, "scene"),
      e(this, "container"),
      e(this, "btn"),
      (this.scene = t),
      (this.container = t.add.container(s, i));
    const c = this.createBorderBg(0, 0, a, n),
      l = this.createBackground(0, 0, a, n, h),
      d = this.createText(0, 0, o);
    this.setupHoverEffect(l, d, r),
      this.container.add([c, l, d]),
      (this.btn = l);
  }
  createBorderBg(t, e, s, i) {
    return this.scene.add.rectangle(t, e, s, i, n);
  }
  createBackground(t, e, s, i, a) {
    return this.scene.add
      .rectangle(t, e, s - 2 * a, i - 2 * a, r)
      .setInteractive({ useHandCursor: !0 });
  }
  createText(t, e, s) {
    return this.scene.add
      .text(t, e, s.toUpperCase(), {
        fontSize: "22px",
        fontStyle: "bold",
        color: "#ffffff",
      })
      .setOrigin(0.5)
      .setShadow(0, 0, u, 4, !0, !0);
  }
  setupHoverEffect(t, e, s) {
    const i = (s) => {
      (t.fillColor = s ? n : r),
        e.setColor(s ? "#444" : "#FFF"),
        e.setShadow(0, 0, u, s ? 10 : 4, !0, !0);
    };
    t.on("pointerover", () => {
      this.playSound("btnUiOver"), i(!0);
    }),
      t.on("pointerout", () => {
        i(!1);
      }),
      t.on("pointerup", () => {
        this.playSound("btnUiPress"), s();
      });
  }
  playSound(t) {
    b.getInstance().playSFX(this.scene, t);
  }
  destroy() {
    var t;
    null == (t = this.container) || t.destroy(!0);
  }
}
class E extends s.Scene {
  constructor() {
    super("GameOver"),
      e(this, "options"),
      (this.options = [
        { title: "Restart", action: () => this.restartGame() },
        { title: "Exit to Main Menu", action: () => this.exitToMainMenu() },
      ]);
  }
  create() {
    const t = this.scale.width,
      e = this.scale.height,
      s = this.add.rectangle(0, 0, t, e, r, 1).setOrigin(0).setInteractive(),
      i = this.add
        .text(t / 2, e / 2 - 160, "MISSION FAILED", {
          fontSize: "48px",
          fontFamily: "Lucida Console, monospace",
          fontStyle: "bold",
          color: "#ffffff",
        })
        .setOrigin(0.5),
      a = t / 2,
      n = e / 2,
      o = this.add.container(a, n);
    let h = 0;
    this.options.forEach((t) => {
      const e = new V({
        scene: this,
        y: h,
        title: t.title,
        action: t.action,
        width: 250,
        height: 40,
      });
      o.add(e.container), (h += 45);
    }),
      this.add.existing(o),
      this.add.existing(i),
      this.add.existing(s),
      _.addScanlineOverlay(this, { height: e, width: t, posX: 0, posY: 0 }),
      _.createVerticalDataStream(this, 8),
      _.createPulseShimmer(this, t, e, 10);
  }
  restartGame() {
    this.scene.start("Game");
  }
  exitToMainMenu() {
    this.scene.stop("Game"), this.scene.start("MainMenu");
  }
}
class W {
  constructor(t, s, i, a, n, o) {
    e(this, "scene"),
      e(this, "container"),
      e(this, "baseImage"),
      e(this, "overImage"),
      e(this, "pressed"),
      e(this, "isActive", !1),
      (this.scene = t),
      (this.container = t.add.container(s, i)),
      (this.baseImage = t.add.image(0, 0, a)),
      (this.overImage = t.add.image(0, 0, n)),
      this.container.add([this.baseImage, this.overImage]),
      o &&
        ((this.pressed = t.add.image(0, 0, o)),
        this.container.add(this.pressed),
        this.pressed.setVisible(!1)),
      this.baseImage.setInteractive(),
      this.baseImage.on("pointerdown", this.onPoniterDown, this),
      this.baseImage.on("pointerup", this.onPoniterUp, this),
      this.baseImage.on("pointerover", this.onPoniterEnter, this),
      this.baseImage.on("pointerout", this.onPointerLeave, this),
      this.overImage.setVisible(!1);
  }
  onPoniterDown() {
    var t;
    null == (t = this.pressed) || t.setVisible(!0);
  }
  onPoniterUp() {
    var t;
    b.getInstance().playSFX(this.scene, "btnPress"),
      this.isActive || null == (t = this.pressed) || t.setVisible(!1);
  }
  onPoniterEnter() {
    b.getInstance().playSFX(this.scene, "btnOver"),
      this.overImage.setVisible(!0);
  }
  onPointerLeave() {
    this.overImage.setVisible(!1);
  }
  toggle() {
    var t, e;
    (this.isActive = !this.isActive),
      this.isActive
        ? null == (t = this.pressed) || t.setVisible(!0)
        : null == (e = this.pressed) || e.setVisible(!1);
  }
  setActive(t) {
    var e;
    (this.isActive = t), null == (e = this.pressed) || e.setVisible(t);
  }
}
class R {
  constructor(t, s, i, a) {
    e(this, "scene"),
      e(this, "turret"),
      e(this, "rangeIsOn", !1),
      e(this, "ammoCount"),
      e(this, "ammoType"),
      e(this, "status"),
      e(this, "name"),
      e(this, "changeAmmo"),
      (this.scene = t),
      (this.turret = a);
    const n = t.add.container(s, i);
    this.createBackground(n),
      this.createTexts(n),
      this.createFillBar(n),
      this.createBtns(n),
      this.registerTurretEvents(),
      this.createChangeAmmoPanel(n);
  }
  createBackground(t) {
    t.add([
      this.scene.add.rectangle(10, 10, 300, 25, n).setOrigin(0),
      this.scene.add.rectangle(10, 30, 300, 100, r).setOrigin(0),
      this.scene.add
        .image(20, 45, `${this.turret.turretType}_ui`)
        .setOrigin(0)
        .setScale(0.5),
      this.scene.add.rectangle(150, 90, 120, 35, n).setOrigin(0),
      this.scene.add.image(0, 0, "turret_panel").setOrigin(0),
      this.scene.add.image(80, 115, "icon_reload_mask").setAngle(90),
    ]);
  }
  createTexts(t) {
    const { scene: e, turret: s } = this;
    this.name = e.add.text(25, 10, ` ${s.turretType.toUpperCase()}`, {
      color: "#2C2C2C",
      fontSize: "18px",
      fontStyle: "bold",
    });
    const i = e.add
      .text(
        190,
        50,
        `${s.turretConfig.ammoSizeLoad}\n${s.turretConfig.ammoMaxLoad}`,
        { color: l, fontSize: "14px", fontStyle: "bold", align: "right" }
      )
      .setOrigin(1, 0);
    (this.ammoCount = e.add
      .text(235, 65, `${s.ammoCount}`, {
        color: "#ECE3C6",
        fontSize: "24px",
        fontStyle: "bold",
        align: "center",
      })
      .setOrigin(0.5)),
      (this.ammoType = e.add.text(30, 107, `${s.ammoType.toUpperCase()}`, {
        color: "#000",
        fontSize: "16px",
        fontStyle: "bold",
      })),
      (this.status = e.add.text(180, 100, `${s.status}`, {
        color: "#2C2C2C",
        fontSize: "20px",
        fontStyle: "bold",
        align: "center",
      })),
      t.add([this.name, i, this.ammoCount, this.ammoType, this.status]);
  }
  createFillBar(t) {
    const e = this.scene.add
      .rectangle(200, 80, 5, 1, 16777215)
      .setOrigin(0.5, 1);
    this.turret.on("cd", (t) => {
      const s = Phaser.Math.Clamp(t, 0, 1);
      (e.height = 30 * (1 - s)), (e.y = 80 - e.height);
    }),
      t.add([e]);
  }
  registerTurretEvents() {
    this.turret.on("statusChange", (t) => {
      this.status.setText(t);
    }),
      this.turret.on("ammoChange", (t) => {
        this.ammoCount.setText(`${t}`);
      }),
      this.turret.on("ammoTypeChange", (t) => {
        this.ammoType.setText(`${t.toUpperCase()}`);
      });
  }
  createBtns(t) {
    const { scene: e, turret: s } = this,
      i = new W(e, 320, 35, "load_normal", "load_over", "load_pressed"),
      a = new W(e, 385, 35, "unload_normal", "unload_over", "unload_pressed"),
      n = new W(e, 395, 93, "auto_load", "auto_load_over", "auto_load_pressed");
    n.baseImage.on("pointerup", () => {
      s.switchAutoLoading(),
        b.getInstance().playSFX(this.scene, "switch"),
        n.setActive(s.isAutoLoading);
    });
    const o = new W(
      e,
      400,
      130,
      "turret_range",
      "turret_range_over",
      "turret_range_pressed"
    );
    o.baseImage.on("pointerdown", () => {
      o.toggle(), this.switchFireRangeZone();
    });
    const r = new W(
      e,
      330,
      90,
      "turret_changeAmmo",
      "turret_changeAmmo_over",
      "turret_changeAmmo_pressed"
    );
    i.baseImage.on("pointerup", s.loadAmmo, s),
      a.baseImage.on("pointerup", s.unloadAmmo, s),
      r.baseImage.on("pointerup", this.toggleChangeAmmoPanel, this),
      t.add([i.container, a.container, n.container, o.container, r.container]);
  }
  switchFireRangeZone() {
    (this.rangeIsOn = !this.rangeIsOn),
      this.rangeIsOn
        ? this.turret.showFireRange()
        : this.turret.hideFireRange();
  }
  createChangeAmmoPanel(t) {
    const { ammo: e } = this.scene.cache.json.get("ammo"),
      s = Object.keys(e[this.turret.turretType]);
    this.changeAmmo = this.scene.add.container(0, 0);
    const i = this.scene.add.rectangle(15, 40, 255, 85, r).setOrigin(0),
      a = s.map((t, e) => {
        const s = e % 2,
          i = 60 + 30 * Math.floor(e / 2),
          a = 80 + 120 * s,
          n = new V({
            scene: this.scene,
            x: a,
            y: i,
            title: t.toUpperCase(),
            action: () => {
              this.turret.setAmmoType(t), this.hideChangeAmmoPanel();
            },
            width: 130,
            height: 30,
            borderThickness: 2,
          });
        return n.container.setScale(0.9), n.container;
      });
    this.changeAmmo.add([i, ...a]),
      this.hideChangeAmmoPanel(),
      t.add(this.changeAmmo);
  }
  toggleChangeAmmoPanel() {
    this.changeAmmo.visible
      ? this.hideChangeAmmoPanel()
      : this.showChangeAmmoPanel();
  }
  hideChangeAmmoPanel() {
    this.changeAmmo.setVisible(!1);
  }
  showChangeAmmoPanel() {
    this.changeAmmo.setVisible(!0);
  }
}
class F {
  constructor(t, s) {
    e(this, "uiScene"),
      e(this, "gameScene"),
      e(this, "zoomMarker"),
      e(this, "zoomValueText"),
      e(this, "pausedText"),
      e(this, "startPointer"),
      e(this, "startScroll"),
      (this.uiScene = t),
      (this.gameScene = s),
      (this.zoomValueText = t.add.text(1230, 45, "ZOOM: 100%", {
        color: h,
        fontSize: "32px",
        fontStyle: "bold",
        align: "center",
        stroke: "#444",
        strokeThickness: 4,
      })),
      t.add.rectangle(1450, 90, 5, 100, c),
      (this.zoomMarker = t.add
        .triangle(1430, 90, 0, -10, 15, 0, 0, 10, c)
        .setOrigin(0)),
      (this.pausedText = t.add
        .text(t.cameras.main.width / 2, 50, "PAUSED", {
          color: h,
          fontSize: "32px",
          fontStyle: "bold",
          align: "center",
          stroke: "#444",
          strokeThickness: 4,
        })
        .setOrigin(0.5)
        .setVisible(!1)),
      this.gameScene.events.on("pause", this.onPauseToggle, this),
      this.mapMovment();
  }
  mapZoom(t) {
    const e = Phaser.Math.Percent(t, 0.5, 1.5),
      s = Phaser.Math.Linear(50, 150, e);
    this.zoomValueText.setText(`ZOOM: ${Math.floor(s)}%`),
      this.uiScene.tweens.add({
        targets: this.zoomMarker,
        y: 140 - 100 * e,
        duration: 100,
      });
  }
  isOutBound(t, e) {
    return t < 450 || t > 1450 || e < 50 || e > 1050;
  }
  onPauseToggle(t) {
    this.pausedText.setVisible(t);
  }
  mapMovment() {
    const t = this.uiScene,
      e = this.gameScene.cameras.main;
    t.input.on("pointerdown", (t) => {
      this.isOutBound(t.x, t.y) ||
        ((this.startPointer = { x: t.x, y: t.y }),
        (this.startScroll = { x: e.scrollX, y: e.scrollY }));
    }),
      t.input.on("pointermove", (t) => {
        if (!this.isOutBound(t.x, t.y) && t.isDown && this.startPointer) {
          const s = t.x - this.startPointer.x,
            i = t.y - this.startPointer.y;
          (e.scrollX = this.startScroll.x - s / e.zoom),
            (e.scrollY = this.startScroll.y - i / e.zoom);
        }
      }),
      t.input.on("wheel", (t, s, i, a) => {
        this.isOutBound(t.x, t.y) ||
          ((e.zoom = Phaser.Math.Clamp(e.zoom - 0.002 * a, 0.5, 1.5)),
          this.mapZoom(e.zoom));
      });
  }
}
class L {
  constructor(t, s) {
    e(this, "commander"),
      e(this, "scene"),
      e(this, "panels"),
      e(this, "totalCount"),
      e(this, "unitsConfig"),
      (this.scene = t),
      (this.commander = s),
      (this.unitsConfig = t.cache.json.get("units")),
      this.commander.events.on("nextWave", this.showInfo, this),
      this.createStaticUI(),
      this.showInfo(this.commander.nextWave);
  }
  createStaticUI() {
    const t = { color: "#444", fontSize: "24px", fontStyle: "bold" };
    this.scene.add.rectangle(1475, 80, 450, 40, 14669509).setOrigin(0);
    const e = this.scene.add.text(1495, 85, "NEXT WAVE INTEL | COUNT:", t);
    (this.totalCount = this.scene.add.text(e.x + e.width + 10, e.y, "", t)),
      this.scene.add.rectangle(1480, 120, 430, 200, r).setOrigin(0);
  }
  createUnitText(t, e, s, i) {
    return this.scene.add.text(t, e, s, {
      fontSize: "18px",
      fontStyle: "bold",
      color: i ?? h,
    });
  }
  showInfo(t) {
    var e;
    null == (e = this.panels) || e.destroy(),
      (this.panels = this.scene.add.container(1485, 120));
    const s = [
      { key: "hp", label: "HP" },
      { key: "fireRange", label: "RNG" },
      { key: "damage", label: "DMG" },
      { key: "armor", label: "ARM" },
      { key: "speed", label: "SPD" },
      { key: "type", label: "TYPE", transform: (t) => t.toUpperCase() },
    ];
    let i = 0,
      a = 0;
    for (const [n, o] of Object.entries(t.units)) {
      if (0 === o) continue;
      i += o;
      const t = this.unitsConfig[n],
        e = this.scene.add.container(0, 55 * a),
        l = s.map((e, s) => {
          const i = 40 + (s % 3) * 100,
            a = 5 + 20 * Math.floor(s / 3),
            n = t[e.key],
            o = e.transform ? e.transform(n) : n;
          return this.createUnitText(i, a, `${e.label}: ${o}`);
        }),
        d = [1, 2].map((t) => {
          const e = 40 + 100 * t - 10;
          return this.scene.add.rectangle(e, 5, 2, 40, c).setOrigin(0);
        });
      e.add([
        this.scene.add.rectangle(0, 0, 400, 50, r).setOrigin(0),
        this.scene.add.image(10, 10, `u_${n}`).setOrigin(0).setScale(0.4),
        ...l,
        ...d,
        this.scene.add
          .text(395, 25, `${o}`, {
            fontSize: "28px",
            fontStyle: "bold",
            color: h,
          })
          .setOrigin(0.5),
        this.scene.add.rectangle(225, 50, 250, 2, c),
      ]),
        this.panels.add(e),
        e.setAlpha(0).setScale(0.95),
        this.scene.tweens.add({
          targets: e,
          alpha: 1,
          scale: 1,
          ease: "Power1",
          duration: 300,
          delay: 100 * a,
        });
      const m = this.scene.add
        .rectangle(0, 0, 430, 2, 16777215)
        .setOrigin(0)
        .setAlpha(0.4);
      e.add(m),
        this.scene.tweens.add({
          targets: m,
          y: 48,
          ease: "Sine.easeInOut",
          duration: 300,
          delay: 100 * a,
          onComplete: () => m.destroy(),
        }),
        a++;
    }
    this.totalCount.setText(i.toString());
  }
}
const G = 1460,
  U = 25,
  $ = {
    fontSize: "24px",
    color: "#444",
    fontFamily: "Lucida Console, monospace",
    fontStyle: "bold",
  };
class z {
  constructor(t, s, i, a, o) {
    e(this, "scene"),
      e(this, "container"),
      e(this, "controlsContainer"),
      e(this, "currentEvent"),
      e(this, "progressBar"),
      e(this, "textTask"),
      e(this, "productionText"),
      e(this, "ammoStock"),
      e(this, "warehouse"),
      e(this, "factory"),
      (this.factory = o),
      (this.scene = t),
      (this.warehouse = s),
      (this.container = t.add.container(i, a)),
      (this.textTask = t.add
        .text(180, 70, o.task ? `${o.task} - ${o.ammoType} ` : "[NO TASK]", $)
        .setOrigin(0.5)),
      (this.ammoStock = t.add.text(U, this.textTask.y + U, "STOCK: 0", $)),
      (this.productionText = t.add.text(
        U,
        this.ammoStock.y + U,
        "PRODUCTION: 0/min",
        $
      ));
    const h = t.add
      .rectangle(U, this.productionText.y + U, 204, 20, r)
      .setOrigin(0);
    (this.progressBar = t.add
      .rectangle(h.x + 2, h.y + 2, 0, 16, n)
      .setOrigin(0)),
      this.factory.events.on("activeWorkerChange", this.updateProd, this),
      this.factory.events.on("taskChanged", this.updateInfo, this),
      this.factory.events.on("cdTick", this.updateProgressBar, this),
      this.container.add([
        t.add.rectangle(180, 90, 360, 180, r),
        t.add.rectangle(180, 90, 350, 170, 14669509),
        t.add.rectangle(0, 0, 360, 40, r).setOrigin(0),
        t.add.text(10, 10, "FACTORY ", { fontSize: "24px" }).setOrigin(0),
        this.productionText,
        this.textTask,
        h,
        this.progressBar,
        this.ammoStock,
      ]),
      _.addScanlineOverlay(this.scene, {
        height: 720,
        width: 350,
        posX: 1450,
        posY: 340,
      });
  }
  updateProd() {
    this.productionText.setText(
      `PRODUCTION: ${
        (60 / this.factory.productionRate) *
        this.factory.productionPerCycle *
        this.factory.activeWorkers
      }/min`
    );
  }
  updateInfo() {
    var t;
    this.warehouse.events.removeListener(
      this.currentEvent,
      this.updateAmmoStock
    ),
      this.textTask.setText(
        this.factory.task
          ? `${this.factory.task.toLocaleUpperCase()} - ${
              (null == (t = this.factory.ammoType)
                ? void 0
                : t.toLocaleUpperCase()) ?? ""
            }`
          : "[NO TASK]"
      ),
      (this.currentEvent = `${this.factory.task}.${this.factory.ammoType}`),
      this.warehouse.events.on(
        `${this.factory.task}.${this.factory.ammoType}`,
        this.updateAmmoStock,
        this
      ),
      this.updateProd(),
      this.factory.task &&
        this.factory.ammoType &&
        "repair" !== this.factory.task &&
        this.updateAmmoStock(
          this.warehouse.getAmmoCount(this.factory.task, this.factory.ammoType)
        );
  }
  updateAmmoStock(t) {
    this.ammoStock.setText(`STOCK: ${t.toString()}`);
  }
  updateProgressBar(t) {
    this.progressBar.width =
      2 * Math.floor(100 * Phaser.Math.Clamp(1 - t, 0, 1));
  }
}
class H {
  constructor(t, s, i) {
    e(this, "container"),
      e(this, "turretIcon"),
      e(this, "turretName"),
      e(this, "ammoText"),
      e(this, "ammoInfo"),
      e(this, "ammoTextLines", []),
      e(this, "scene"),
      (this.scene = t),
      (this.turretIcon = t.add
        .image(20, 60, "machineGun_ui")
        .setScale(0.5)
        .setOrigin(0)),
      (this.turretName = t.add.text(180, 60, "NO AMMO SELECTED", {
        fontSize: "24px",
        fontStyle: "bold",
        color: h,
      })),
      (this.ammoText = t.add.text(180, 80, "", { fontSize: "24px", color: h })),
      (this.ammoInfo = t.add.text(0, 100, "", { fontSize: "24px", color: h })),
      (this.container = t.add.container(s, i, [
        t.add.rectangle(0, 0, 450, 240, r).setOrigin(0),
        t.add.rectangle(0, 0, 450, 40, n).setOrigin(0),
        t.add.text(10, 10, "AMMO DETAILS:", {
          color: "#000",
          fontSize: "20px",
          fontStyle: "bold",
        }),
        this.turretIcon,
        this.turretName,
        this.ammoText,
        this.ammoInfo,
      ])),
      this.container.setDepth(1),
      this.container.setVisible(!1);
  }
  renderAmmoInfo(t) {
    this.ammoTextLines.length > 0 &&
      (this.ammoTextLines.forEach((t) => t.destroy()),
      (this.ammoTextLines = []));
    let e = 20,
      s = 110,
      i = 0;
    for (const [a, n] of Object.entries(t)) {
      const t = this.scene.add.text(e, s, `${a.toUpperCase()}: `, {
          fontSize: "18px",
          color: h,
        }),
        o = this.scene.add.text(e + t.width, s, `${n}`, {
          fontSize: "18px",
          color: "#FFF",
          fontStyle: "bold",
        });
      this.container.add([t, o]),
        this.ammoTextLines.push(t, o),
        i % 2 == 1 ? ((s += 24), (e = 20)) : (e = 240),
        i++;
    }
  }
  update(t, e) {
    const { ammo: s } = this.scene.cache.json.get("ammo");
    this.turretIcon.setTexture(`${t}_ui`),
      this.turretName.setText(t.toLocaleUpperCase()),
      this.ammoText.setText(e.toLocaleUpperCase());
    const i = s[t][e];
    this.renderAmmoInfo(i);
  }
  show() {
    this.container.setVisible(!0);
  }
  hide() {
    this.container.setVisible(!1), this.ammoInfo.setText("");
  }
}
const j = 710;
class N {
  constructor(t, s) {
    e(this, "scene"),
      e(this, "contentContainer"),
      e(this, "tasksContainer"),
      e(this, "factoryPanel"),
      e(this, "ammoDetails"),
      e(this, "scrollbarContainer"),
      e(this, "scrollbarThumb"),
      e(this, "totalScrollHeight", 0),
      (this.scene = t),
      (this.factoryPanel = s),
      (this.ammoDetails = new H(t, 1480, 80)),
      (this.contentContainer = t.add.container(G, 360)),
      (this.tasksContainer = t.add.container());
    const i = this.scene.add.rectangle(-10, -10, 360, 720, r).setOrigin(0);
    this.createScrollbar(),
      this.drawTasks(),
      this.applyMask(),
      this.setupInput(),
      this.contentContainer.add([
        i,
        this.scrollbarContainer,
        this.tasksContainer,
      ]),
      this.sideBtns(),
      this.hide();
  }
  applyMask() {
    const t = this.scene.make.graphics({});
    t.fillStyle(16777215), t.fillRect(G, 360, 350, j);
    const e = t.createGeometryMask();
    this.tasksContainer.setMask(e);
  }
  isOutBound(t, e) {
    return t < 1450 || t > 1900 || e < 400 || e > 1050;
  }
  createLineGraphics(t, e, s, i) {
    const a = this.scene.add.graphics();
    return (
      a.lineStyle(4, n),
      a.lineBetween(t - s, e - i, t - s, e + 1),
      a.lineBetween(t - s - 1, e, t - s + 15, e),
      a
    );
  }
  drawSection(t, e, s, i) {
    const a = this.scene.add.container(t, e);
    i.forEach((t, e) => {
      const i = new V({
        scene: this.scene,
        x: 100,
        y: 50 * e + 80,
        title: t,
        action: () => {
          var e;
          null == (e = this.factoryPanel.selectedFactory) ||
            e.setAmmoProduction(s, t),
            this.ammoDetails.hide(),
            this.hide();
        },
        width: 150,
        height: 40,
        borderThickness: 2,
      });
      i.btn.on("pointerover", () => {
        this.ammoDetails.update(s, t), this.ammoDetails.show();
      }),
        i.btn.on("pointerout", () => {
          this.ammoDetails.hide();
        });
      const n = this.createLineGraphics(i.container.x, i.container.y, 90, 50);
      a.add([i.container, n]);
    }),
      a.add(this.createSectionTitle(s)),
      this.tasksContainer.add(a);
  }
  createSectionTitle(t) {
    return [
      this.scene.add.rectangle(0, 0, 200, 40, n).setOrigin(0),
      this.scene.add.text(10, 10, t.toUpperCase(), {
        fontSize: "18px",
        fontFamily: "Lucida Console, monospace",
        fontStyle: "bold",
        color: "#444",
      }),
    ];
  }
  drawTasks() {
    const { ammo: t } = this.scene.cache.json.get("ammo");
    let e = 0;
    for (const [s, i] of Object.entries(t)) {
      const t = Object.keys(i);
      this.drawSection(0, e, s, t), (e += 50 * t.length + 40 + 20);
    }
    (this.totalScrollHeight = e), this.updateScrollbar();
  }
  sideBtns() {
    const t = new V({
        x: 260,
        y: 20,
        scene: this.scene,
        title: "repair",
        action: () => {
          var t;
          null == (t = this.factoryPanel.selectedFactory) || t.switchToRepair(),
            this.hide();
        },
        width: 100,
        height: 50,
      }).container,
      e = new V({
        x: 260,
        y: 80,
        scene: this.scene,
        title: "cancel",
        action: () => this.hide(),
        width: 100,
        height: 50,
      }).container;
    this.contentContainer.add([t, e]);
  }
  createScrollbar() {
    const t = this.scene.add
      .rectangle(-10, 0, 8, j, 8947848, 0.2)
      .setOrigin(0, 0);
    (this.scrollbarThumb = this.scene.add
      .rectangle(-10, 0, 8, 40, n)
      .setOrigin(0, 0)),
      this.scrollbarThumb.setInteractive({ useHandCursor: !0 }),
      (this.scrollbarContainer = this.scene.add.container(0, 0, [
        t,
        this.scrollbarThumb,
      ]));
  }
  updateScrollbar() {
    const t = this.totalScrollHeight - j;
    if (t <= 0) return void this.scrollbarThumb.setVisible(!1);
    this.scrollbarThumb.setVisible(!0);
    const e = Math.max((j / this.totalScrollHeight) * j, 30);
    this.scrollbarThumb.height = e;
    const s = Phaser.Math.Clamp((0 - this.tasksContainer.y) / t, 0, 1);
    this.scrollbarThumb.y = s * (j - e);
  }
  setupInput() {
    const t = 0 - this.totalScrollHeight + j;
    this.scene.input.on("wheel", (e, s, i, a) => {
      this.isOutBound(e.x, e.y) ||
        ((this.tasksContainer.y = Phaser.Math.Clamp(
          this.tasksContainer.y - 0.5 * a,
          t,
          0
        )),
        this.updateScrollbar());
    });
    let e = !1,
      s = 0;
    this.scene.input.on("pointerdown", (t) => {
      this.isOutBound(t.x, t.y) || ((e = !0), (s = t.y));
    }),
      this.scene.input.on("pointerup", () => {
        e = !1;
      }),
      this.scene.input.on("pointermove", (i) => {
        if (this.isOutBound(i.x, i.y)) return;
        if (!e) return;
        const a = i.y - s;
        (this.tasksContainer.y = Phaser.Math.Clamp(
          this.tasksContainer.y + a,
          t,
          0
        )),
          (s = i.y),
          this.updateScrollbar();
      });
  }
  show() {
    this.contentContainer.setVisible(!0);
  }
  hide() {
    this.contentContainer.setVisible(!1);
  }
}
class Y {
  constructor(t, s, i, a, o) {
    e(this, "scene"),
      e(this, "factory"),
      e(this, "factoryPanel"),
      e(this, "container"),
      (this.scene = t),
      (this.factoryPanel = a),
      (this.factory = o),
      (this.container = this.scene.add.container(s, i));
    const r = this.scene.add.rectangle(-50, -50, 100, 100, n).setOrigin(0),
      h = t.add
        .text(0, -10, `${o.activeWorkers}`, {
          fontSize: "24px",
          color: "#444",
          fontStyle: "bold",
          fontFamily: "monospace",
        })
        .setOrigin(0.5);
    o.events.on("activeWorkerChange", (t) => {
      h.setText(t.toString());
    }),
      this.container.add([r, h]),
      this.drawControlPanel(),
      this.drawButtons();
  }
  drawControlPanel() {
    this.container.add(this.scene.add.image(0, 0, "factoryUi"));
  }
  drawButtons() {
    const t = new W(
        this.scene,
        31,
        -10,
        "addWorker",
        "addWorker_over",
        "addWorker_pressed"
      ),
      e = new W(
        this.scene,
        -31,
        -10,
        "removeWorker",
        "removeWorker_over",
        "removeWorker_pressed"
      ),
      s = new W(
        this.scene,
        0,
        27,
        "changeTask",
        "changeTask_over",
        "changeTask_pressed"
      );
    t.baseImage.on("pointerup", () => {
      this.factory.addWorker(1);
    }),
      e.baseImage.on("pointerup", () => {
        this.factory.removeWorker(1);
      }),
      s.baseImage.on("pointerup", this.changeTask, this),
      this.container.add([t.container, e.container, s.container]),
      this.container.setDepth(11);
  }
  changeTask() {
    this.factoryPanel.changeTask(this.factory);
  }
}
class X {
  constructor(t, s, i) {
    e(this, "scene"),
      e(this, "factoriesContainer"),
      e(this, "taskPanel"),
      e(this, "_selectedFactory"),
      e(this, "warehouse"),
      (this.scene = t),
      (this.warehouse = i),
      this.scene.add.rectangle(1450, 350, 360, 720, r).setOrigin(0),
      (this.factoriesContainer = t.add.container(1445, 340)),
      s.forEach((t, e) => this.addFactory(0, e, t)),
      (this.taskPanel = new N(t, this)),
      this.scene.add.image(1680, 695, "factoriesPanel").setDepth(11);
  }
  get selectedFactory() {
    return this._selectedFactory;
  }
  addFactory(t, e, s) {
    const i = new z(this.scene, this.warehouse, t, 180 * e, s),
      a = new Y(this.scene, 420, 252 + 100 * e, this, s);
    this.factoriesContainer.add([i.container, a.container]);
  }
  changeTask(t) {
    (this._selectedFactory = t), this.taskPanel.show();
  }
}
class K {
  constructor(t, s) {
    e(this, "scene"),
      e(this, "warehouse"),
      e(this, "container"),
      e(this, "isVisible", !0),
      e(this, "activeTween"),
      e(this, "ammoTexts", {
        machineGun: {},
        plasmaCannon: {},
        flakCannon: {},
        railgun: {},
        artillery: {},
      }),
      (this.scene = t),
      (this.warehouse = s),
      (this.container = this.scene.add.container(530, 1200)),
      this.scene.add.image(0, 995, "warehousePanel").setDepth(10).setOrigin(0),
      this.createUI(),
      this.createToggleButton();
  }
  createUI() {
    const t = this.warehouse.getAll(),
      e = Object.keys(t),
      s = this.scene.add.graphics();
    s.lineStyle(4, 16777215),
      this.container.add([
        this.scene.add.rectangle(-20, -20, 910, 600, r).setOrigin(0),
        s,
      ]),
      e.forEach((e, i) => {
        const a = 180 * i;
        let n = 0;
        const o = this.scene.add.rectangle(a - 5, n - 2, 160, 24, 16777215);
        o.setOrigin(0, 0);
        const r = this.scene.add.text(a, n, e.toUpperCase(), {
          font: "16px",
          color: "#000000",
        });
        this.container.add([o, r]), (n += 20);
        for (const c in t[e]) {
          const t = this.warehouse.getAmmoCount(e, c),
            i = this.scene.add.text(a + 20, n + 10, `${c.toUpperCase()}:`, {
              font: "14px",
              color: h,
            });
          s.lineBetween(a - 3, n + 20, a - 3, n - 20),
            s.lineBetween(a + 15, n + 18, a - 3, n + 18);
          const o = this.scene.add.text(a + 25 + 130, n + 10, `${t}`, {
            font: "bold 18px monospace",
            color: "#fff",
            align: "right",
          });
          o.setOrigin(1, 0),
            (this.ammoTexts[e][c] = o),
            this.warehouse.events.on(`${e}.${c}`, (t) => {
              o.setText(`${t}`);
            }),
            this.container.add([i, o]),
            (n += 20);
        }
      }),
      this.container.add(
        this.scene.add.image(-25, -25, "warehouseScreen").setOrigin(0)
      );
  }
  createToggleButton() {
    new W(
      this.scene,
      459,
      1048,
      "warehouseToggle",
      "warehouseToggle_over",
      "warehouseToggle_pressed"
    ).baseImage.on("pointerup", this.toggleContainer, this);
  }
  toggleContainer() {
    this.activeTween && this.activeTween.destroy();
    const t = this.isVisible ? 950 : 1200;
    (this.activeTween = this.scene.tweens.add({
      targets: this.container,
      y: t,
      duration: 400,
      ease: "Sine.easeInOut",
    })),
      (this.isVisible = !this.isVisible);
  }
}
const Z = { fontSize: "48px", fontStyle: "bold", fontFamily: "monospace" };
class q {
  constructor(t, s, i, a) {
    e(this, "scene"),
      e(this, "controlPanel"),
      e(this, "container"),
      e(this, "totalWorkers"),
      e(this, "availableWorkers"),
      (this.scene = t),
      (this.controlPanel = a),
      (this.container = this.scene.add.container(s, i)),
      (this.totalWorkers = this.scene.add.text(
        30,
        100,
        a.workers.toString().padStart(2, "0"),
        Z
      )),
      (this.availableWorkers = this.scene.add.text(
        30,
        195,
        a.workersAvailable.toString().padStart(2, "0"),
        Z
      )),
      this.controlPanel.events.on(
        "totalWorkersChange",
        this.updateTotalWorkers,
        this
      ),
      this.controlPanel.events.on(
        "activeWorkersChange",
        this.updateActiveWorkers,
        this
      ),
      this.controlPanel.events.on("", this.updateTotalWorkers, this),
      this.container.add([
        this.scene.add.rectangle(0, 50, 100, 300, 4473924).setOrigin(0),
        this.totalWorkers,
        this.availableWorkers,
      ]);
  }
  updateActiveWorkers(t) {
    this.availableWorkers.setText(t.toString().padStart(2, "0"));
  }
  updateTotalWorkers(t) {
    this.totalWorkers.setText(t.toString().padStart(2, "0"));
  }
}
const J = [
  {
    title: "Intro",
    content:
      "Welcome to the Game!\n\n  We have a base and we need to defend it. But there's a catch.\n\nThe turrets? They're already chilling in place.\nYou can't build 'em, sell 'em, or slap upgrades on 'em.\n\nYou control the ammo!\nPick what gets produced, decide what and when gets loaded or unloaded , and watch the fireworks.\n\nYour Role\n\n Turrets are pre-placed.\n You cannot build, sell,move or upgrade them.\n Instead, you influence them by choosing which types of ammo to produce and load into the turrets.\n Ammo Production\n\n On the right, you'll see four factories.\n At each factory, you can:\n\n    Choose an ammo type to produce (you can choose the same type at multiple factories).\n\n    Assign workers to start production (you need at least one worker for a factory to run)\n        -You gain one worker per wave.\n        -Each assigned worker increases the amount of ammo produced per cycle.\n",
  },
  {
    title: "Intro 2",
    content:
      "After production, ammo is sent to storage.\nThe STOCK section shows how much of the currently selected ammo type is available.\nTo view your full inventory, open the storage window at the bottom of the screen.\nEnemies\n\nThe Enemy Info Panel shows:\n\n    The types of enemies that will appear in the next wave\n\n    How many of each type\n\nThe first few waves contain only light enemies.\nStronger enemies will appear in later waves.\n\nYou can revisit this information at any time by pressing the Database button.\nTips:\n\n    Start with the machine gun's default ammo.\n\n    Don’t forget: you can unload ammo from one turret and load it into another if you don’t have enough ammo.",
  },
  {
    title: "Turrets",
    content:
      "Turret Types\n\nThe game features several turret types, each with a unique role and behavior. Their effectiveness depends on the type of ammo they are loaded with.\n    -Machine Gun\n     A versatile, all-purpose turret.\n     Can be used against all enemy types with the appropriate ammo.\n     AA (Anti-Air) - Specialized for targeting aerial enemies only.\n     AP (Armor-Piercing) Designed to penetrate armored enemies.Ammo features an AP rating from 0 to 1, where 1 means 100% armor is ignored.\n    -Artillery\n     Long firing range, high damage, and splash damage.\n     Cannot target air units.\n    -Flak Cannon\n     Effective only against air units.\n     Compared to the machine gun, it has higher damage and deals splash damage to nearby flying enemies.\n    -Railgun\n     Extremely high damage with long range and low fire rate.\n     Ammo production is slow, so manage resources carefully.\n    -Plasma Cannon\n     Medium-range turret that fires a continuous beam, damaging all enemies in its path.\n     Has a long reload time, but excels at clearing lines of enemies.",
    imageKey: "turretHelp",
  },
  {
    title: "Units",
    content:
      "Unit parameters:\n      hp – unit health\n      spd – movement speed\n      rng – attack range\n      arm – armor. Countered by the AP stat on ammo.\n      dmg – damage dealt to the base\n      type – unit type: air or ground. Turrets loaded with anti-air ammo cannot target ground units, and vice versa.",
  },
];
class Q extends Phaser.GameObjects.Container {
  constructor(t, s = 0, i = 0, a) {
    super(t, s, i),
      e(this, "background"),
      e(this, "onCloseAction"),
      (this.onCloseAction = a);
    const n = t.scale.width,
      o = t.scale.height;
    this.setSize(n, o),
      (this.background = t.add
        .rectangle(0, 0, n, o, 0, 0.8)
        .setOrigin(0)
        .setInteractive()),
      this.add(this.background),
      this.setDepth(20),
      this.setVisible(!1),
      t.add.existing(this);
  }
  show() {
    this.setVisible(!0);
  }
  hide() {
    var t;
    null == (t = this.onCloseAction) || t.call(this), this.setVisible(!1);
  }
}
class tt extends Q {
  constructor(t, s) {
    super(t, 0, 0, s),
      e(this, "topicsData"),
      e(this, "contentText"),
      e(this, "topicImage"),
      (this.scene = t),
      (this.topicsData = J);
    const i = t.scale.width;
    t.scale.height, this.createUI(i);
  }
  createUI(t) {
    const e = this.scene.add.container(200, 100);
    let s = 0;
    this.topicsData.forEach((t, i) => {
      const a = new V({
        scene: this.scene,
        y: s,
        width: 250,
        height: 50,
        title: t.title,
        action: () => this.showTopic(i),
      });
      e.add(a.container), (s += 60);
    });
    const i = new V({
      scene: this.scene,
      y: 2 * s,
      width: 250,
      height: 50,
      title: "CLOSE",
      action: () => this.hide(),
    });
    e.add(i.container);
    const a = t - 370 - 40;
    (this.contentText = this.scene.add.text(370, 40, "", {
      fontSize: "28px",
      fontFamily: "Lucida Console, monospace",
      color: "#ffffff",
      wordWrap: { width: a },
    })),
      this.add([e, this.contentText]),
      (this.topicImage = this.scene.add
        .image(t / 2, 850, "")
        .setVisible(!1)
        .setOrigin(0.5)
        .setScale(0.8)),
      this.add(this.topicImage),
      this.showTopic(0);
  }
  showTopic(t) {
    var e, s;
    const i = this.topicsData[t];
    this.contentText.setText(i.content),
      i.imageKey
        ? null == (e = this.topicImage) ||
          e.setTexture(i.imageKey).setVisible(!0)
        : null == (s = this.topicImage) || s.setVisible(!1);
  }
}
class et {
  constructor(t, s, i = { x: 1498, y: 26, spacing: 42 }) {
    e(this, "buttons", []),
      (this.scene = t),
      (this.gameScene = s),
      (this.buttonPositions = i);
  }
  init() {
    const { x: t, y: e, spacing: s } = this.buttonPositions,
      i = new W(
        this.scene,
        t + 0 * s,
        e,
        "pause_normal",
        "pause_over",
        "pause_pressed"
      ),
      a = new W(
        this.scene,
        t + 1 * s,
        e,
        "speed_slow",
        "speed_slow_over",
        "speed_slow_pressed"
      ),
      n = new W(
        this.scene,
        t + 2 * s + 2,
        e,
        "speed_normal",
        "speed_normal_over",
        "speed_normal_pressed"
      ),
      o = new W(
        this.scene,
        t + 3 * s + 5,
        e,
        "speed_fast",
        "speed_fast_over",
        "speed_fast_pressed"
      );
    n.toggle(),
      this.gameScene.events.on("pause", (t) => {
        i.setActive(t);
      }),
      i.baseImage.on("pointerup", () => {
        this.gameScene.togglePause();
      }),
      a.baseImage.on("pointerup", () => {
        this.changeTime(a, 2, 0.5);
      }),
      n.baseImage.on("pointerup", () => {
        this.changeTime(n, 1, 1);
      }),
      o.baseImage.on("pointerup", () => {
        this.changeTime(o, 0.5, 2);
      }),
      this.buttons.push(i, a, n, o);
  }
  changeTime(t, e, s) {
    this.gameScene.setTimeScale(e, s), this.disableAll(), t.toggle();
  }
  disableAll() {
    this.buttons.forEach((t) => t.setActive(!1));
  }
}
class st extends Q {
  constructor(t, s) {
    super(t, 0, 0, s),
      e(this, "pauseOptions"),
      e(this, "contentText"),
      (this.pauseOptions = [
        { title: "Restart", action: () => this.restartGame() },
        { title: "Exit to Main Menu", action: () => this.exitToMainMenu() },
      ]);
    const i = t.scale.width,
      a = t.scale.height;
    this.createUI(i, a);
  }
  createUI(t, e) {
    const s = t / 2,
      i = e / 2,
      a = this.scene.add.container(s, i);
    let n = 0;
    this.pauseOptions.forEach((t) => {
      const e = new V({
        scene: this.scene,
        y: n,
        title: t.title,
        action: t.action,
        width: 250,
        height: 50,
      });
      a.add(e.container), (n += 60);
    });
    const o = new V({
      scene: this.scene,
      y: 2 * n,
      title: "CLOSE",
      action: () => this.hide(),
      width: 100,
      height: 50,
    });
    a.add(o.container),
      (this.contentText = this.scene.add.text(s + 200 + 40, i, "", {
        fontSize: "28px",
        fontFamily: "Lucida Console, monospace",
        color: "#ffffff",
        wordWrap: { width: t - (s + 200 + 80) },
      })),
      this.add([a, this.contentText]);
  }
  restartGame() {
    this.scene.game.scene.stop("Game"), this.scene.scene.start("Game");
  }
  exitToMainMenu() {
    this.scene.game.scene.stop("Game"), this.scene.scene.start("MainMenu");
  }
  show() {
    this.setVisible(!0);
  }
  hide() {
    var t;
    null == (t = this.onCloseAction) || t.call(this), this.setVisible(!1);
  }
}
class it extends s.Scene {
  constructor() {
    super("GameUi"),
      e(this, "gameScene"),
      e(this, "timeBtns", []),
      e(this, "timeControl");
  }
  create() {
    this.gameScene = this.scene.get("Game");
    const t = this.add
      .rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, r)
      .setOrigin(0)
      .setDepth(100)
      .setInteractive();
    this.gameScene.events.once("gameReady", () => {
      this.initialLoad(), t.destroy();
    });
  }
  drawUi() {
    this.createWaveCounter(),
      this.createTimer(),
      (this.timeControl = new et(this, this.gameScene)),
      this.timeControl.init();
  }
  initialLoad() {
    this.scene.bringToTop(),
      this.drawUi(),
      this.setupTurrets(),
      this.setupMap(),
      this.setupMainScreen(),
      this.setupHealthBar(),
      this.setupEnemiesIntel(),
      this.setupPanels(),
      this.setupInfoPanel(),
      this.setupButtons();
  }
  createWaveCounter() {
    this.add.rectangle(1660, 0, 100, 70, r, 1).setOrigin(0);
    const t = this.add.text(1675, 30, "0.0.0", {
      color: "#fff",
      fontSize: "20px",
      fontStyle: "bold",
      fontFamily: "monospace",
      align: "center",
    });
    this.gameScene.controlPanel.events.on("waveStart", (e) => {
      const s = String(e).padStart(3, "0");
      t.setText(`${s[0]}.${s[1]}.${s[2]}`);
    }),
      this.add.image(1530, 29, "controlPanel_time");
  }
  createTimer() {
    this.add.rectangle(1800, 35, 100, 70, r, 1);
    const t = this.add
      .text(1800, 40, "0.0 : 0.0", {
        color: "#fff",
        fontSize: "24px",
        fontStyle: "bold",
        fontFamily: "monospace",
        align: "center",
      })
      .setOrigin(0.5);
    this.add.image(1760, 35, "controlPanel_timer"),
      this.gameScene.controlPanel.events.on("timerUpdate", (e) => {
        t.setText(
          (function (t) {
            const e = Math.floor(t / 60),
              s = Math.ceil(t % 60);
            return `${String(e).padStart(2, "0")}:${String(s).padStart(
              2,
              "0"
            )}`;
          })(e)
        );
      });
  }
  setupTurrets() {
    const { turrets: t } = this.gameScene.controlPanel;
    t.forEach((t, e) => {
      new R(this, 0, 0 + 141 * e, t);
    });
  }
  setupMap() {
    new F(this, this.gameScene);
  }
  setupMainScreen() {
    this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2 + 5,
      "mainScreen"
    );
  }
  setupHealthBar() {
    const t = this.gameScene.controlPanel.healthMax,
      e = this.add.rectangle(480, 40, 254, 29, r).setOrigin(0),
      s = this.add.rectangle(e.x + 2, e.y + 2, 250, 25, c).setOrigin(0),
      i = this.add
        .text(
          e.x + 127,
          e.y + 14.5,
          `${this.gameScene.controlPanel.health}/${t}`,
          { color: "#000", fontStyle: "bold" }
        )
        .setOrigin(0.5);
    this.gameScene.controlPanel.events.on("health", (e) => {
      const a = Phaser.Math.Clamp(e, 0, t),
        n = a / t;
      i.setText(`${a}/${t}`), (s.width = 250 * n);
    });
  }
  setupEnemiesIntel() {
    new L(this, this.gameScene.commander);
  }
  setupPanels() {
    const { controlPanel: t } = this.gameScene;
    new q(this, 1810, 270, t),
      new X(this, t.factories, t.warehouse),
      new K(this, t.warehouse);
  }
  setupInfoPanel() {
    this.add.image(1695, 170, "infoPanel").setDepth(10);
  }
  setupButtons() {
    new W(
      this,
      1892,
      45,
      "mainMenu",
      "mainMenu_over",
      "mainMenu_pressed"
    ).baseImage.on("pointerup", () => {
      this.gameScene.pauseGame(), t.show();
    });
    const t = new st(this, () => {
        this.gameScene.resumeGame();
      }),
      e = new tt(this, () => {
        this.gameScene.resumeGame();
      });
    new W(
      this,
      140,
      1045,
      "databaseBtn",
      "databaseBtn_over",
      "databaseBtn_pressed"
    ).baseImage.on("pointerup", () => {
      this.gameScene.togglePause(), e.show();
    });
  }
  initTimeSpeedBtns() {
    const t = new W(
        this,
        1498,
        26,
        "pause_normal",
        "pause_over",
        "pause_pressed"
      ),
      e = new W(
        this,
        1540,
        26,
        "speed_slow",
        "speed_slow_over",
        "speed_slow_pressed"
      ),
      s = new W(
        this,
        1585,
        26,
        "speed_normal",
        "speed_normal_over",
        "speed_normal_pressed"
      );
    s.toggle();
    const i = new W(
      this,
      1630,
      26,
      "speed_fast",
      "speed_fast_over",
      "speed_fast_pressed"
    );
    t.baseImage.on("pointerup", () => {
      this.gameScene.scene.isPaused()
        ? this.gameScene.scene.resume()
        : this.gameScene.scene.pause(),
        t.toggle();
    }),
      e.baseImage.on("pointerup", () => {
        this.clickTimeBtn(e, 2, 0.5);
      }),
      s.baseImage.on("pointerup", () => {
        this.clickTimeBtn(s, 1, 1);
      }),
      i.baseImage.on("pointerup", () => {
        this.clickTimeBtn(i, 0.5, 2);
      }),
      this.timeBtns.push(t, e, s, i);
  }
  disableAllBtns() {
    this.timeBtns.forEach((t) => {
      t.setActive(!1);
    });
  }
  clickTimeBtn(t, e, s) {
    this.gameScene.scene.isPaused() && this.gameScene.scene.resume(),
      (this.gameScene.physics.world.timeScale = e),
      (this.gameScene.time.timeScale = s),
      this.disableAllBtns(),
      t.toggle();
  }
}
const at = class t extends Phaser.GameObjects.Container {
  constructor(s, i, n, o, h, c) {
    super(s, i, n),
      e(this, "barFill"),
      e(this, "valueText"),
      e(this, "dragZone"),
      e(this, "volumeType"),
      (this.audioManager = c),
      s.add.existing(this),
      (this.volumeType = h);
    const l = 100 * this.getVolume(),
      d = s.add.text(0, 0, o, {
        fontSize: "24px",
        fontFamily: "Lucida Console, monospace",
        color: "#ffffff",
      }),
      m = s.add
        .rectangle(0, 40, t.BAR_WIDTH, t.BAR_HEIGHT, r, 0.9)
        .setOrigin(0, 0.5);
    (this.barFill = s.add
      .rectangle(0, 40, (l / 100) * t.BAR_WIDTH, t.BAR_HEIGHT, a, 0.9)
      .setOrigin(0, 0.5)),
      (this.valueText = s.add.text(t.BAR_WIDTH + 10, 30, `${Math.round(l)}%`, {
        fontSize: "20px",
        fontFamily: "Lucida Console, monospace",
        color: "#ffffff",
      }));
    const u = new V({
        scene: s,
        title: "-",
        action: () => this.adjustVolume(-5),
        x: t.BAR_WIDTH + 100,
        y: 40,
        height: 30,
        width: 30,
        borderThickness: 1,
      }),
      p = new V({
        scene: s,
        x: t.BAR_WIDTH + 140,
        y: 40,
        title: "+",
        action: () => this.adjustVolume(5),
        height: 30,
        width: 30,
        borderThickness: 1,
      });
    (this.dragZone = s.add
      .zone(0, 30, t.BAR_WIDTH, t.BAR_HEIGHT)
      .setOrigin(0, 0.5)
      .setInteractive({ useHandCursor: !0 })
      .on("pointerdown", (t) => this.updateByPointer(t))
      .on("pointermove", (t) => {
        t.isDown && this.updateByPointer(t);
      })),
      this.add([
        d,
        u.container,
        p.container,
        m,
        this.barFill,
        this.valueText,
        this.dragZone,
      ]);
  }
  getVolume() {
    switch (this.volumeType) {
      case "master":
        return this.audioManager.getMasterVolume();
      case "bgm":
        return this.audioManager.getBGMVolume();
      case "sfx":
        return this.audioManager.getSFXVolume();
    }
  }
  setVolume(t) {
    switch (this.volumeType) {
      case "master":
        this.audioManager.setMasterVolume(t);
        break;
      case "bgm":
        this.audioManager.setBGMVolume(t);
        break;
      case "sfx":
        this.audioManager.setSFXVolume(t),
          this.scene.sound.play("btnUiPress", { volume: t });
    }
  }
  adjustVolume(t) {
    const e = 100 * this.getVolume(),
      s = Phaser.Math.Clamp(e + t, 0, 100);
    this.applyVolume(s);
  }
  updateByPointer(e) {
    console.log(e.x);
    const s = e.x - this.getWorldPoint().x,
      i = Phaser.Math.Clamp(s / t.BAR_WIDTH, 0, 1);
    this.applyVolume(100 * i);
  }
  applyVolume(e) {
    const s = Phaser.Math.Clamp(e / 100, 0, 1);
    this.setVolume(s),
      (this.barFill.width = s * t.BAR_WIDTH),
      this.valueText.setText(`${Math.round(100 * s)}%`);
  }
  reset() {
    this.applyVolume(100);
  }
};
e(at, "BAR_WIDTH", 220), e(at, "BAR_HEIGHT", 30);
let nt = at;
class ot extends Q {
  constructor(t, s = 0, i = 0, a) {
    super(t, s, i, a),
      e(this, "audioManager", b.getInstance()),
      e(this, "controls", []),
      this.createUI();
  }
  createUI() {
    const { width: t, height: e } = this.scene.scale,
      s = this.scene.add.container(t / 2 - 200, e / 2 - 200);
    s.add(
      this.scene.add
        .text(200, 20, "Options", {
          fontSize: "28px",
          fontFamily: "Lucida Console, monospace",
          color: "#ffffff",
        })
        .setOrigin(0.5)
    );
    const i = new nt(this.scene, 40, 60, "Master", "master", this.audioManager),
      a = new nt(this.scene, 40, 130, "BGM", "bgm", this.audioManager),
      n = new nt(this.scene, 40, 200, "SFX", "sfx", this.audioManager);
    this.controls.push(i, a, n);
    const o = new V({
        x: 200,
        y: 300,
        width: 250,
        height: 50,
        scene: this.scene,
        title: "Reset to Defaults",
        action: () => this.controls.forEach((t) => t.reset()),
        borderThickness: 2,
      }),
      r = new V({
        x: 200,
        y: 380,
        width: 250,
        height: 50,
        scene: this.scene,
        title: "Close",
        action: this.hide.bind(this),
        borderThickness: 2,
      });
    s.add([i, a, n, o.container, r.container]), this.add(s);
  }
  show() {
    this.setVisible(!0);
  }
  hide() {
    var t;
    null == (t = this.onCloseAction) || t.call(this), this.setVisible(!1);
  }
}
class rt {
  constructor(t) {
    e(this, "scene"),
      e(this, "container"),
      e(this, "menuOptions"),
      e(this, "statusTexts", []),
      e(this, "timeText"),
      e(this, "infoModal"),
      e(this, "optionsModal"),
      (this.container = t.add.container()),
      (this.scene = t),
      (this.menuOptions = [
        { title: "New Game", action: () => this.startNewGame() },
        { title: "How to play", action: () => this.showDataBase() },
        { title: "Options", action: () => this.openOptions() },
      ]);
    const s = t.scale.width,
      i = t.scale.height,
      a = t.add.rectangle(0, 0, s, i, r, 1).setOrigin(0).setInteractive();
    this.container.add(a),
      this.createUI(s, i),
      (this.infoModal = new tt(t)),
      (this.optionsModal = new ot(t)),
      _.addScanlineOverlay(this.scene),
      _.createVerticalDataStream(this.scene, 8),
      _.createPulseShimmer(this.scene, s, i, 10);
  }
  createUI(t, e) {
    const s = t / 2,
      i = e / 2,
      a = this.scene.add.container(s, i);
    let n = -50;
    this.menuOptions.forEach((t) => {
      const e = new V({
        scene: this.scene,
        x: 0,
        y: n,
        width: 300,
        height: 50,
        title: t.title,
        action: t.action,
      });
      a.add(e.container), (n += 60);
    }),
      this.container.add(a);
    const o = {
      fontSize: "16px",
      fontFamily: "Lucida Console, monospace",
      color: h,
      wordWrap: { width: 200 },
    };
    [
      { x: 20, y: 20, text: "SYSTEM: ONLINE" },
      { x: t - 220, y: 20, text: "USER: COMMANDER" },
      { x: 20, y: e - 40, text: "BUILD: v0.0.0-GameDevJs" },
      { x: t - 220, y: e - 40, text: "TIME: 00:00" },
    ].forEach((t) => {
      const e = this.scene.add.text(t.x, t.y, t.text, o);
      e.setInteractive(),
        _.addPulseEffect(this.scene, e),
        this.statusTexts.push(e),
        this.container.add(e),
        t.text.startsWith("TIME") && (this.timeText = e);
    }),
      this.updateTime();
  }
  updateTime() {
    this.scene.time.addEvent({
      delay: 1e3,
      loop: !0,
      callback: () => {
        this.timeText.setText(this.getCurrentTime());
      },
    });
  }
  getCurrentTime() {
    const t = new Date();
    return `TIME: ${t.getHours().toString().padStart(2, "0")}:${t
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${t.getSeconds().toString().padStart(2, "0")}`;
  }
  startNewGame() {
    this.scene.scene.start("Game");
  }
  showDataBase() {
    this.infoModal.show();
  }
  openOptions() {
    this.optionsModal.show();
  }
}
class ht extends s.Scene {
  constructor() {
    super("MainMenu"),
      e(this, "background"),
      e(this, "audioManager"),
      e(this, "logo"),
      e(this, "title");
  }
  loadSetings() {
    (this.audioManager = b.getInstance()),
      this.audioManager.playBGM(this, "ambient");
  }
  create() {
    this.loadSetings(), new rt(this);
    const t = this.cameras.main.width;
    let e = 50;
    [
      "[SYS]: Booting up...",
      "[SYS]: Initializing system components...",
      "[SYS]: Network connection established.",
      "[SYS]: Security protocols active.",
      "[USER]: Welcome, Commander.",
      "[SYS]: Loading primary data...",
      "[SYS]: Status: All systems operational.",
      "[SYS]: Scanning for available missions...",
      "[USER]: Command center online.",
      "[SYS]: Data stream 001 active.",
      "[USER]: Ready for input.",
      "[SYS]: Download complete: 100%",
      "[SYS]: Encryption sequence engaged.",
      "[USER]: Awaiting next command...",
      "[SYS]: Time synchronization complete.",
      "[SYS]: Running diagnostics...",
      "[USER]: Diagnostics clear.",
      "[SYS]: Preparing for launch...",
      "[SYS]: Standby for further instructions...",
      "[USER]: System check complete. Ready for action.",
      "[SYS]: Awaiting further orders.",
    ].forEach((s, i) => {
      this.time.delayedCall(500 * i, () => {
        const i = this.add
          .text(10, e, s, {
            fontSize: "18px",
            fontFamily: "Lucida Console, monospace",
            color: l,
            wordWrap: { width: t - 50 },
          })
          .setAlpha(0);
        (e += 30),
          this.tweens.add({
            targets: i,
            alpha: 1,
            duration: 500,
            ease: "Sine.easeIn",
          });
      });
    });
  }
}
class ct extends s.Scene {
  constructor() {
    super("Preloader");
  }
  init() {
    this.cameras.main.setBackgroundColor(r);
    const t = this.cameras.main.centerX,
      e = this.cameras.main.centerY + 100;
    this.add.rectangle(t, e, 800, 40, 3355443).setStrokeStyle(4, 4473924);
    const s = this.add.rectangle(t - 398, e, 4, 36, c);
    this.tweens.add({
      targets: s,
      duration: 500,
      ease: "Power2",
      yoyo: !0,
      repeat: -1,
      alpha: 0.6,
    }),
      this.load.on("progress", (t) => {
        s.width = 792 * t;
      }),
      this.add
        .text(t, e - 150, "LOADING...", {
          font: "30px Arial",
          color: "#FFFFFF",
          fontStyle: "bold",
          stroke: "#000000",
          strokeThickness: 4,
          align: "center",
        })
        .setOrigin(0.5);
    const i = this.add
      .text(t, e + 50, "0%", {
        font: "20px Arial",
        color: "#FFFFFF",
        fontStyle: "bold",
        stroke: "#000000",
        strokeThickness: 2,
        align: "center",
      })
      .setOrigin(0.5);
    this.load.on("progress", (t) => {
      i.setText(`${Math.round(100 * t)}%`);
    });
  }
  preload() {
    this.load.pack("assets_pack", "assets/assets.json");
  }
  create() {
    this.scene.start("MainMenu");
  }
}
const lt = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  parent: "game-container",
  backgroundColor: "#000000",
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  scene: [ct, ht, D, it, E],
  physics: {
    default: "arcade",
    arcade: { gravity: { y: 0, x: 0 }, debug: !1 },
  },
};
new s.Game(lt);
