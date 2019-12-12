import React from 'react';
import { Link } from 'react-router-dom';

const renderLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

export default renderLink