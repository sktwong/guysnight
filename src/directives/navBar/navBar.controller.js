/*
 * Guy's Night Out - Big 2
 * navBar.controller.js
 *
 * Navigation bar / menu controller
 *
 */
big2App.controller('navBarController', ['$scope', '$uibModal', 'big2AppService', '$route', navBarControllerFn]);

function navBarControllerFn($scope, $uibModal, big2AppService, $route) {

    var vm = this;
    vm.dataModal = dataModal;
    vm.formatDate = big2AppService.formatDate;
    vm.historyDates = big2AppService.getHistoryDates();
    vm.historyModal = historyModal;
    vm.newGameModal = newGameModal;
    vm.payoutModal = payoutModal;
    vm.statsModal = statsModal;

    function newGameModal() {
        var newGameModal = $uibModal.open({
            size: 'md',
            templateUrl: 'modals/newGame/newGame.tmpl.html',
            controller: 'modalNewGameController',
            controllerAs: 'vm'
        });

        newGameModal.result.then(function(newGameSettings) {
            big2AppService.createNewGame(newGameSettings);
            $route.reload();
        });
    }

    function dataModal() {
        var dataModal = $uibModal.open({
            size: 'md',
            templateUrl: 'modals/data/data.tmpl.html',
            controller: 'modalDataController',
            controllerAs: 'vm'
        });
    }

    function payoutModal() {
        var payoutModal = $uibModal.open({
            size: 'sm',
            templateUrl: 'modals/payout/payout.tmpl.html',
            controller: 'modalPayoutController',
            controllerAs: 'vm'
        });
    }

    function statsModal() {
        var statsModal = $uibModal.open({
            size: 'md',
            templateUrl: 'modals/stats/stats.tmpl.html',
            controller: 'modalStatsController',
            controllerAs: 'vm',
            resolve: { 
                historyData: function() {
                    return {
                        showHistory: false
                    };
                }
            }
        });
    }

    function historyModal(date) {
        var historyModal = $uibModal.open({
            size: 'md',
            templateUrl: 'modals/stats/stats.tmpl.html',
            controller: 'modalStatsController',
            controllerAs: 'vm',
            resolve: { 
                historyData: function() {
                    return {
                        showHistory: true, 
                        date: date
                    };
                }
            }
        });
    }
}