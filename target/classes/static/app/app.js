

var userGridModule = angular.module('userGridModule',['userGrid','userGridMainDir','userGridMainCtrl']);

var mainApp = angular.module('astraDemo', ['astraCtrlModule','ui.router','userGridModule']);

mainApp.config(StateConfig); 	


