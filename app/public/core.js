var scotchTodo = angular.module('scotchTodo', []); //creates a new module called scotchTodo
console.log("Test")
function mainController($scope,$http) {
  $scope.formData = {}

  $http.get('api/todos')

}
