# Angular Refresh
-----------------

## Global Requirements

### Nodemon
For node watching files and restarting server
https://github.com/remy/nodemon#nodemon

## Angular Patterns

### ngApp - Creating a Angular App
Creating an angular app is very easy first do this:
`var app = angular.module('<app name>',[<app dependancies>,...]);`

---

### Controllers
Controller house the logic / behaviour of your app
Note, you will need to inject dependancy ie. $scope not scope

app.controller('<controller name>', function($scope, <other dependancies>, ...){
    <controller logic>
});

To protect against minifiers use an array

app.controller('<controller name>', ['<dep1>','<dep2>', function(dep1,dep2){
    <code here...>
}]);

---

### Directives

#### Basic diectives, 
below is a self contained directive with its own controller.

app.directive('<name>', function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '<url path>',
        controller: '<url path>' or function($scope){
            <contoller code...>
        }
    }
});

#### Isolate scope directives
Using the same directive multiple times on a page you weill need to (isolate scope), or else each directive will be bound together. To create an isolate scope add `scope: {}` to the return object. 

Note when you do this the isolate scope is isolated from the parent and other scopes, hence isolated. If your directive has an controller defined in the directive then is will have access to the method and properties.

However, if your directive was relying on the parent controller scope to provide properties and methods then you will need to map/bind these to the directive. To dio this you will need to do several things.

In your page html: `<my directive up="upVote()" down="downVote()">`
Here we created the attrs `up` and `down`. We then pass the parent controllers methods into these.

Next we have to define this in the directive declaration:

app.directive('<name>', function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '<url path>',
        scope: {
            a: '&up'
            b: '&down'
        },
        controller: function($scope){
            // NOTE: $scope is the isolate scope
        }
    }
});

Options are `=` which is a literal expression or object
`&` = function you want to execute
`@` = a string

And finally to get this working we have  to go into the directive template and call the methods in the isolate scope.

<div>
    <button class="btn btn-primary" ng-click="a()">Up Vote</button>
    <button class="btn btn-primary" ng-click="b()">Down Vote</button>
</div> 

Don't forget to add the files to your page's script tag references!! Done :)


#### Manipulating the DOM
If you want to make changes t the DOM you will need to use a link function to expose parts of the DOM

app.directive('<name>', function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '<url path>',
        scope: {
            a: '&up'
            b: '&down'
        },
        link: function(scope, element, attrs, controller){
            scope = isolate own scope/ parent (if not using isolate)
            element = the directive element, uses Jquery Lite eg. $(.myDirective)
            attrs = attributes on the element eg. if input field <name>, <value>, <type>
            controller = passes you the controller as and object allows controller.add() used with require property to have multiple directives shae a controller.
        }
    }
});

---

### Services
Services allow to abstract out business logic so you can re-use it in other places in the app.
Note the return <object> this provides user of the service an API

Uses a simple signature: 

app.factory(<name>, function(<dependancies>){
    return {
        <code here...>
    }
});

---

### Routing

### Scope and Rootscope
