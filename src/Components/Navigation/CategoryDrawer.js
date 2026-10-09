import React, { useState } from 'react';
import { Drawer, IconButton, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText } from '@mui/material';
import { IoClose, IoChevronDown, IoGridOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { categoriesData } from '../../data/categoriesData';
import { useFilter } from '../../context/FilterContext';

const CategoryDrawer = ({ open, onClose }) => {
  const [expanded, setExpanded] = useState(false);
  const { setSelectedCategory, setSelectedSubCategory } = useFilter();

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleCategoryClick = (catName, subCatName = '') => {
    setSelectedCategory(catName);
    setSelectedSubCategory(subCatName);
    onClose();
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <div className="w-80 max-w-full h-full flex flex-col bg-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <IoGridOutline className="text-xl text-primary" />
            <span className="font-bold text-lg">Danh mục sản phẩm</span>
          </div>
          <IconButton onClick={onClose} size="small" className="text-white">
            <IoClose className="text-white text-xl" />
          </IconButton>
        </div>

        {/* Categories List */}
        <div className="flex-1 overflow-y-auto p-2">
          {categoriesData.map((cat) => (
            <Accordion
              key={cat.id}
              expanded={expanded === cat.id}
              onChange={handleAccordionChange(cat.id)}
              disableGutters
              elevation={0}
              className="border-b border-slate-100 before:hidden"
            >
              <AccordionSummary
                expandIcon={<IoChevronDown className="text-slate-400 text-sm" />}
                className="hover:bg-slate-50 transition rounded-md"
              >
                <div className="flex items-center justify-between w-full pr-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{cat.icon}</span>
                    <span className="font-medium text-slate-800 text-sm">{cat.name}</span>
                  </div>
                  <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                    {cat.itemCount}
                  </span>
                </div>
              </AccordionSummary>

              <AccordionDetails className="pt-0 pb-2 pl-10 pr-2">
                <Link
                  to="/products"
                  onClick={() => handleCategoryClick(cat.name)}
                  className="block py-1.5 text-xs text-primary font-semibold hover:underline"
                >
                  👉 Xem tất cả {cat.name}
                </Link>

                {cat.subCategories?.map((sub) => (
                  <div key={sub.id} className="mt-2 mb-2">
                    <Link
                      to="/products"
                      onClick={() => handleCategoryClick(cat.name, sub.name)}
                      className="block text-xs font-bold text-slate-700 hover:text-primary mb-1"
                    >
                      {sub.name}
                    </Link>
                    <List dense className="py-0 pl-2">
                      {sub.items?.map((item) => (
                        <ListItem key={item.id} disablePadding className="py-0.5">
                          <Link
                            to="/products"
                            onClick={() => handleCategoryClick(cat.name, item.name)}
                            className="text-xs text-slate-500 hover:text-primary transition"
                          >
                            • {item.name}
                          </Link>
                        </ListItem>
                      ))}
                    </List>
                  </div>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-50 border-t text-xs text-slate-500 text-center">
          Hotline hỗ trợ: <strong className="text-slate-700">1800 6868</strong> (Miễn phí)
        </div>
      </div>
    </Drawer>
  );
};

export default CategoryDrawer;
