// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
(function(){

var app = angular.module('socialinc', ['ionic','ngCordova','uiGmapgoogle-maps']);

// Config start
app.config(['$stateProvider', '$urlRouterProvider','uiGmapGoogleMapApiProvider', function($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {

  uiGmapGoogleMapApiProvider.configure({
      //    key: 'your api key',
      v: '3.20', //defaults to latest 3.X anyhow
      libraries: 'weather,geometry,visualization'
    });

  $stateProvider.state('login',{
    url: '/login',
    templateUrl: 'templates/login.html',
  });

  $stateProvider.state('signup',{
    url: '/signup',
    templateUrl: 'templates/signup.html',
  });

  $stateProvider.state('profile',{
    url: '/profile',
    templateUrl: 'templates/profile.html',
  });

  $stateProvider.state('provider',{
    url: '/provider',
    templateUrl: 'templates/provider.html',
  });

  $stateProvider.state('searchclass',{
    url: '/searchclass',
    templateUrl: 'templates/searchclass.html',
  });

  $urlRouterProvider.otherwise('/login');
}]);
// Config end


// Controllers start
app.controller('AppCtrl', ['$scope','$ionicHistory','$ionicSideMenuDelegate', function($scope, $ionicHistory, $ionicSideMenuDelegate) {
  // $scope.statusBarHide = function() {
  //   if(window.StatusBar) {
  //     StatusBar.styleDefault();
  //     StatusBar.hide();
  //   }
  // };
  $ionicSideMenuDelegate.canDragContent(true);

  $scope.isActive = false;
  $scope.activeButton = function() {
    $scope.isActive = !$scope.isActive;
  };

  $scope.clearHistory = function(){ 
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true,
      historyRoot: false
    });
  };

  $scope.user = {
    name: 'Anthony F.',
    profilePic: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png',
    likeCount: 125,
    provider: true
  }

}]);


app.controller('LoginSignupCtrl', ['$scope','$ionicSideMenuDelegate', function ($scope, $ionicSideMenuDelegate) {

  $ionicSideMenuDelegate.canDragContent(false);

}]);


app.controller('ProfileCtrl', ['$scope','$ionicLoading','$timeout', function ($scope, $ionicLoading, $timeout) {

  $ionicLoading.show({
    noBackdrop: false,
    template: '<p class="spinner-custom"><ion-spinner icon="ripple"/></p>'
  });
  $timeout(function(){
    $ionicLoading.hide();
  },1000);

}]);  

app.controller('ProviderCtrl', ['$scope', function ($scope) {

}]);

app.controller('SearchclassCtrl', ['$scope','uiGmapGoogleMapApi', function ($scope, uiGmapGoogleMapApi) {

  $scope.user = {
    name: 'Anthony F.',
    profilePic: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png',
    likeCount: 125,
    provider: true
  };

  $scope.myCoords = {
    lat:'',
    lon:''
  };

  $scope.nearbyClasses = [
    {
      id: 1,
      name: 'Alican O.',
      coords: {
        latitude: 25.765688,
        longitude: -80.194935
      },
      pic: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
      services: ' ',
      classes: 'Yoga class',
      likes: 19,
      options: {
        draggable: false,
        labelContent: "<div class='customMarker nb-class'>" + "<img src='" + 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png' + "'>" + "<p>" + 'Alican O.' + "</p></div>",
        labelAnchor: "45 45",
        labelClass: "marker-labels",
        icon:' '
      }
    },
    {
      id: 2,
      name: 'Bugra U.',
      coords: {
        latitude: 25.765468,
        longitude: -80.192580
      },
      pic: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png',
      services: ' ',
      classes: 'Math class',
      likes: 23,
      options: {
        draggable: false,
        labelContent: "<div class='customMarker nb-class'>" + "<img src='" + 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png' + "'>" + "<p>" + 'Bugra U.' + "</p></div>",
        labelAnchor: "45 45",
        labelClass: "marker-labels",
        icon:' '
      }
    },
    {
      id: 3,
      name: 'Sean H.',
      coords: {
        latitude: 25.765468,
        longitude: -80.192580
      },
      pic: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460',
      services: ' ',
      classes: 'Computer science class',
      likes: 46,
      options: {
        draggable: false,
        labelContent: "<div class='customMarker nb-class'>" + "<img src='" + 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460' + "'>" + "<p>" + 'Sean H.' + "</p></div>",
        labelAnchor: "45 45",
        labelClass: "marker-labels",
        icon:' '
      }
    }
  ];
  
  $scope.drawMap = function(position) {
 
    //$scope.$apply is needed to trigger the digest cycle when the geolocation arrives and to update all the watchers
    $scope.$apply(function() {

      $scope.myCoords.lat  = position.coords.longitude;
      $scope.myCoords.lon = position.coords.latitude;
 
      // var styles = [{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#f7f1df"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#d0e3b4"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"color":"#fbd3da"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#bde6ab"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffe15f"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efd151"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"black"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#cfb2db"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#a2daf2"}]}];

      $scope.map = {
        center: {
          // latitude: $scope.myCoords.lat,
          // longitude: $scope.myCoords.lon,
          latitude: 25.764838,
          longitude: -80.193717
        },
        zoom: 17,
        pan: 1,
        mapOptions: {
          streetViewControl: false,
          zoomControl: false,
          overviewMapControl: false,
          mapTypeControl: false,
          // styles: styles
        }
      };

      $scope.myLocation = {
        id: 0,
        coords: {
          // latitude: $scope.myCoords.lat,
          // longitude: $scope.myCoords.lon,
          latitude: 25.764838,
          longitude: -80.193717
        },
        options: {
          draggable: false,
          labelContent: "<div class='customMarker'>" + "<img src='" + $scope.user.profilePic + "'>" + "<p>" + $scope.user.name + "</p></div>",
          labelAnchor: "45 45",
          labelClass: "marker-labels",
          icon:' '
        }
      };

    });
  };
 
  navigator.geolocation.getCurrentPosition($scope.drawMap);

}]);


// Controllers end


// Directives start
app.directive('stellax', ['$timeout', function ($timeout) {
  return {
    restrict: 'A',
    link: function ($scope, $element, $attr) {
      $timeout(function () {
        $('.scroll').stellar({
          scrollProperty: 'transform',
          positionProperty: 'transform',
          horizontalScrolling: false,
          verticalOffset: 0
        });
      });
    }
  };
}]);
// Directives end


// App-run start
app.run(['$ionicPlatform', function($ionicPlatform) {

  $ionicPlatform.ready(function() {
    console.log('Javascript OK');
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
      // StatusBar.styleLightContent();
      // StatusBar.hide();
    }
  });
}]);


}());
