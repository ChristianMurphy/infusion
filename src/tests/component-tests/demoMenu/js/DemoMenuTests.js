/*
Copyright 2014 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt

*/

// Declare dependencies
/*global fluid, jqUnit, jQuery*/

// JSLint options
/*jslint white: true, funcinvoke: true, undef: true, newcap: true, nomen: true, regexp: true, bitwise: true, browser: true, forin: true, maxerr: 100, indent: 4 */

(function ($) {
    $(document).ready(function () {

        jqUnit.module("OverviewPanel Tests");

        var resources = {
            template: {
                href: "../../../../components/overviewPanel/html/overviewPanelTemplate.html"
            }
        };

        var strings = {
            titleBegin: "aaa",
            titleLinkText: "bbb",
            titleEnd: "ccc",
            componentName: "ddd",
            componentVersion: "eee",
            instructionsHeading: "fff",
            codeLinkText: "ggg",
            apiLinkText: "hhh",
            designLinkText: "iii",
            feedbackText: "jjj",
            feedbackLinkText: "lll",
            closeText: "mmm"
        };

        var markup = {
            description: "aaa<span>bbb</span>",
            instructions: "ccc<span>ddd</span>",
            codeLinkHref: "#aaa",
            apiLinkHref: "#bbb",
            designLinkHref: "#ccc",
            feedbackLinkHref: "#ddd"
        };

        var assertPanelIsClosed = function (that) {
            jqUnit.assertFalse("Check that model.showMenu is false", that.model.showMenu);
            jqUnit.assertTrue("Check that container has hidden style", that.container.hasClass(that.options.styles.hidden));
        };

        var assertPanelIsOpen = function (that) {
            jqUnit.assertTrue("Check that model.showMenu is true", that.model.showMenu);
            jqUnit.assertFalse("Check that container does not have hidden style", that.container.hasClass(that.options.styles.hidden));
        };

        var verifyRendering = function (that, strings) {
            // check strings
            fluid.each(strings, function (value, key) {
                jqUnit.assertEquals("Check string with selector '" + key + "'", value, that.locate(key).text());
            });

            // check markup
            jqUnit.assertEquals("Check markup with selector 'description'", markup.description, that.locate("description").html());
            jqUnit.assertEquals("Check markup with selector 'instructions'", markup.instructions, that.locate("instructions").html());

            // check links
            jqUnit.assertEquals("Check link for selector 'codeLink'", markup.codeLinkHref, that.locate("codeLink").attr("href"));
            jqUnit.assertEquals("Check link for selector 'apiLink'", markup.apiLinkHref, that.locate("apiLink").attr("href"));
            jqUnit.assertEquals("Check link for selector 'designLink'", markup.designLinkHref, that.locate("designLink").attr("href"));
            jqUnit.assertEquals("Check link for selector 'feedbackLink'", markup.feedbackLinkHref, that.locate("feedbackLink").attr("href"));

            jqUnit.start();
        };

        jqUnit.asyncTest("Verify Rendering", function () {
            jqUnit.expect(18);
            fluid.overviewPanel(".flc-overviewPanel", {
                resources: resources,
                listeners: {
                    "afterRender": {
                        "listener": verifyRendering,
                        "args": ["{that}", strings],
                        "priority": "last"
                    }
                },
                strings: strings,
                markup: markup
            });
        });

        var verifyWhenInitiallyHidden = function (that) {
            // test that the panel is closed at onCreate
            assertPanelIsClosed(that);
        };

        jqUnit.asyncTest("Verify when initially hidden", function () {
            jqUnit.expect(2);
            fluid.overviewPanel(".flc-overviewPanel", {
                resources: resources,
                listeners: {
                    "onCreate": {
                        "listener": verifyWhenInitiallyHidden,
                        "priority": "last"
                    },
                    "afterRender": {
                        "listener": "jqUnit.start",
                        "priority": "last"
                    }
                },
                model: {
                    showMenu: false
                }
            });
        });

        var verifyWhenInitiallyVisible = function (that) {
            // check that the panel is open at the point of afterRender
            assertPanelIsOpen(that);
            jqUnit.start();
        };

        jqUnit.asyncTest("Verify when initially visible", function () {
            jqUnit.expect(2);
            fluid.overviewPanel(".flc-overviewPanel", {
                resources: resources,
                listeners: {
                    "afterRender": {
                        "listener": verifyWhenInitiallyVisible,
                        "priority": "last"
                    }
                },
                model: {
                    showMenu: true
                }
            });
        });

        var verifyCloseControl = function (that) {
            assertPanelIsOpen(that);
            that.locate("closeControl").click();
            assertPanelIsClosed(that);
            jqUnit.start();
        };

        jqUnit.asyncTest("Verify close control", function () {
            jqUnit.expect(4);
            fluid.overviewPanel(".flc-overviewPanel", {
                resources: resources,
                listeners: {
                    "afterRender": {
                        "listener": verifyCloseControl,
                        "priority": "last"
                    }
                },
                model: {
                    showMenu: true
                }
            });
        });

        var verifyCloseMenuInvoker = function (that) {
            assertPanelIsOpen(that);
            that.closeMenu();
            assertPanelIsClosed(that);
            jqUnit.start();
        };

        jqUnit.asyncTest("Verify closeMenu invoker", function () {
            jqUnit.expect(4);
            fluid.overviewPanel(".flc-overviewPanel", {
                resources: resources,
                listeners: {
                    "afterRender": {
                        "listener": verifyCloseMenuInvoker,
                        "priority": "last"
                    }
                },
                model: {
                    showMenu: true
                }
            });
        });

    });
})(jQuery);
