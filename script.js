(function () {
  'use strict';

  var DEPRECIATION_RATES = {
    electronics: 0.35,
    appliance: 0.20,
    furniture: 0.15,
    clothing: 0.40,
    other: 0.25,
  };

  var priceInput = document.getElementById('priceInput');
  var categorySelect = document.getElementById('categorySelect');
  var monthsInput = document.getElementById('monthsInput');
  var conditionSelect = document.getElementById('conditionSelect');

  var priceRangeOut = document.getElementById('priceRangeOut');
  var depreciationRateOut = document.getElementById('depreciationRateOut');
  var baseValueOut = document.getElementById('baseValueOut');
  var conditionMultiplierOut = document.getElementById('conditionMultiplierOut');

  function num(input) {
    var v = parseFloat(input.value);
    return isNaN(v) ? 0 : v;
  }

  function calc() {
    var price = num(priceInput);
    var months = num(monthsInput);
    var annualRate = DEPRECIATION_RATES[categorySelect.value];
    var conditionMult = parseFloat(conditionSelect.value);

    var years = months / 12;
    var baseValue = price * Math.pow(1 - annualRate, years);
    var estimated = baseValue * conditionMult;

    var low = estimated * 0.85;
    var high = estimated * 1.15;

    priceRangeOut.textContent = '¥' + Math.round(low) + ' ~ ¥' + Math.round(high);
    depreciationRateOut.textContent = (annualRate * 100).toFixed(0) + '% / 年';
    baseValueOut.textContent = '¥' + baseValue.toFixed(0);
    conditionMultiplierOut.textContent = 'x' + conditionMult.toFixed(2);
  }

  [priceInput, categorySelect, monthsInput, conditionSelect].forEach(function (el) {
    el.addEventListener('input', calc);
    el.addEventListener('change', calc);
  });

  calc();
})();
