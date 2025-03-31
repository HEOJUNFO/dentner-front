import React from 'react';
import {SectionsContainer, Section} from 'react-fullpage';
// style import
// import './SamplePage.module.scss';

const SamplePage = () => {
  const options = {
    sectionClassName: 'section',
    anchors: ['', '', ''],
    scrollBar: false,
    navigation: true,
    verticalAlign: false,
    sectionPaddingTop: '50px',
    sectionPaddingBottom: '50px',
    arrowNavigation: true
  };
  return (
    <section>

      <SectionsContainer {...options}>
        <Section>Page 1</Section>
        <Section>Page 2</Section>
        <Section>Page 3</Section>
      </SectionsContainer>
    </section>
  );
};

export default SamplePage;