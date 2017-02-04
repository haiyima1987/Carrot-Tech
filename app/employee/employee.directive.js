/**
 * Created by Haiyi on 12/15/2016.
 */
angular.module('myApp.employee').directive('spinner', spinner);
function spinner() {
    var self = {
        transclude: false,
        restrict: 'EA',
        templateUrl: 'template/spinner.html',
        scope: {
            isLoading: '=', // = is for variables
            message: '@' // @ is for strings
        }
    };

    return self;
}

angular.module('myApp.employee').directive('nameCard', nameCard);
function nameCard() {
    // console.log('name-card-before-return');
    var self = {
        restrict: 'EA',
        templateUrl: 'template/name.card.html',
        // replace: true,
        scope: {
            person: '=',
            isDeleting: '='
            // deletePerson: '&' // & is for functions
        },
        link: NameCardLink,
        controller: NameCardController,
        controllerAs: 'cardVm',
        bindToController: true
    };

    function NameCardLink($scope, $elem, $attr, $ctrl) {
        // console.log($ctrl);
    }

    return self;
}
function NameCardController($scope, $modal, employeeService) {
    // console.log('name-card-controller');
    var cardVm = this;
    cardVm.isDeleting = false;
    cardVm.data = employeeService;
    cardVm.showViewModal = showViewModal;
    cardVm.deletePerson = deletePerson;

    function showViewModal(emp) {
        cardVm.data.selectedEmp = emp;
        cardVm.isCreate = true;
        createModal();
    }

    function createModal() {
        cardVm.createModal = $modal({
            scope: $scope,
            templateUrl: 'template/modal.viewEmp.tpl.html',
            // controller: 'ModalController',
            show: true
            // resolve: {
            //     parentScope: function () {
            //         return $scope;
            //     }
            // }
        });
    }

    function deletePerson(person) {
        console.log(person);
        // cardVm.isDeleting = true;
        // cardVm.data.removeEmployee(person).then(function () {
        //     cardVm.isDeleting = false;
        // });
    }
}

// angular.module('myApp.employee').controller('ModalController', ModalController);
// function ModalController($modalInstance) {
//     console.log('modal-controller');
// }

angular.module('myApp.employee').directive('empInfoPanel', empInfoPanel);
function empInfoPanel() {
    // console.log('info-panel-before-return');
    var self = {
        restrict: 'EA',
        templateUrl: 'template/emp.info.panel.html',
        scope: {
            person: '='
            // modal: '=',
            // isDeleting: '='
            // deletePerson: '&' // & is for functions
        },
        // require: '^nameCard', // HOW TO MAKE THIS REQUIRE WORK????
        link: EmpInfoPanelLink,
        controller: EmpInfoPanelController,
        controllerAs: 'infoPanelVm',
        bindToController: true
    };

    function EmpInfoPanelLink($scope, $elem, $attr, $ctrl) {
        // console.log('info-panel-link');
        // console.log($scope);
        // $scope.hideModal = hideModal;
        //
        // function hideModal() {
        //     $scope.hideModal();
        // }
    }

    return self;
}
function EmpInfoPanelController(employeeService) {
    // console.log('info-panel-controller');
    var infoPanelVm = this;
    infoPanelVm.isDeleting = false;
    infoPanelVm.data = employeeService;
    infoPanelVm.deletePerson = deletePerson;

    function deletePerson(person) {
        console.log(person);
        // infoPanelVm.isDeleting = true;
        // infoPanelVm.data.removeEmployee(person).then(function () {
        //     infoPanelVm.isDeleting = false;
        // });
    }
}
