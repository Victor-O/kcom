angular
  .module('kcom')
  .controller('PenceController', PenceController);

PenceController.$nject = [];

function PenceController() {
  const vm = this;

  vm.coins = [
    vm.onePound = { value: 100, amount: 11, name: 'One Pound' },
    vm.fiftyPence = { value: 50, amount: 24, name: 'Fifty pence' },
    vm.twentyPence = { value: 20, amount: 0, name: 'Twenty pence' },
    vm.tenPence = { value: 10, amount: 99, name: 'Ten pence' },
    vm.fivePence = { value: 5, amount: 200, name: 'Five Pence' },
    vm.twoPence = { value: 2, amount: 11, name: 'Two Pence' },
    vm.onePenny = { value: 1, amount: 23, name: 'One Penny' },
  ];

  vm.price = undefined;
  vm.payment = undefined;
  vm.changeReturned = 0;
  vm.usedCoins = [];
  vm.limitedCoins = true;
  vm.insufficientCoins = false;
  vm.needMoreMoney = false;

  vm.calculateChange =  function() {
    vm.limitedCoins = false;
    return vm.returnChange(vm.price, vm.payment);
  };

  vm.calculateLimitedChange = function() {
    vm.limitedCoins = true;
    vm.insufficientCoins = false;
    return vm.returnChange(vm.price, vm.payment);
  };

  vm.returnChange = function (price, payment) {
    vm.needMoreMoney = false;
    vm.usedCoins = [];
    vm.changeReturned = 0;
    if(isNaN(price) || isNaN(payment) || price < 0 || payment < 0) {
      return 'Error';
    }

    if (payment < price) {
      vm.needMoreMoney = true;
      return 'Not enough money inserted';
    }

    if (payment === price) {
      return 'Exact sum payed';
    }

    var theChange = payment - price;
    var changeToReturn = [];

    vm.usedCoins = vm.getAllCoins(theChange, changeToReturn);
    vm.usedCoins.forEach(function (typeOfCoin) {
      vm.changeReturned = vm.changeReturned + (typeOfCoin.coinNumber * typeOfCoin.coinType.value);
    });
  };

  vm.getAllCoins = function(theChange, changeToReturn) {
    var stackOfCoins = changeToReturn;

    if (theChange > 0) {
      var coinsIterated = vm.getCoins(theChange);
      stackOfCoins.push({ coinType: coinsIterated.coinType, coinNumber: coinsIterated.numberOfCoins });
      if (coinsIterated.remainder > 0) {
        vm.getAllCoins(coinsIterated.remainder, stackOfCoins);
      }
    }
    return stackOfCoins;
  };

  vm.getCoins = function(theChange) {
    if (vm.limitedCoins) {
      switch (true) {
        case theChange >= vm.onePound.value && vm.onePound.amount > 0:
          return vm.getNumberOfCoins(theChange, vm.onePound);
        case theChange >= vm.fiftyPence.value && vm.fiftyPence.amount > 0:
          return vm.getNumberOfCoins(theChange, vm.fiftyPence);
        case theChange >= vm.twentyPence.value && vm.twentyPence.amount > 0:
          return vm.getNumberOfCoins(theChange, vm.twentyPence);
        case theChange >= vm.tenPence.value && vm.tenPence.amount > 0:
          return vm.getNumberOfCoins(theChange, vm.tenPence);
        case theChange >= vm.fivePence.value && vm.fivePence.amount > 0:
          return vm.getNumberOfCoins(theChange, vm.fivePence);
        case theChange >= vm.twoPence.value && vm.twoPence.amount > 0:
          return vm.getNumberOfCoins(theChange, vm.twoPence);
        case theChange >= vm.onePenny.value && vm.onePenny.amount > 0:
          return vm.getNumberOfCoins(theChange, vm.onePenny);
        default:
          return {numberOfCoins: 0, coinType: 0, remainder: 0};
      }
    } else {
      switch (true) {
        case theChange >= vm.onePound.value:
          return vm.getNumberOfCoins(theChange, vm.onePound);
        case theChange >= vm.fiftyPence.value:
          return vm.getNumberOfCoins(theChange, vm.fiftyPence);
        case theChange >= vm.twentyPence.value:
          return vm.getNumberOfCoins(theChange, vm.twentyPence);
        case theChange >= vm.tenPence.value:
          return vm.getNumberOfCoins(theChange, vm.tenPence);
        case theChange >= vm.fivePence.value:
          return vm.getNumberOfCoins(theChange, vm.fivePence);
        case theChange >= vm.twoPence.value:
          return vm.getNumberOfCoins(theChange, vm.twoPence);
        case theChange >= vm.onePenny.value:
          return vm.getNumberOfCoins(theChange, vm.onePenny);
        default:
          return {numberOfCoins: 0, coinType: 0, remainder: 0};
      }
    }
  };

  vm.getNumberOfCoins = function(change, coinType) {
    var numberOfCoins = 0;
    var remainder = change;

    if (vm.limitedCoins) {
      if (coinType.amount > 0) {
        numberOfCoins = Math.floor(change/coinType.value);
        if (numberOfCoins > coinType.amount) {
          remainder = (change % coinType.value) + ((numberOfCoins - coinType.amount) * coinType.value);
          numberOfCoins = coinType.amount;
          coinType.amount = 0;
          if (coinType.value === 1) {
            vm.insufficientCoins = true;
          }
        } else {
          remainder = change % coinType.value;
          coinType.amount = coinType.amount - numberOfCoins;
        }
      }
    } else {
      numberOfCoins = Math.floor(change/coinType.value);
      remainder = change % coinType.value;
    }

    return { numberOfCoins, coinType,  remainder};
  };
}
