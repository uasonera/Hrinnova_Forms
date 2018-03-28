angular.module('app', ['builder', 'builder.components', 'validator.rules', 'ui.bootstrap', 'summernote']).run([
      '$builder', function ($builder) {
          return {
              popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"required\" />\n            Required\n        </label>\n    </div>\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
          };
      }
]);

function MyController($scope, $builder, $validator, $modal) {
    $scope.data = {
        boldTextTitle: "Done",
        textAlert: "Some content",
        mode: 'success'
    }
    $scope.open = function (mode) {
        $scope.data.mode = mode;
        var modalInstance = $modal.open({
            template: ' <div class="modal-header" ><button type="button" class="close" data-dismiss="modal" aria-label="Close" data-ng-click="close()"><span aria-hidden="true">×</span></button><h4 class="modal-title" id="customFormTitle">Custom Form</h4></div> <form id="customScreenForm" class="form-horizontal"><div class="modal-body"><div ng-model="input" fb-form="default" fb-default="defaultValue" id="customScreenBody"></div> </div><div class="modal-footer"><input type="submit" ng-click="submit()" class="btn btn-success" /><input type="button" value="Cancel" id="screenCancel" data-ng-click="close()" class="btn btn-danger" data-dismiss="modal"/></div></form>',
            controller: ModalInstanceCtrl,
            backdrop: 'static',
            keyboard: false,
            backdropClick: 'static',
            size: 'sm',
            resolve: {
                data: function () {
                    return $scope.data;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
            //alert( $scope.selected);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }
}

var ModalInstanceCtrl = function ($scope, $modalInstance, data, $builder, $validator) {
    $scope.data = data;
    $scope.close = function (/*result*/) {
        //alert()
        $modalInstance.close($scope.data);
        cancelCustomScreen();
    };
    var component, json;
    $builder.forms['default'] = null;
    json = customScreenJsonHtml;
    //json = '[{"id":0,"component":"text","editable":true,"index":0,"label":"Text Input","description":"","placeholder":"placeholder","options":[],"required":true,"validation":"/.*/","logic":{"action":"Hide"},"pointRules":[],"$$hashKey":"02G"},{"id":3,"component":"checkbox","editable":true,"index":1,"label":"Checkbox","description":"","placeholder":"placeholder","options":["value one","value two"],"required":true,"validation":"/.*/","logic":{"action":"Hide"},"pointRules":[],"$$hashKey":"05H"},{"id":1,"component":"date","editable":true,"index":2,"label":"Date Picker","description":"","placeholder":"","options":[],"required":true,"validation":"/.*/","maxDate":"NaN-aN-aN","logic":{"action":"Hide"},"pointRules":[],"$$hashKey":"02M"},{"id":2,"component":"time","editable":true,"index":3,"label":"Time Picker","description":"","placeholder":"","options":[],"required":true,"validation":"/.*/","logic":{"action":"Hide"},"pointRules":[],"$$hashKey":"04L"}]';
    component = $.parseJSON(json);
    $scope.form = null;
    $.each(component, function (i, item) {
        var formObj;
        return formObj = $builder.addFormObject('default', item);
    });
    $scope.form = $builder.forms['default'];
    $scope.input = [];
    $scope.defaultValue = {};
    $scope.submit = function () {
        $validator.validate($scope, 'default').success(function () {
            var validator = $("#customScreenForm")[0].checkValidity();
            if (validator) {
                console.log(JSON.stringify($scope.input));
                ShowProgress();
                SaveCustomData(JSON.stringify($scope.input), $modalInstance);
                return console.log('success');
            }
        }).error(function () {
            return console.log('error');
        });
    };
};
