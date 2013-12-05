/**
 * Created by theotheu on 05-12-13.
 */
function UserLoginCtrl($scope, $http, $window, usersService) {
    var isVerified, partial;

    usersService.users.get({action: "checkLogin"}, function (req) {
        isVerified = req.isVerified;
    });

    $scope.getPartial = function () {

        if (isVerified === undefined) {
            $http({
                method: "GET",
                url: "/account"
            }).success(function (data) {
                    isVerified = data.isVerified;

                    if (isVerified === true) {
                        partial = "/partials/logout.html";
                    } else {
                        partial = "/partials/login.html";
                    }
                    $scope.src = partial;
                    return partial;
                });
        }

        if (isVerified === true) {
            partial = "/partials/logout.html";
        } else {
            partial = "/partials/login.html";
        }
        $scope.src = partial;
        return partial;
    };

    $scope.login = function (loginForm) {

        $http({
            method: "POST",
            url: "/myLogin",
            data: {"username": loginForm.username, "password": loginForm.password}
        }).success(function (data) {
                isVerified = data.isVerified;

                if (isVerified === true) {
                    // load partial
                    partial = "/partials/logout.html"
                    $scope.src = partial;
                    // redirect to admin area
                    window.location = "#/requests";
                } else {
                    console.log('No login...');
                    window.location = "#/";
                    $scope.msg="No valid email or password."


                }
            });
    };

    $scope.logout = function () {
        console.log('logout');

        $http({method: 'GET', url: '/logout'})
            .success(function (data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                partial = "/partials/login.html"
                $scope.src = partial;
                // redirect to admin area
                $window.location.href = "/";

            })
    }

}