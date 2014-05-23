/// 
/// Directives - Obsolute Button that handles input in the heatpumpinputctrl.  
/// -------------------------------------------------------------------------------------------------------------------
/// <reference path='../_all.ts' />

module app.Directives {
    'use strict';
    interface sunInputScope extends ng.IScope {
        value: number;
        increment: Function;
        decrement: Function;
    }

    interface sunAttr extends ng.IAttributes {
        popover: Function;
        yes: string;
        no: string;
        title: string;
        buttonId: string;
        message: string;
    }

    export function sunInput(): ng.IDirective {
        var title = "Please choose a sun effect";
        var contenthtml = "<a data-ng-click =\"updateSunEffect(\'B\')\" style=\"font-size: 2.5em;\" data-icon =\"B\"></a> <a data-ng-click=\"updateSunEffect(\'H\')\" style=\"font-size: 2.5em;\"><span data-icon=\"H\"></span></a><a data-ng-click=\"updateSunEffect(\'N\')\" style=\"font-size: 2.5em;\" data-icon=\"N \"></a>";
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                value: '=ngModel'
            },
            //templateUrl: '../../partials/sunInput.html',
            link: function (scope, element, attrs: sunAttr) {
                var buttonId, html, message, nope, title, yep;
                html = "<div id=\"button-" + buttonId + "\">\n  <span class=\"confirmbutton-msg\">" + message + "</span><br>\n	<button class=\"confirmbutton-yes btn btn-danger\">" + yep + "</button>\n	<button class=\"confirmbutton-no btn\">" + nope + "</button>\n</div>";
                var testhtml = "<a id=\"button-" + buttonId + "style=\"font-size: 2.5em;\" data-icon =\"B\"></a>";
  
                buttonId = Math.floor(Math.random() * 10000000000);

                attrs.buttonId = buttonId;

                message = attrs.message || "Are you sure?";
                yep = attrs.yes || "Yes";
                nope = attrs.no || "No";
                title = attrs.title || "Confirm";
                element.popover({
                    content: html,
                    html: true, trigger: "manual",
                    title: title
                });

                return element.bind('click', function (e) {
                    var dontBubble, pop;
                    dontBubble = true;

                    e.stopPropagation();

                    element.popover('show');

                    pop = $("#button-" + buttonId);

                    pop.closest(".popover").click(function (e) {
                        if (dontBubble) {
                            e.stopPropagation();
                        }
                    });

                    pop.find('.confirmbutton-yes').click(function (e) {
                        dontBubble = false;

                        var func = $parse(attrs.confirmButton);
                        func(scope);
                    });

                    pop.find('.confirmbutton-no').click(function (e) {
                        dontBubble = false;

                        $document.off('click.confirmbutton.' + buttonId);

                        element.popover('hide');
                    });

                    $document.on('click.confirmbutton.' + buttonId, ":not(.popover, .popover *)", function () {
                        $document.off('click.confirmbutton.' + buttonId);
                        element.popover('hide');
                    });
                });
            }

        }
    };
}

app.registerDirective('sunInput');     