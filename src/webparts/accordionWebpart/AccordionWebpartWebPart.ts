import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneLabel
} from '@microsoft/sp-webpart-base';
import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
import * as strings from 'AccordionWebpartWebPartStrings';
import AccordionWebpart from './components/AccordionWebpart';
import { IAccordionWebpartProps } from './components/IAccordionWebpartProps';

export interface IAccordionWebpartWebPartProps {
  description: string;
  accordionDataCollection : any[];
  title: string;
}

export default class AccordionWebpartWebPart extends BaseClientSideWebPart<IAccordionWebpartWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAccordionWebpartProps > = React.createElement(
      AccordionWebpart,
      {
        description: this.properties.description,
        accordionDataCollection : this.properties.accordionDataCollection,
        title: this.properties.title,
        displayMode: this.displayMode,
        fUpdateProperty: (value: string) => {
          this.properties.title = value;
        },
        fPropertyPaneOpen: this.context.propertyPane.open
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneLabel('description', {
                  text: strings.DescriptionFieldLabel
                })
              ]
            },
            {
              groupName : strings.SecondaryGroupName,
              groupFields:[
                PropertyFieldCollectionData('accordionDataCollection', {
                  key: 'accordionDataCollection',
                  label : "Accordion Data Collection",
                  panelHeader : "Accordion Data Collection Panel Header",
                  manageBtnLabel : "Manage Accordion Data Collection",
                  panelDescription : strings.panelDescription,
                  value : this.properties.accordionDataCollection,
                  fields : [
                    {
                      id: "accordionHeader",
                      title : "Accordion Header",
                      type : CustomCollectionFieldType.string,
                      required : true
                    },
                    {
                      id: "accordionBody",
                      title : "Accordion Body",
                      type : CustomCollectionFieldType.string,
                      required : true
                    }
                  ],
                  disabled : false
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
