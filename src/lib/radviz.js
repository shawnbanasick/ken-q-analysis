var utils = {
    merge: function (obj1, obj2) {
        for (var p in obj2) {
            if (obj2[p] && obj2[p].constructor == Object) {
                if (obj1[p]) {
                    this.merge(obj1[p], obj2[p]);
                    continue;
                }
            }
            obj1[p] = obj2[p];
        }
    },
    mergeAll: function () {
        var newObj = {};
        var objs = arguments;
        for (var i = 0; i < objs.length; i++) {
            this.merge(newObj, objs[i]);
        }
        return newObj;
    },
    htmlToNode: function (htmlString, parent) {
        while (parent.lastChild) {
            parent.removeChild(parent.lastChild);
        }
        return this.appendHtmlToNode(htmlString, parent);
    },
    appendHtmlToNode: function (htmlString, parent) {
        return parent.appendChild(document.importNode(new DOMParser().parseFromString(htmlString, "text/html").body.childNodes[0], true));
    }
};

var radvizComponent = function () {
    var config = {
        el: null,
        size: 400,
        margin: 50,
        colorScale: d3.scale.ordinal().range(["skyblue", "orange", "lime"]),
        colorAccessor: null,
        dimensions: [],
        drawLinks: false,
        zoomFactor: 1,
        dotRadius: 6,
        useRepulsion: false,
        useTooltip: true,
        tooltipFormatter: function (d) {
            return d;
        }
    };
    var events = d3.dispatch("panelEnter", "panelLeave", "dotEnter", "dotLeave");
    var force = d3.layout.force().chargeDistance(0).charge(60).friction(0.9);

    var radvizDiv = d3.select("body").append("div")
        .attr("class", "radvizTooltip")
        .style("opacity", 0);


    var render = function (data) {
        data = addNormalizedValues(data);
        var normalizeSuffix = "_normalized";

        config.dimensions.pop();
        var dimensionNamesNormalized = config.dimensions.map(function (d) {
            return d + normalizeSuffix;
        });

        console.log(JSON.stringify(config.dimensions));

        var thetaScale = d3.scale.linear().domain([0, dimensionNamesNormalized.length]).range([0, Math.PI * 2]);
        var chartRadius = config.size / 2 - config.margin;
        var nodeCount = data.length;
        var panelSize = config.size - config.margin * 2;
        var dimensionNodes = config.dimensions.map(function (d, i) {
            var angle = thetaScale(i);
            var x = chartRadius + Math.cos(angle) * chartRadius * config.zoomFactor;
            var xLabel = chartRadius + Math.cos(angle) * chartRadius;
            var y = chartRadius + Math.sin(angle) * chartRadius * config.zoomFactor;
            var yLabel = chartRadius + Math.sin(angle) * chartRadius;
            return {
                index: nodeCount + i,
                x: x,
                xLabel: xLabel,
                y: y,
                yLabel: yLabel,
                fixed: true,
                name: d
            };
        });
        var linksData = [];
        data.forEach(function (d, i) {
            dimensionNamesNormalized.forEach(function (dB, iB) {
                linksData.push({
                    source: i,
                    target: nodeCount + iB,
                    value: d[dB]
                });
            });
        });
        force.size([panelSize, panelSize]).linkStrength(function (d) {
            return d.value;
        }).nodes(data.concat(dimensionNodes)).links(linksData).start();
        var svg = d3.select(config.el).append("svg").attr({
            width: config.size,
            height: config.size
        });
        svg.append("rect").classed("bg", true).attr({
            width: config.size,
            height: config.size
        });
        var root = svg.append("g").attr({
            transform: "translate(" + [config.margin, config.margin] + ")"
        });
        var panel = root.append("circle").classed("panel", true).attr({
            r: chartRadius,
            cx: chartRadius,
            cy: chartRadius
        });
        if (config.useRepulsion === true) {
            root.on("mouseenter", function (d) {
                force.chargeDistance(80).alpha(.2);
                events.panelEnter();
            });
            root.on("mouseleave", function (d) {
                force.chargeDistance(0).resume();
                events.panelLeave();
            });
        }
        if (config.drawLinks) {
            var links = root.selectAll(".link").data(linksData).enter().append("line").classed("link", true);
        }

        var nodes = root.selectAll("circle.dot").data(data).enter().append("circle").classed("dot", true).attr({
            r: config.dotRadius,
            fill: function (d) {

                var rowColorsRainbow = {
                    "F1": "#e31a1c",
                    "F2": "#ff7f00",
                    "F3": "#fb9a99",
                    "F4": "#fdbf6f",
                    "F5": "#b2df8a",
                    "F6": "#33a02c",
                    "F7": "#a6cee3",
                    "F8": "#1f78b4",
                    "F0": "white"
                };

                var color = rowColorsRainbow[d.factorGroup];

                return color;
            }
        }).on("mouseenter", function (d) {
            if (config.useTooltip) {
                // quick hack for tooltip 
                radvizDiv.transition()
                    .duration(100)
                    .style("opacity", 1);
                radvizDiv.html("<strong>" + d.respondent + "</strong><br>" + d.factorGroup + "<br>")
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            }
            events.dotEnter(d);
            this.classList.add("active");
        }).on("mouseout", function (d) {
            if (config.useTooltip) {
                radvizDiv.transition()
                    .duration(500)
                    .style("opacity", 0);
            }
            events.dotLeave(d);
            this.classList.remove("active");
        });
        var labelNodes = root.selectAll("circle.label-node").data(dimensionNodes).enter().append("circle").classed("label-node", true).attr({
            cx: function (d) {
                return d.xLabel;
            },
            cy: function (d) {
                return d.yLabel;
            },
            r: 4
        });
        var labels = root.selectAll("text.label").data(dimensionNodes).enter().append("text").classed("label", true).attr({
            x: function (d) {
                return d.xLabel;
            },
            y: function (d) {
                return d.yLabel;
            },
            "text-anchor": function (d) {
                if (d.xLabel > panelSize * .4 && d.xLabel < panelSize * .6) {
                    return "middle";
                } else {
                    return d.xLabel > panelSize / 2 ? "start" : "end";
                }
            },
            "dominant-baseline": function (d) {
                return d.yLabel > panelSize * .6 ? "hanging" : "auto";
            },
            dx: function (d) {
                return d.xLabel > panelSize / 2 ? "6px" : "-6px";
            },
            dy: function (d) {
                return d.yLabel > panelSize * .6 ? "6px" : "-6px";
            }
        }).text(function (d) {
            return d.name;
        });
        force.on("tick", function () {
            if (config.drawLinks) {
                links.attr({
                    x1: function (d) {
                        return d.source.x;
                    },
                    y1: function (d) {
                        return d.source.y;
                    },
                    x2: function (d) {
                        return d.target.x;
                    },
                    y2: function (d) {
                        return d.target.y;
                    }
                });
            }
            nodes.attr({
                cx: function (d) {
                    return d.x;
                },
                cy: function (d) {
                    return d.y;
                }
            });
        });
        var tooltipContainer = d3.select(config.el).append("div").attr({
            id: "radviz-tooltip"
        });
        var tooltip = tooltipComponent(tooltipContainer.node());
        return this;
    };
    var setConfig = function (_config) {
        config = utils.mergeAll(config, _config);
        return this;
    };
    var addNormalizedValues = function (data) {
        console.log(JSON.stringify(data));

        data.forEach(function (d) {
            config.dimensions.forEach(function (dimension) {
                if (dimension !== "factorGroup") {
                    d[dimension] = +d[dimension];
                }
            });
        });
        var normalizationScales = {};
        config.dimensions.forEach(function (dimension) {
            if (dimension !== "factorGroup") {
                normalizationScales[dimension] = d3.scale.linear().domain(d3.extent(data.map(function (d, i) {
                    return d[dimension];
                }))).range([0, 1]);
            }
        });
        data.forEach(function (d) {
            config.dimensions.forEach(function (dimension) {
                if (dimension !== "factorGroup") {
                    d[dimension + "_normalized"] = normalizationScales[dimension](d[dimension]);
                }
            });
        });
        console.log(JSON.stringify(data));
        return data;
    };
    var exports = {
        config: setConfig,
        render: render
    };
    d3.rebind(exports, events, "on");
    return exports;
};

var tooltipComponent = function (tooltipNode) {
    var root = d3.select(tooltipNode).style({
        position: "absolute",
        "pointer-events": "none"
    });
    var setText = function (html) {
        root.html(html);
        return this;
    };
    var position = function (x, y) {
        root.style({
            left: x + "px",
            top: y + "px"
        });
        return this;
    };
    var show = function () {
        root.style({
            display: "block"
        });
        return this;
    };
    var hide = function () {
        root.style({
            display: "none"
        });
        return this;
    };
    return {
        setText: setText,
        setPosition: position,
        show: show,
        hide: hide
    };
};