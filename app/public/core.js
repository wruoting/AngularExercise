var scotchTodo = angular.module('scotchTodo', []);

scotchTodo.controller('mainController',['$scope','$http',function($scope,$http) {
    var Input = element(by.model('formData.text'))
    $scope.formData = {};

    $http({
      method: 'GET',
      url: '/api/todos'
    })
    .then(function successCallback(response) {
      $scope.todos = response.data;
      console.log(response.data);
    }, function errorCallback(response) {
      console.log('Error: ' + response.data);
    })



    $scope.createTodo = function() {
      $http(
      {
        method:'POST',
        data: Input,
        url:'/api/todos'
      })
      .then(function successCallback(response) {
        console.log(response.data);
        $scope.formData = {}; //clear the form to get ready for a new form
        $scope.todos = response.data;
      }, function errorCallback(response) {
        console.log('Error: ' + response.data);
      })
    };

    $scope.deleteTodo = function(id) {
      $http
      (
      {
        method: 'DELETE',
        url: '/api/todos'+id
      })
      .then(function successCallback(response) {
            $scope.todos = response.data;
      }, function errorCallback(response) {
        console.log('Error: ' + response.data);
      })
    };
}])
