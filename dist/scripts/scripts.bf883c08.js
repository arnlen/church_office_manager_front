"use strict";angular.module("churchOfficeManager",["ngResource","ngAnimate","churchOfficeManagerConfig","cgNotify"]),angular.module("churchOfficeManagerConfig",[]).constant("ENV","development").constant("API_BASE_URL","http://localhost:3000/"),function(){function a(a,b){var c=this;c.bodyScrollable=!0,b.config({duration:3e3,templateUrl:"views/shared/notify-template.html"})}angular.module("churchOfficeManager").controller("GlobalController",a),a.$inject=["$scope","notify"]}(),function(){function a(a,b){a.toggleMemberList=function(){a.members||a.loadMemberList(),a.memberListOpen=!a.memberListOpen},a.closeMemberList=function(){a.memberListOpen=!1,a.memberToConfirm=!1},a.confirmMemberInCharge=function(b){a.memberToConfirm=b},a.updateMemberInCharge=function(b){a.loadedService.member_in_charge_id=b.id,a.loadedService.$update(),a.closeMemberList()},a.toggleMemberService=function(c,d){var e=a.loadedMember.leader_of_id===d.id,f=a.isMemberOfThisService(d);a.loadedMember.$toggleMemberService({id:c.id,serviceId:d.id,isMember:f,isLeader:e},function(a){b({message:a.message,classes:"success"})},function(a){b({message:a.data.message,classes:"failure"})})},a.isMemberOfThisService=function(b){if(a.loadedMember){var c=!1;return angular.forEach(a.loadedMember.services,function(a){c||b.id!==a.id||(c=!0)}),c}}}angular.module("churchOfficeManager").controller("MembersController",a),a.$inject=["$scope","notify","membersService"]}(),function(){function a(a,b,c,d,e,f,g){function h(){b.all([i(),k()]).then(function(){g("OfficeController","Info","---> System activated and ready to rock!")})}function i(){var a=b.defer();return o.Office.find("next").then(function(b){o.Office.loaded=b,g("OfficeController","Info","Office loaded"),j().then(function(){a.resolve()})}),a.promise}function j(){var a=b.defer();return o.Service.all(c.loaded).then(function(b){o.Office.services=b,g("OfficeController","Info","Services (re)loaded"),a.resolve()}),a.promise}function k(){var a=b.defer();return o.Member.all().then(function(b){o.Office.members=b,g("OfficeController","Info","Members (re)loaded"),a.resolve()}),a.promise}function l(){o.Office.find("previous")}function m(){o.Office.find("next")}function n(){a.$broadcast("OfficesController > closeAllPanels")}var o=this;o.Office=c,o.Office.getPrevious=l,o.Office.getNext=m,o.Office.closeAllPanels=n,o.Office.eventList=[],o.Service=d,o.Member=e,h(),o.Office.eventList=["service-list-item.directive > service.clicked","service-panel.directive > service.panelClosed","service-panel.directive > member.clicked","service-panel.directive > service.editMode","service-panel.directive > service.loaded.updated","service-panel.directive > member.loaded.updated","member-panel.directive > member.panelOpen","member-panel.directive > member.panelClosed","member-services.directive > service.loaded.updated","member-services.directive > member.loaded.updated"],angular.forEach(o.Office.eventList,function(b){var c=b.split(" > "),d=(c[0],c[1]);a.$on(b,function(c){c.stopPropagation(),g("OfficesController","Event catched",b),a.$broadcast("OfficesController > "+d),"service.loaded.updated"===d?j():"member.loaded.updated"===d&&k()})})}angular.module("churchOfficeManager").controller("OfficesController",a),a.$inject=["$scope","$q","officesService","servicesService","membersService","tasksService","logsService"]}(),function(){function a(a){a.toggleEditMode=function(){a.editMode=!a.editMode},a.editModeToggleMemberList=function(){a.editModeMemberListOpen=!a.editModeMemberListOpen},a.editModeToggleServiceMembersList=function(){a.editModeServiceMembersListOpen=!a.editModeServiceMembersListOpen},a.isMemberOfThisService=function(b){return membersService.isMemberOfThisService(b,a.loadedService)},a.toggleMembership=function(b){membersService.joinOrLeaveService(a,b,a.loadedService)}}angular.module("churchOfficeManager").controller("ServicesController",a),a.$inject=["$scope","notify","servicesService","membersService"]}(),function(){function a(a,b){function c(c){b.update(a,c)}var d=this;d.update=c}angular.module("churchOfficeManager").controller("TasksController",a),a.$inject=["$scope","tasksService"]}(),function(){function a(){return{restrict:"A",link:function(a,b){b[0].addEventListener("transitionend",function(b){"right"!==b.propertyName||a.servicePanelOpen||a.unloadService()})}}}angular.module("churchOfficeManager").directive("chAfterTransition",a)}(),function(){function a(){return{restrict:"A",scope:{name:"@"},template:"{{ name[0].toUpperCase() }}{{ name.slice(1) }}"}}angular.module("churchOfficeManager").directive("chCapitalize",a)}(),function(){function a(a,b){function c(a,b,c,d){b.on("click",function(){d.Service.clicked=a.service,a.$emit("service-list-item.directive > service.clicked")})}function d(a){var c=this;c.Service=b,c.service=a.service}var e={restrict:"A",scope:{service:"="},templateUrl:"scripts/directives/service-list-item.directive.html",link:c,controller:d,controllerAs:"dvm"};return e}angular.module("churchOfficeManager").directive("chServiceListItem",a),a.$inject=["$rootScope","servicesService"]}(),function(){function a(a,b,c,d,e,f){function g(a,b,c,e){a.$on("OfficesController > service.clicked",function(){d("ServicePanelDirective","Event catched","OfficesController > service.clicked"),e.Service.loadService()}),a.$on("OfficesController > member.panelOpen",function(){d("ServicePanelDirective","Event catched","OfficesController > member.panelOpen"),e.Service.panelPushed=!0}),a.$on("OfficesController > member.panelClosed",function(){d("ServicePanelDirective","Event catched","OfficesController > member.panelClosed"),e.Service.panelPushed=!1}),a.$on("OfficesController > closeAllPanels",function(){d("ServicePanelDirective","Event catched","OfficesController > closeAllPanels"),e.Service.closePanel()}),a.$on("OfficesController > service.loaded.updated",function(){d("ServicePanelDirective","Event catched","OfficesController > service.loaded.updated"),e.Service.reloadService()})}function h(a){function g(){s.Service.find(s.Service.clicked).then(function(a){s.Service.loaded=a,d("ServicePanelDirective","Info","Service loaded"),s.Service.openPanel(),s.Task.all(s.Service.loaded).then(function(a){s.Service.loadedTasks=a,d("ServicePanelDirective","Info","Service tasks loaded")})})}function h(b){s.Member.isMemberOfThisService(b,s.Service.loaded)?s.Member.leaveService(b,s.Service.loaded).then(function(){s.Service.reloadService(),a.$emit("service-panel.directive > member.loaded.updated"),d("ServicePanelDirective","Info",b.name+" just left service "+s.Service.loaded.name)}):s.Member.joinService(b,s.Service.loaded).then(function(){s.Service.reloadService(),a.$emit("service-panel.directive > member.loaded.updated"),d("ServicePanelDirective","Info",b.name+" just joined service "+s.Service.loaded.name)})}function i(b){s.Service.loaded.leader_id=b.id,s.Service.loaded.leader_name=b.name,s.Service.loaded.$update({leader_id:b.id,leader_name:b.name}).then(function(){a.$emit("service-panel.directive > service.loaded.updated"),d("ServicePanelDirective","Info",b.name+" is now leader of service "+s.Service.loaded.name)})}function j(a){var b=!1;a.$update().then(function(){angular.forEach(s.Office.services,function(c){b||c.id!==a.service_id||(b=!0,c.$get(),d("ServicePanelDirective","Info","Task updated and Office service concerned updated"))})})}function k(){s.Service.memberInChargeListOpen=!s.Service.memberInChargeListOpen}function l(a){s.Service.memberToConfirm=a}function m(){s.Service.memberToConfirm=!1}function n(){s.Service.loaded.member_in_charge_id=s.Service.memberToConfirm.id,s.Service.loaded.$update().then(function(a){d("ServicePanelDirective","Info",a.member_in_charge_name+" is now in charge of service "+s.Service.loaded.name+" for this office"),m(),k()})}function o(){s.Service.panelOpen=!0,a.$emit("service-panel.directive > service.panelOpen")}function p(){s.Service.panelOpen=!1,s.Service.panelPushed=!1,s.Service.editMode=!1,a.$emit("service-panel.directive > service.panelClosed")}function q(){s.Service.editMode=!s.Service.editMode,s.Service.editMode&&a.$emit("service-panel.directive > service.editMode")}function r(b){s.Member.clicked=b,a.$emit("service-panel.directive > member.clicked")}var s=this;s.Service=b,s.Service.loadService=g,s.Service.reloadService=g,s.Service.openPanel=o,s.Service.closePanel=p,s.Service.toggleEditMode=q,s.Service.selectMember=r,s.Service.toggleMembership=h,s.Service.setLeader=i,s.Service.toggleMemberInChargeList=k,s.Service.selectMemberInCharge=l,s.Service.resetMemberToConfirm=m,s.Service.confirmSelectedMemberInCharge=n,s.Service.panelPushed=!1,s.Service.editMode=!1,s.Service.memberInChargeListOpen=!1,s.Service.memberToConfirm=!1,s.Member=c,s.Office=e,s.Task=f,s.Task.toggleCompletion=j}var i={restrict:"E",scope:!0,templateUrl:"scripts/directives/service-panel.directive.html",link:g,controller:h,controllerAs:"dvm"};return i}angular.module("churchOfficeManager").directive("chServicePanel",a),a.$inject=["$q","servicesService","membersService","logsService","officesService","tasksService"]}(),function(){function a(a,b){function c(a,c,d,e){a.$on("OfficesController > member.clicked",function(){b("MemberPanelDirective","Event catched","OfficesController > member.clicked"),e.Member.loadMember()}),a.$on("OfficesController > service.panelClosed",function(){b("MemberPanelDirective","Event catched","OfficesController > service.panelClosed"),e.Member.closePanel()}),a.$on("OfficesController > service.editMode",function(){b("MemberPanelDirective","Event catched","OfficesController > service.editMode"),e.Member.closePanel()}),a.$on("OfficesController > closeAllPanels",function(){b("MemberPanelDirective","Event catched","OfficesController > closeAllPanels"),e.Member.closePanel()}),a.$on("OfficesController > member.loaded.updated",function(){b("MemberPanelDirective","Event catched","OfficesController > member.loaded.updated"),e.Member.reloadMember()})}function d(c){function d(){i.Member.find(i.Member.clicked).then(function(a){i.Member.loaded=a,b("ServicePanelDirective","Info","Service loaded"),i.Member.openPanel()})}function e(){i.Member.loaded.$update().then(function(){h(),c.$emit("member-panel.directive > member.updated"),b("MemberPanelDirective","Info",i.Member.loaded.name+" saved")})}function f(){i.Member.panelOpen=!0,c.$emit("member-panel.directive > member.panelOpen")}function g(){i.Member.panelOpen=!1,i.Member.editMode=!1,c.$emit("member-panel.directive > member.panelClosed")}function h(){i.Member.editMode=!i.Member.editMode}var i=this;i.Member=a,i.Member.editMode=!1,i.Member.loadMember=d,i.Member.reloadMember=d,i.Member.openPanel=f,i.Member.closePanel=g,i.Member.toggleEditMode=h,i.Member.validEdition=e}var e={restrict:"E",scope:!0,templateUrl:"scripts/directives/member-panel.directive.html",link:c,controller:d,controllerAs:"dvm"};return e}angular.module("churchOfficeManager").directive("chMemberPanel",a),a.$inject=["membersService","logsService"]}(),function(){function a(a,b,c,d){function e(){}function f(c){function e(a){if(a&&f.Member.editMode){var b=f.Member.isMemberOfThisService(f.Member.loaded,a),e=f.Member.isLeaderOfThisService(f.Member.loaded,a);b&&!e?a.$update({leader_id:f.Member.loaded.id}).then(function(){c.$emit("member-services.directive > service.loaded.updated"),d("MemberServiceDirective","Info",f.Member.loaded.name+" is now leader of service "+a.name)}):e?f.Member.leaveService(f.Member.loaded,a).then(function(){a.leader_id=0,a.$update().then(function(){c.$emit("member-services.directive > service.loaded.updated"),c.$emit("member-services.directive > member.loaded.updated"),d("MemberServiceDirective","Info",f.Member.loaded.name+" has left service "+a.name)})}):f.Member.joinService(f.Member.loaded,a).then(function(){c.$emit("member-services.directive > member.loaded.updated"),d("MemberServiceDirective","Info",f.Member.loaded.name+" is now member of service "+a.name)})}}var f=this;f.Office=a,f.Member=b,f.Member.toggleMemberService=e}var g={restrict:"E",scope:!0,templateUrl:"scripts/directives/member-services.directive.html",link:e,controller:f,controllerAs:"dvm"};return g}angular.module("churchOfficeManager").directive("chMemberServices",a),a.$inject=["officesService","membersService","$q","logsService"]}(),function(){function a(a,b,c,d,e){function f(a){var b=e.defer();return a&&o.get({id:a}).$promise.then(function(a){b.resolve(a)}),b.promise}function g(a){var b=e.defer();return a?o.query({serviceId:a.id}).$promise.then(function(a){b.resolve(a)}):o.query().$promise.then(function(a){b.resolve(a)}),b.promise}function h(a,b){if(a&&b){var c=!1;return angular.forEach(a.services,function(a){c||b.id!==a.id||(c=!0)}),c}}function i(a,b){return a&&b?b.leader_id===a.id:void 0}function j(a,b){var c=e.defer();return p.create({memberId:a.id,serviceId:b.id}).$promise.then(function(){c.resolve()}),c.promise}function k(a,b){var c=e.defer();return p.destroy({id:42,memberId:a.id,serviceId:b.id}).$promise.then(function(){c.resolve()}),c.promise}var l=void 0,m=void 0,n=!1,o=a(b+"members/:id",{id:"@id"},{update:{method:"PUT"}}),p=a(b+"memberships/:id",{id:"@id"},{create:{method:"POST",params:{serviceId:"@serviceId",memberId:"@memberId"}},destroy:{method:"DELETE",params:{serviceId:"@serviceId",memberId:"@memberId"}}}),q={clicked:l,loaded:m,panelOpen:n,find:f,all:g,isMemberOfThisService:h,isLeaderOfThisService:i,joinService:j,leaveService:k};return q}angular.module("churchOfficeManager").factory("membersService",a),a.$inject=["$resource","API_BASE_URL","$rootScope","notify","$q"]}(),function(){function a(a,b,c,d){function e(a){var b=d.defer();if(a){var c=f&&f.date||null;i.get({id:a,date:c}).$promise.then(function(a){b.resolve(a)})}return b.promise}var f=void 0,g=void 0,h=void 0,i=a(b+"offices/:id",{id:"@id"}),j={loaded:f,members:g,services:h,find:e};return j}angular.module("churchOfficeManager").factory("officesService",a),a.$inject=["$resource","API_BASE_URL","$rootScope","$q"]}(),function(){function a(a,b,c,d){function e(a){var b=d.defer();return k.get({id:a.id}).$promise.then(function(a){b.resolve(a)}),b.promise}function f(a){var b=d.defer();return k.getOfficeServices({officeId:a.id}).$promise.then(function(a){b.resolve(a)}),b.promise}var g=void 0,h=void 0,i=!1,j=!1,k=a(b+"services/:id",{id:"@id"},{update:{method:"PUT"},getOfficeServices:{method:"GET",params:{officeId:"@officeId"},isArray:!0}}),l={clicked:g,loaded:h,panelOpen:i,displayAll:j,find:e,all:f};return l}angular.module("churchOfficeManager").factory("servicesService",a),a.$inject=["$resource","API_BASE_URL","$rootScope","$q"]}(),function(){function a(a,b,c){function d(a){var b=c.defer();return g.get({id:a.id}).$promise.then(function(a){b.resolve(a)}),b.promise}function e(a){var b=c.defer();return g.getServiceTasks({serviceId:a.id}).$promise.then(function(a){b.resolve(a)}),b.promise}function f(a){var b=c.defer();return a.$update().then(function(){b.resolve()}),b.promise}var g=a(b+"tasks/:id",{id:"@id"},{update:{method:"PUT"},getServiceTasks:{method:"GET",params:{serviceId:"@serviceId"},isArray:!0}}),h={find:d,all:e,update:f};return h}angular.module("churchOfficeManager").factory("tasksService",a),a.$inject=["$resource","API_BASE_URL","$q"]}(),function(){function a(){function a(a,b,c){var d="[ "+b+" | "+a+" ] "+c;console.log(d)}return a}angular.module("churchOfficeManager").factory("logsService",a),a.$inject=[]}();