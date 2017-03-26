
describe('Pence Controller', function() {

  beforeEach(module('kcom'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('ReturnChange function', function() {
    it('should return an error when one of the inputs is not a number', function() {
      var controller = $controller('PenceController');
      controller.price = 'not a number';
      controller.payment = 5;

      var theResult = controller.returnChange(controller.price, controller.payment);
      expect(theResult).toBe('Error');
    });

    it('should return an error when one of the inputs is a negative number', function() {
      var controller = $controller('PenceController');
      controller.price = 3;
      controller.payment = -15;

      var theResult = controller.returnChange(controller.price, controller.payment);
      expect(theResult).toBe('Error');
    });

    it('should return a message when the user did not pay more than the price', function() {
      var controller = $controller('PenceController');
      controller.price = 150;
      controller.payment = 47;

      var theResult = controller.returnChange(controller.price, controller.payment);
      expect(theResult).toBe('Not enough money inserted');
    });

    it('should return a message when the user payed the exact price', function() {
      var controller = $controller('PenceController');
      controller.price = 10;
      controller.payment = 10;

      var theResult = controller.returnChange(controller.price, controller.payment);
      expect(theResult).toBe('Exact sum payed');
    });
  });

  describe('CalculateChange function', function() {
    it('did not subtract from the amount of existing coins', function() {
      var controller = $controller('PenceController');
      controller.price = 10;
      controller.payment = 230;
      controller.calculateChange();

      expect(controller.onePound.amount).toBe(11);
    });
  });

  describe('CalculateLimitedChange function', function() {
    it('did not subtract from the amount of existing coins', function() {
      var controller = $controller('PenceController');
      controller.price = 10;
      controller.payment = 230;
      controller.calculateLimitedChange();

      expect(controller.onePound.amount).toBe(9);
    });
  });

});