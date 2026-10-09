import React from 'react';
import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemButton, ListItemText, IconButton, TextField, InputAdornment } from '@mui/material';
import { IoClose, IoLocationOutline, IoSearch } from 'react-icons/io5';
import { locationsData } from '../../data/mockData';

const LocationModal = ({ open, onClose, selectedLocation, onSelectLocation }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredLocations = locationsData.filter(loc =>
    loc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle className="flex justify-between items-center border-b pb-3">
        <div className="flex items-center gap-2">
          <IoLocationOutline className="text-xl text-primary" />
          <span className="font-bold text-lg text-slate-800">Chọn địa chỉ của bạn</span>
        </div>
        <IconButton onClick={onClose} size="small">
          <IoClose />
        </IconButton>
      </DialogTitle>
      <DialogContent className="pt-4">
        <p className="text-xs text-slate-500 mb-3">
          Nhập khu vực hoặc quốc gia của bạn để xem thời gian giao hàng và ưu đãi chính xác.
        </p>
        <TextField
          fullWidth
          size="small"
          placeholder="Tìm tỉnh thành hoặc quốc gia..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-3"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IoSearch className="text-slate-400" />
              </InputAdornment>
            ),
          }}
        />
        <List className="max-h-60 overflow-y-auto">
          {filteredLocations.map((loc, idx) => {
            const isSelected = loc === selectedLocation;
            return (
              <ListItem key={idx} disablePadding>
                <ListItemButton
                  selected={isSelected}
                  onClick={() => {
                    onSelectLocation(loc);
                    onClose();
                  }}
                  className={`rounded-lg my-1 ${isSelected ? 'bg-sky-50 font-bold text-primary' : ''}`}
                >
                  <IoLocationOutline className={`mr-2 ${isSelected ? 'text-primary' : 'text-slate-400'}`} />
                  <ListItemText primary={loc} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default LocationModal;
