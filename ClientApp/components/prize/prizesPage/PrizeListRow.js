import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import { TableCell, TableRow } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import Checkbox from 'material-ui/Checkbox';
// import { red } from 'material-ui/colors';

import Styles from '../../../components/common/style/Styles';

class PrizesPage extends Component {
  render() {
    const {
      prize,
      onEdit,
      onDelete,
      classes,
      isSelected,
      onRowSelect,
    } = this.props;
    return (
      <TableRow key={prize.id}>
        <TableCell padding="checkbox">
          <Checkbox
            checked={isSelected}
            onChange={() => onRowSelect(prize.id)}
          />
        </TableCell>
        <TableCell>{prize.id}</TableCell>
        <TableCell>{prize.name}</TableCell>
        <TableCell>{prize.description}</TableCell>
        <TableCell numeric>{prize.chances}</TableCell>
        <TableCell numeric>{prize.quantity}</TableCell>
        <TableCell>
          <IconButton
            className={classes.button}
            onClick={() => onEdit(prize)}
            color="primary"
          >
            <EditIcon />
          </IconButton>{' '}
          <IconButton onClick={() => onDelete(prize)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
}

PrizesPage.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  prize: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onRowSelect: PropTypes.func.isRequired,
};

export default withStyles(Styles)(PrizesPage);
