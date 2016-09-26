angular.module('userGridMainDir', ['userGridMainCtrl'])
        .directive("userGridMain", function(/* could do DI */) {
            return {
                //restrict: "AEC",  // Attribute, Element, Class
                templateUrl: 'app/components/user/userGridMain.html',      
                controller: 'userGridMainCtrl',
                controllerAs: 'ugmc'
            };
        });