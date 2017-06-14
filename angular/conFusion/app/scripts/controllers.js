'use strict';

angular.module('confusion')
    
    .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
           
           $scope.tab = 1;
           $scope.filterText = '';
           $scope.showDetails = false;
           $scope.showMenu = false;
           $scope.message = "Loading ...";
        
           menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });
        
    
           $scope.select = function(setTab) {
                $scope.tab = setTab;

                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                } else if (setTab === 3) {
                    $scope.filtText = "mains";
                } else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }      
                else {
                    $scope.filtText = "";
                }
            };
           
           $scope.isSelected = function (checkTab) {
               
                return ($scope.tab === checkTab);
           };
           
           $scope.toggleDetails = function(){
                    $scope.showDetails = !$scope.showDetails;
           };
    
    }])

    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
    
    
         $scope.sortBy = '';

            $scope.showDish = false;
            $scope.message="Loading ...";
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
                  .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );
            
            
    }])

    .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {

                $scope.userComment = {rating: 5, comment:"", author:"",  date:""};
        

                $scope.submitComment = function () {
                    
                    $scope.userComment.date = new Date().toISOString();
                    
                    $scope.dish.comments.push($scope.userComment);
                    menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                    $scope.commentForm.$setPristine();
                    
                     $scope.userComment = {author:"", rating: 5, comment:"", date:""};

                    //Step 4: reset your form to pristine                   

                    //Step 5: reset your JavaScript object that holds your comment
                };
    }])
 
    .controller('ContactController', ['$scope', function($scope) {
        
        $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                               agree:false, email:"" };
        
        var channels = [{value:"tel", label:"Tel"},
                        {value:"Email", label:"Email"}];
        
        $scope.channels = channels;
        $scope.invalidChannelSelection = false;
    
    
     }])

    .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
    
        
        $scope.sendFeedback = function() {
            
    
                if ($scope.feedback.agree && !$scope.feedback.mychannel) {
                    
                    $scope.invalidChannelSelection = true;

                }
                else {
                    feedbackFactory.postFeedback().save({},$scope.feedback);
                    $scope.invalidChannelSelection = false;
                    
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                                       agree:false, email:"" };
                    $scope.feedback.mychannel="";

                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
        };

    }])

    .controller('IndexController', ['$scope','menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {
        
        
        $scope.showDish = false;
        $scope.showPromotion = false;
        $scope.showLeader = false;
        $scope.message="Loading ...";
        $scope.showDish = false;
        $scope.message="Loading ...";
        $scope.featured_dish = menuFactory.getDishes().get({id:0})
                        .$promise.then(
                            function(response){
                                $scope.featured_dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                        );
        
        
        $scope.promotion = menuFactory.getPromotions().get({id:0})
                     .$promise.then(
                           function(response) {
                               $scope.promotion = response;
                               $scope.showPromotion = true;
                           },
                           function(response) {
                               $scope.message = "Error: "+response.status + " " + response.statusText;
                           }
                     );
        
        $scope.leader = corporateFactory.getLeaders().get({id:3})
                    .$promise.then(
                            function(response) {
                               $scope.leader = response;
                               $scope.showLeader = true;
                           },
                           function(response) {
                               $scope.message = "Error: "+response.status + " " + response.statusText;
                           }
                     );
        
    }])

   .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
       
       
       $scope.showLeaders = false;
       $scope.message = "Loading ...";
       
       $scope.leaders = corporateFactory.getLeaders().query(

                       function(response) {
                                    $scope.leaders = response;
                                    $scope.showLeaders = true;
                                },
                                function(response) {
                                    $scope.message = "Error: "+response.status + " " + response.statusText;
                                });
       
       
   }])


;

    