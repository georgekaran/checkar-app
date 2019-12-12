import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom'
import Icon from '@material-ui/core/Icon';

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        // With react-router-dom@^6.0.0 use `ref` instead of `innerRef`
        // See https://github.com/ReactTraining/react-router/issues/6056
        <Link to={to} {...linkProps} innerRef={ref} />
      )),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        <ListItemIcon><Icon>{icon}</Icon></ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

export default ListItemLink