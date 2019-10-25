import { SelectOption } from 'src/models/SelectOption.model';
import { makeStyles, createStyles } from '@material-ui/styles';
import { useCallback } from 'react';
import {
  ListItemText,
  ListItemIcon,
  Icon,
  Select,
  FormControl,
  MenuItem,
} from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      justifyContent: 'flex-end',
    },
    select: {
      display: 'flex',
      alignItems: 'center',
    },
  }),
);

export const orderOptions: SelectOption<string>[] = [
  {
    label: 'Date',
    iconClassName: 'fas fa-sort-numeric-down-alt',
    value: 'createdAt_DESC',
  },
  {
    label: 'Date',
    iconClassName: 'fas fa-sort-numeric-down',
    value: 'createdAt_ASC',
  },
  {
    label: 'Title',
    iconClassName: 'fas fa-sort-alpha-down-alt',
    value: 'title_DESC',
  },
  {
    label: 'Title',
    iconClassName: 'fas fa-sort-alpha-down',
    value: 'title_ASC',
  },
];

const BookmarkOrderSelect: React.FC<Props> = ({
  currentOrder,
  changeOrder,
}) => {
  const classes = useStyles();
  const getSelectLabel = useCallback(
    (option: SelectOption<string>) => (
      <>
        <ListItemText primary={option.label} />
        <ListItemIcon classes={{ root: classes.icon }}>
          <Icon className={option.iconClassName} fontSize="small" />
        </ListItemIcon>
      </>
    ),
    [classes],
  );

  const onOrderChange = useCallback(
    (e: React.ChangeEvent<any>) => {
      changeOrder(e.target.value);
    },
    [changeOrder],
  );

  return (
    <FormControl>
      <Select
        classes={{ select: classes.select }}
        value={currentOrder}
        onChange={onOrderChange}
        inputProps={{
          name: 'orderBy',
        }}
      >
        {orderOptions.map((order) => (
          <MenuItem key={order.value} value={order.value}>
            {getSelectLabel(order)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

type Props = {
  currentOrder?: string;
  changeOrder: (newOrder: string) => void;
};

export default BookmarkOrderSelect;
