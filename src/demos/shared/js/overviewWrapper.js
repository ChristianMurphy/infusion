/*
Copyright 2014 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

// Declare dependencies
/*global demo:true, fluid, jQuery*/

// JSLint options 
/*jslint white: true, funcinvoke: true, undef: true, newcap: true, nomen: true, regexp: true, bitwise: true, browser: true, forin: true, maxerr: 100, indent: 4 */

var demo = demo || {};

(function ($, fluid) {
    var resources = {
        bundle: {
            href: "messages/config.json"
        }
    };

    fluid.fetchResources(resources, function(resourceSpecs) {
        var bundle = JSON.parse(resourceSpecs.bundle.resourceText);
        fluid.overviewPanel(".flc-overviewPanel", {
            resources: {
                template: {
                    href: bundle.templateUrl || "../../components/overviewPanel/html/overviewPanelTemplate.html"
                }
            },
            strings: bundle.strings,
            markup: bundle.markup,
            links: bundle.links
        });
    });
})(jQuery, fluid);
