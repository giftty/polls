// import "survey-core/defaultV2.min.css";
// import "survey-creator-core/survey-creator-core.min.css";
// import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";

import React from 'react';
import ReactDOM from 'react-dom';
import { ReactFormBuilder } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';
// const creatorOptions = {
//   showLogicTab: true,
//   isAutoSave: true
// };

export function SurveyCreatorWidget() {
//   const creator = new SurveyCreator(creatorOptions);
  return (
    // <SurveyCreatorComponent creator={creator} />
     <ReactFormBuilder />
  )
}

