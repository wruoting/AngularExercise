var scotchTodo = angular.module('scotchTodo', []) //creates a new module called scotchTodo
function mainController($scope,$http) {
  $scope.formData = {}

  $http.get('api/todos')
    .success(function(data) {
      $scope.todos = data
      console.log(data)
    })
    .error(function(data) {
      console.log('Error: ' + data)
    })

  $scope.createTodo = function() {
    $http.post('api/todos', $scope.formData)
    .success(function(data) {
      $scope.formData = {} //clear the form to get ready for a new form
      $scope.todos = data
      console.log(data)
    })
    .error(function(data) {
      console.log('Error: ' + data)
    })
  }

  $scope.deleteTodo = function(id) {
    $http.delete('api/todos/'+id)
      .success(function(data) {
        $scope.todos = data
        console.log(data)
      })
      .error(function(data) {
        console.log('Error: ' + data)
      })
  }
}
