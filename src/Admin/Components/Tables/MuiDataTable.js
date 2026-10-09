import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper
} from '@mui/material';

const MuiDataTable = ({ columns, data, maxHeight = 480, onRowClick }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper elevation={0} className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <TableContainer sx={{ maxHeight }}>
        <Table stickyHeader aria-label="sticky table" size="medium">
          {/* Sticky Header */}
          <TableHead>
            <TableRow>
              {columns.map((col, idx) => (
                <TableCell
                  key={idx}
                  sx={{
                    bgcolor: '#f8fafc',
                    color: '#475569',
                    fontWeight: 700,
                    fontSize: '11.5px',
                    textTransform: 'uppercase',
                    borderBottom: '1px solid #e2e8f0',
                  }}
                >
                  {col.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 5, color: '#94a3b8' }}>
                  Không có dữ liệu trong bảng.
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, rowIdx) => (
                <TableRow
                  hover
                  key={rowIdx}
                  onClick={() => onRowClick && onRowClick(row)}
                  sx={{
                    cursor: onRowClick ? 'pointer' : 'default',
                    '&:last-child td': { border: 0 },
                    transition: 'background-color 0.15s ease'
                  }}
                >
                  {columns.map((col, colIdx) => (
                    <TableCell
                      key={colIdx}
                      sx={{ fontSize: '12px', color: '#334155', py: 1.8 }}
                    >
                      {col.render ? col.render(row) : row[col.accessor]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination & Rows per page */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Số dòng mỗi trang:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} trên ${count}`}
        sx={{
          borderTop: '1px solid #f1f5f9',
          bgcolor: '#fafafa',
          '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
            fontSize: '11.5px',
            color: '#64748b',
          },
        }}
      />
    </Paper>
  );
};

export default MuiDataTable;
