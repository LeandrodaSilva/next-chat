import React from 'react';
import {createComponent} from '@lit-labs/react';
import {LeprojComponents} from 'leproj-components';
import 'leproj-components/leproj-components.js';

export const LeprojComponentsWrapper = createComponent({
  tagName: 'leproj-components',
  elementClass: LeprojComponents,
  react: React,
});

export default LeprojComponentsWrapper;