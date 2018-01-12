var scotchTodo = angular.module('scotchTodo', []);

scotchTodo.controller('mainController',['$scope','$http',function($scope,$http) {

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


    $scope.createTodo = function(id) {
      console.log({id:$scope.inputData.text})
      $http({
        url:'/api/todos',
        method:'POST',
        data: {id:$scope.inputData.text}
      })
      .then(function successCallback(response) {
        console.log(response.data);
        $scope.formData = {}; //clear the form to get ready for a new form
        $scope.todos = $scope.inputData.text;
      }, function errorCallback(response) {
        console.log('Error: ' + $scope.inputData);
      })
    };

    $scope.deleteTodo = function(id) {
      $http({
        method: 'DELETE',
        url: '/api/todos/' + id
      })
      .then(function successCallback(response) {
            $scope.todos = response.data;
      }, function errorCallback(response) {
        console.log('Error: ' + response.data);
      })
    };
}])
