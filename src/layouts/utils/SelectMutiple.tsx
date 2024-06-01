import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import TheLoaiModel from '../../models/TheLoaiModel';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface SelectMultipleProps{
    
    genreList: TheLoaiModel[]
    selectedList: any[]
    setSelectedList: any
    selectedListName: any[]
    setSelectedListName: any
}
 const SelectMultiple: React.FC<SelectMultipleProps> =(props)=> {
  
  const handleChange = (event: SelectChangeEvent<typeof props.selectedListName>) => {
    const value = event.target.value
    const dataSelected = props.genreList.filter((i) =>value.includes(i.tenTheLoai))
    const dataSelectedId = dataSelected.map((i)=> i.maTheLoai)
    props.setSelectedList(dataSelectedId)
    props.setSelectedListName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ mb: 3, width: "100%" }} size='small'>
        <InputLabel id="demo-multiple-checkbox-label">Thể loại </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
        
          value={Array.from(new Set(props.selectedListName))}
          onChange={handleChange}
          input={<OutlinedInput label="Thể loại" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          required
        >
          {props.genreList.map((genre) => (
            <MenuItem key={genre.maTheLoai} value={genre.tenTheLoai}>
              <Checkbox checked={props.selectedListName.indexOf(genre.tenTheLoai) > -1} />
              <ListItemText primary={genre.tenTheLoai} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectMultiple