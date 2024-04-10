// ts-nocheck

export const Formula = {
  _SlowVdotLimit: 39,

  getVDOT: function(distance, time) {
    var V = this._getVDOTSpeedParam(distance, time);
    var VO2 = this._getVO2(V);
    // fraction of VO2 max
    var F = .80 + .298956 * Math.exp(-.193261 * time) + .189439 * Math.exp(-.012778 * time);
    return VO2 / F;
  },

  _getVDOTSpeedParam(meters, minutes) {
    if (meters >= 1600) {
      return meters / minutes;
    }

    if (meters > 800) {
      const scale = 1600 / meters;
      const percentage = (1600 - meters) / 800;
      const adjustment = scale + 0.1 * percentage;
      const m1600Mins = minutes * adjustment;
      return 1600 / m1600Mins;
    } else {
      const m800Adjustment = 2.1;
      const distanceFactor = 800 / meters;
      const adjustment = distanceFactor * m800Adjustment;
      const m1600Mins = minutes * adjustment;
      return 1600 / m1600Mins;
    }
  },

  getPredictedRaceTime: function(VDOT, distance) {
    var A = distance / (4 * VDOT);
    for (var i = 0; i < 3; i++) {
      var B = Math.exp(-.193261 * A);
      var C = .298956 * B + Math.exp(-.012778 * A) * .189439 + .8;
      var E = Math.pow((VDOT * C), 2) * -.0075 + (VDOT * C) * 5.000663 + 29.54;
      var G = (.298956 * B) * .19326;
      var H = G - Math.exp(-.012778 * A) * .189439 * (-.012778);
      var I = (C * H * VDOT) * (-.007546) * 3;
      var J = (H * VDOT) * 5.000663 + I;
      var K = (distance * J) / Math.pow(E, 2) + 1;
      var L = A - (distance / E);
      var P = L / K;
      A = A - P;
    }
    const V = distance / A;
    const time = distance / V; // distance over velocity

    if (distance >= 1600) {
      return time;
    }

    const adjustedV = this._getVDOTSpeedParam(distance, time);

    const scale = V / adjustedV;
    return time / scale;
  },

  getMarathonPace: function(VDOT, trainingDistance) {
    return trainingDistance / Formula._getMarathonVelocity(VDOT);
  },

  // getJogPace: function(vdot, distance) {
  //   if (vdot > 50.5) {
  //     const pace = 9.0 * Conversion.toMiles(distance);
  //     return pace;
  //   }
  //
  //   return this.getEasyPace(vdot, distance, true);
  // },

  getWalkPace: function(distance) {
    const pace = 12 * (1000 / distance);
    return pace;
  },

  getEasyPace: function(vdot, distance, slowerPace) {
    if (this._isSlowVdot(vdot)) {
      vdot = this._getSRVDOT(vdot);
    }

    var percentage = slowerPace ? .62 : .70;
    return this._getCustomEffortPace(vdot, distance, percentage);
  },

  getEasyPaceRange: function(vdot, distance, unit) {
    const slower = this.getEasyPace(vdot, distance, true);
    const faster = this.getEasyPace(vdot, distance, false);

    return {
      slow: slower,
      fast: faster,
      unit: unit
    };
  },

  getThresholdPace: function(vdot, distance) {
    if (this._isSlowVdot(vdot)) {
      var srvdot = this._getSRVDOT(vdot);
      vdot = (srvdot + parseFloat(vdot)) / 2;
    }

    return this._getCustomEffortPace(vdot, distance, .88);
  },

  getIntervalPace: function(vdot, distance) {
    if (this._isSlowVdot(vdot)) {
      vdot = this._getSRVDOT(vdot);
    }

    return this._getCustomEffortPace(vdot, distance, .975);
  },

  getRepetitionPace: function(vdot, distance) {
    const per400FasterBy = 6.0;
    const divisor = (distance / 400) * (per400FasterBy / 60);

    const pace = this.getIntervalPace(vdot, distance);
    return pace - divisor;
  },


  getFastRepsPace: function(vdot, distance) {
    var per200FasterBy = 4.0;
    var divisor = (distance / 200) * (per200FasterBy / 60);
    var pace = this.getRepetitionPace(vdot, distance);
    return pace - divisor;
  },

  isFastRepsDistance: function(distance) {
    return distance === 200 ||
      distance === 300 ||
      distance === 400 ||
      distance === 600;
  },

  // getCustomTrainingPace: function(paceType, percentage, distanceMeters, vdot, paceUnit) {
  //   if (paceType === CustomTrainingPaceType.Effort) {
  //     if (this._isSlowVdot(vdot)) {
  //       vdot = this._getSRVDOT(vdot);
  //     }
  //
  //     const paceDistance = FormulaHelpers.getPaceDistanceForUnit(paceUnit);
  //     return this._getCustomEffortPace(vdot, paceDistance, percentage / 100);
  //   }
  //
  //   return this._getCustomDistancePace(vdot, distanceMeters, paceUnit);
  // },

  _isSlowVdot: function(vdot) {
    return vdot > 0 && vdot < Formula._SlowVdotLimit;
  },

  _getSRVDOT: function(vdot) {
    return (vdot * 2 / 3) + 13;
  },

  _getCustomEffortPace: function(vdot, distance, percentage) {
    var O = vdot * percentage;
    var V = Formula._getPaceVelocity(O);
    return distance / V;
  },

  // _getCustomDistancePace: function(vdot, meters, paceUnit) {
  //   const raceTime = this.getPredictedRaceTime(vdot, meters);
  //   const paceDistance = FormulaHelpers.getPaceDistanceForUnit(paceUnit);
  //   const distanceInPaceUnit = meters / paceDistance;
  //
  //   return raceTime / distanceInPaceUnit;
  // },

  _getVO2: function(V) {
    return .182258 * V + .000104 * Math.pow(V, 2) - 4.6;
  },

  _getPaceVelocity: function(O) {
    return 29.54 + 5.000663 * O - .007546 * Math.pow(O, 2);
  },

  _getMarathonVelocity: function(VDOT) {
    var distance = 42195;
    var A = distance / (4 * VDOT);
    for (var i = 0; i < 3; i++) {
      var B = Math.exp(-.193261 * A);
      var C = .298956 * B + Math.exp(-.012778 * A) * .189439 + .8;
      var E = Math.pow((VDOT * C), 2) * -.0075 + (VDOT * C) * 5.000663 + 29.54;
      var G = (.298956 * B) * .19326;
      var H = G - Math.exp(-.012778 * A) * .189439 * (-.012778);
      var I = (C * H * VDOT) * (-.007546) * 3;
      var J = (H * VDOT) * 5.000663 + I;
      var K = (distance * J) / Math.pow(E, 2) + 1;
      var L = A - (distance / E);
      var P = L / K;
      A = A - P;
    }
    return distance / A;
  }

};
