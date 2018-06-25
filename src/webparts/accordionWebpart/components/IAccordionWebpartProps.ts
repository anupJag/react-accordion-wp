import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DisplayMode } from '@microsoft/sp-core-library';

export interface IAccordionWebpartProps {
  description: string;
  accordionDataCollection : any[];
  displayMode: DisplayMode;
  fUpdateProperty: (value: string) => void;
  fPropertyPaneOpen: () => void;
  title: string;
}
