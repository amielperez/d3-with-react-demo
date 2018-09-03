import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Chart from './Chart';
import data from '../common/data'

ReactDOM.render(<Chart data={data} />, document.getElementById('app'));
