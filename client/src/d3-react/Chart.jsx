import * as React from 'react';
import { scaleLinear } from 'd3-scale';
import { interpolateHcl } from 'd3-interpolate';
import '../common/style.scss';

class Chart extends React.Component {
    constructor(props, ctx) {
        super(props, ctx);
        this.svgWidth = 800;
        this.svgHeight = 320;
        this.margin = {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20
        };
        this.barSpacing = 4;
        this.width = this.svgWidth - this.margin.left - this.margin.right;
        this.height = this.svgHeight - this.margin.top - this.margin.bottom;
    }

    max(data) {
        const sorted = data.map((d) => d).sort((a, b) => {
            if (a.value > b.value) return 1;
            if (b.value > a.value) return -1;
            else return 0;
        });

        return sorted[sorted.length - 1].value;
    }

    getXFunction() {
        return scaleLinear()
            .domain([0, this.max(this.props.data)])
            .range([0, this.width]);
    }

    getYFunction() {
        return scaleLinear()
            .domain([0, this.props.data.length])
            .range([0, this.height]);
    }

    getColorFunction() {
        return scaleLinear()
            .domain([0, this.props.data.length])
            .interpolate(interpolateHcl)
            .range(['#6EE894', "#4A9C63"]);
    }

    render() {
        return (
            <svg
                className="chart"
                width={this.svgWidth}
                height={this.svgHeight}>
                <g
                    className="display"
                    transform={"translate(" + this.margin.left + "," + this.margin.top + ")"}>
                    {this.props.data.map((d, i) => (
                        <React.Fragment>
                            <rect
                                className="bar"
                                x={this.getXFunction()(0)}
                                y={this.getYFunction()(i)}
                                height={this.getYFunction()(1) - this.barSpacing}
                                width={this.getXFunction()(d.value)}
                                fill={this.getColorFunction()(i)}
                            />
                            <text
                                className="bar-label"
                                x={this.getXFunction()(d.value)}
                                dx={-4}
                                y={this.getYFunction()(i)}
                                dy={this.getYFunction()(1)/1.5 + 2}>
                                {`${d.key}: ${d.value}`}
                            </text>
                        </React.Fragment>
                    ))}
                </g>
            </svg>
        )
    }
}

export default Chart;
