/**
 * Created by nguyen the dat on 22/3/2018.
 */
(function () {
    'use strict';

    angular.module('Hrm.LabourAgreementType').service('LabourAgreementTypeService', LabourAgreementTypeService);

    LabourAgreementTypeService.$inject = [
        '$http',
        '$q',
        '$filter',
        'settings',
        'Utilities'
    ];

    function LabourAgreementTypeService($http, $q, $filter, settings, utils) {
        var self = this;
        var baseUrl = settings.api.baseUrl + settings.api.apiV1Url;

        self.getlabouragreementtypes = getlabouragreementtypes;
        self.savelabouragreementtype = savelabouragreementtype;
        self.getlabouragreementtype = getlabouragreementtype;
        self.deletelabouragreementtypes = deletelabouragreementtypes;
        self.getTableDefinition = getTableDefinition;

        function getlabouragreementtypes(pageIndex, pageSize) {
            var url = baseUrl + 'labouragreement/' + pageIndex + '/' + pageSize;
//            url += '?page=' + ((pageIndex >= 0) ? pageIndex : 0);
//            url += '&size=' + ((pageSize > 0) ? pageSize : 25);

            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function savelabouragreementtype(priority, successCallback, errorCallback) {
            var url = baseUrl + 'labouragreement';

            return utils.resolveAlt(url, 'POST', null, priority, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function getlabouragreementtype(id) {
            if (!id) {
                return $q.when(null);
            }

            var url = baseUrl + 'labouragreement/' + id;
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function deletelabouragreementtypes(priorities, successCallback, errorCallback) {
            if (!priorities || priorities.length <= 0) {
                return $q.when(null);
            }

            var url = baseUrl + 'labouragreement';
            return utils.resolveAlt(url, 'DELETE', null, priorities, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function getTableDefinition() {

            var _tableOperation = function (value, row, index) {
                return '<a class="green-dark margin-right-20" href="#" data-ng-click="$parent.editlabouragreementtype(' + "'" + row.id + "'" + ')"><i class="icon-pencil margin-right-5"></i>S???a</a>';
            };
        	var _formaterType = function (value, row, index, field) {
                if(value==1){
                	return 'Ch??nh Quy???n';
                }
                else if(value==2){
                	return '??o??n th???';
                }
                else{
                	return '';
                }
            };
            var _cellNowrap = function (value, row, index, field) {
                return {
                    classes: '',
                    css: {'white-space': 'nowrap'}
                };
            };

            return [
                {
                    field: 'state',
                    checkbox: true
                }
                , {
                    field: '',
                    title: 'Thao t??c',
                    switchable: true,
                    visible: true,
                    formatter: _tableOperation,
                    cellStyle: _cellNowrap
                }
                , {
                    field: 'code',
                    title: 'M?? h???p ?????ng lao ?????ng',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }
                , {
                    field: 'name',
                    title: 'T??n h???p ?????ng lao ?????ng',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }
                /*, {
                    field: 'type',
                    title: 'Lo???i h???p ?????ng lao ?????ng',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap,
                    formatter:_formaterType
                }*/
            ]
        }
    }

})();