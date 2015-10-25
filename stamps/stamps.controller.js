﻿(function () {
    'use strict';

    angular
        .module('app')
        .controller('StampsController', StampsController);

    StampsController.$inject = ['UserService', 'StoreService', '$scope', '$rootScope'];
    function StampsController(UserService, StoreService, $scope, $rootScope) {
        var vm = this;

        vm.store = null;
        vm.storeStamps = [];
        vm.numberOfStamps = null;
        $scope.storeCustomer = null;

        vm.allUsers = [];
        vm.deleteUser = deleteUser;
        vm.getUserById = getUserById;

        initController();

        function initController() {
            loadCurrentStore();
            //loadAllUsers();
            loadCurrentStoreStamps();
        }

        function loadCurrentStore() {
            //UserService.GetById($rootScope.globals.currentUser.id)
            //    .then(function (user) {
                    vm.store = $rootScope.globals.currentUser; //user;
                    console.log(vm.store);
            //    });
        }

        function loadCurrentStoreStamps() {
            //UserService.GetById($rootScope.globals.currentUser.id)
            //    .then(function (user) {
            StoreService.GetStoreStampsById($rootScope.globals.currentUser.id)
                  .then(function (data){
                    if(data != null && data != ""){
                      vm.storeStamps = data.stamps;
                      vm.numberOfStamps = vm.storeStamps.length;
                    }
                  });

            //    });
        }

        function getUserById(id){
            UserService.GetById(id)
              .then(function(user){
                  $scope.storeCustomer = user;
              })
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
    }

})();
