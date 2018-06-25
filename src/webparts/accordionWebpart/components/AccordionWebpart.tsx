import * as React from 'react';
import styles from './AccordionWebpart.module.scss';
import { IAccordionWebpartProps } from './IAccordionWebpartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IAccordionInfo } from './IAccordionData';
import Accordion from './AccordionModal/Accordion';
import * as strings from 'AccordionWebpartWebPartStrings';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';

export default class AccordionWebpart extends React.Component<IAccordionWebpartProps, {}> {
  
  public render(): React.ReactElement<IAccordionWebpartProps> {
    return (
      <div className={ styles.accordionWebpart }>
        <WebPartTitle displayMode={this.props.displayMode}
                        title={this.props.title}
                        updateProperty={this.props.fUpdateProperty} />
          <div className={ styles.container }>
            {
              (this.props.accordionDataCollection && this.props.accordionDataCollection.length > 0) ?
              this.props.accordionDataCollection.map((accordion : IAccordionInfo, index: number) => {
                return(
                    <Accordion 
                      Header={accordion.accordionHeader} 
                      Body={accordion.accordionBody}
                      />
                );
              })
              :
              (
                <Placeholder
                  iconName='Edit'
                  iconText={strings.noTilesIconText}
                  description={strings.noTilesConfigured}
                  buttonLabel={strings.noTilesBtn}
                  onConfigure={this.props.fPropertyPaneOpen} />
              ) 
            }
          </div>
      </div>
    );
  }
}
