import React from 'react';
import ReactDOM from 'react-dom';

import App from './AppDemoAnimatedGif';
// import App from './AppMinimumUsage';
// import App from './AppAllProps';
// import App from './AppWithUmountCamera';
// import App from './AppWithImagePreview';
// import App from './AppWithDynamicProperties';
// import App from './AppAllPropsWithDynamicProperties';
// import App from './AppSaveToLocalFile';

const container = document.getElementById('root');

// Create a root.
const root = ReactDOM.createRoot(container);

// Initial render
root.render(<App />);

// During an update, there is no need to pass the container again
root.render(<App />);
