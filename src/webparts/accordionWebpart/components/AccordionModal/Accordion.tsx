import * as React from 'react';
import styles from './Accordion.module.scss';

const accordion = (props) => { 
    
    const clicked = (event) => {
        let currentElement = event.target;
        currentElement.classList.toggle(`${styles.active}`);
        var panelControl = currentElement.nextElementSibling;
        if(panelControl.style.maxHeight){
            panelControl.style.maxHeight = null;
        }
        else{
            panelControl.style.maxHeight = panelControl.scrollHeight + "px";
        }
    };

    return(
        <div className={styles.outerDiv}>
            <button className={styles.accordion} onClick={clicked.bind(this)}>{props.Header}</button>
            <div className={styles.panel}>
                <p>{props.Body}</p>
            </div>
        </div>
    );
};

export default accordion;