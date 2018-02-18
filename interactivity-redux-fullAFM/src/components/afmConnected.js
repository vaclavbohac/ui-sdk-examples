// Copyright (C) 2007-2017, GoodData(R) Corporation. All rights reserved.
import React, { Component } from 'react'
import { ColumnChart as GdColumnChart } from '@gooddata/react-components';
import afmConnect from '../afmConnect'

function createMeasure(measureIdentifier) {
    return {
        measure: {
            localIdentifier: measureIdentifier, // reusing the measure identifier as an AFM specific identifier
            definition: {
                measureDefinition: {
                    item: {
                        identifier: measureIdentifier // here we are referring to the actual measure from a GoodData workspace
                    }
                }
            }
        }
    };
}

function createAttribute(attributeIdentifier) {
    return {
        visualizationAttribute: {
            localIdentifier: attributeIdentifier,
            displayForm: {
                identifier: attributeIdentifier
            }
        }
    };
}

export const AfmComponentWrapper = (InnerComponent) => afmConnect(class extends Component {
  static defaultProps = {
      measures: [],
      attributes: []
  };

  render() {
    const data = {
        measures: this.props.measures.map(createMeasure),
        attributes: this.props.attributes.map(createAttribute)
    };

    return (
        <InnerComponent
            {...this.props}

            {...data}
        />
    )
  }
})

export const ColumnChart = AfmComponentWrapper(GdColumnChart)
