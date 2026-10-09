import React, { useState } from 'react';
import { TextField, Tabs, Tab, Avatar, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { IoPersonOutline, IoLocationOutline, IoLockClosedOutline, IoCameraOutline, IoAdd, IoTrashOutline, IoCheckmarkCircle } from 'react-icons/io5';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const MyAccount = () => {
  const { currentUser, updateProfile, addAddress, removeAddress, setDefaultAddress } = useAuth();
  const [tabIndex, setTabIndex] = useState(0);

  // Profile Form state
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Address Modal state
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [newAddr, setNewAddr] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    city: 'TP. Hồ Chí Minh',
    district: '',
    ward: '',
    street: ''
  });

  if (!currentUser) {
    return (
      <div className="py-20 text-center container-fluid">
        <h2 className="text-xl font-bold mb-3">Vui lòng đăng nhập để xem thông tin tài khoản</h2>
        <Link to="/sign-in" className="text-primary font-bold text-xs underline">
          Đăng nhập ngay
        </Link>
      </div>
    );
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateProfile({ avatar: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(profileData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleCreateAddress = (e) => {
    e.preventDefault();
    if (newAddr.street && newAddr.city) {
      addAddress(newAddr);
      setIsAddressModalOpen(false);
      setNewAddr({
        name: currentUser.name,
        phone: currentUser.phone,
        city: 'TP. Hồ Chí Minh',
        district: '',
        ward: '',
        street: ''
      });
    }
  };

  return (
    <div className="account-page py-8">
      <div className="container-fluid">
        <h1 className="text-xl lg:text-2xl font-extrabold text-slate-800 mb-6">
          Hồ sơ tài khoản của tôi
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: User Card (4 cols) */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-4">
            <div className="relative w-28 h-28 mx-auto">
              <Avatar
                src={currentUser.avatar}
                alt={currentUser.name}
                sx={{ width: 112, height: 112 }}
                className="border-4 border-sky-100 shadow-md"
              />
              <label
                htmlFor="avatar-upload-input"
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary hover:bg-sky-500 text-white flex items-center justify-center cursor-pointer shadow transition"
                title="Thay đổi ảnh đại diện"
              >
                <IoCameraOutline className="text-base" />
              </label>
              <input
                id="avatar-upload-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-800 m-0">{currentUser.name}</h2>
              <span className="text-xs text-slate-400 block">{currentUser.email}</span>
              <span className="inline-block mt-2 text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                {currentUser.role === 'admin' ? 'Quản trị viên' : 'Khách hàng thành viên'}
              </span>
            </div>

            <div className="border-t border-slate-100 pt-3 text-xs text-left space-y-2 text-slate-600">
              <div className="flex justify-between">
                <span>Số điện thoại:</span>
                <strong>{currentUser.phone || 'Chưa cập nhật'}</strong>
              </div>
              <div className="flex justify-between">
                <span>Ngày tham gia:</span>
                <strong>{currentUser.createdAt || '2025'}</strong>
              </div>
            </div>
          </div>

          {/* Right: Tabs content (8 cols) */}
          <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <Tabs
              value={tabIndex}
              onChange={(e, val) => setTabIndex(val)}
              textColor="primary"
              indicatorColor="primary"
              className="border-b border-slate-200"
            >
              <Tab icon={<IoPersonOutline />} iconPosition="start" label={<span className="font-bold text-xs">Thông tin cá nhân</span>} />
              <Tab icon={<IoLocationOutline />} iconPosition="start" label={<span className="font-bold text-xs">Sổ địa chỉ ({currentUser.addresses?.length || 0})</span>} />
              <Tab icon={<IoLockClosedOutline />} iconPosition="start" label={<span className="font-bold text-xs">Đổi mật khẩu</span>} />
            </Tabs>

            {/* Tab 0: Profile form */}
            {tabIndex === 0 && (
              <form onSubmit={handleSaveProfile} className="space-y-4 pt-2">
                {saveSuccess && (
                  <div className="p-3 bg-emerald-50 text-emerald-700 text-xs rounded-xl font-semibold flex items-center gap-2">
                    <IoCheckmarkCircle className="text-base" />
                    <span>Cập nhật thông tin thành công!</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TextField
                    fullWidth
                    size="small"
                    label="Họ và tên"
                    required
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    label="Số điện thoại"
                    required
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  />
                </div>

                <TextField
                  fullWidth
                  size="small"
                  label="Địa chỉ Email"
                  disabled
                  value={profileData.email}
                  helperText="Địa chỉ email dùng để đăng nhập và nhận thông báo đơn hàng."
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="font-bold text-xs py-2.5 px-6 rounded-xl"
                >
                  Lưu thay đổi
                </Button>
              </form>
            )}

            {/* Tab 1: Address Book */}
            {tabIndex === 1 && (
              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider m-0">
                    Danh sách địa chỉ giao hàng
                  </h3>
                  <Button
                    onClick={() => setIsAddressModalOpen(true)}
                    variant="outlined"
                    size="small"
                    startIcon={<IoAdd />}
                    className="font-bold text-xs rounded-lg"
                  >
                    Thêm địa chỉ mới
                  </Button>
                </div>

                {currentUser.addresses?.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-400 bg-slate-50 rounded-xl">
                    Bạn chưa có địa chỉ nhận hàng nào được lưu.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {currentUser.addresses?.map((addr) => (
                      <div
                        key={addr.id}
                        className={`p-4 rounded-xl border transition flex items-start justify-between gap-4 ${
                          addr.isDefault ? 'border-primary bg-sky-50/40' : 'border-slate-200 bg-white'
                        }`}
                      >
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center gap-2">
                            <strong className="text-slate-800 font-bold">{addr.name}</strong>
                            <span className="text-slate-400">({addr.phone})</span>
                            {addr.isDefault && (
                              <span className="text-[10px] font-bold bg-primary text-white px-2 py-0.5 rounded-full">
                                Mặc định
                              </span>
                            )}
                          </div>
                          <p className="text-slate-600 m-0">
                            {addr.street}, {addr.ward ? `${addr.ward}, ` : ''}{addr.district ? `${addr.district}, ` : ''}{addr.city}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          {!addr.isDefault && (
                            <button
                              onClick={() => setDefaultAddress(addr.id)}
                              className="text-xs text-primary font-bold hover:underline"
                            >
                              Đặt làm mặc định
                            </button>
                          )}
                          <button
                            onClick={() => removeAddress(addr.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 transition"
                            title="Xóa địa chỉ"
                          >
                            <IoTrashOutline className="text-base" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Change Password */}
            {tabIndex === 2 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Đổi mật khẩu thành công!');
                }}
                className="space-y-4 pt-2 max-w-md"
              >
                <TextField
                  fullWidth
                  size="small"
                  label="Mật khẩu hiện tại"
                  type="password"
                  required
                />
                <TextField
                  fullWidth
                  size="small"
                  label="Mật khẩu mới (tối thiểu 6 ký tự)"
                  type="password"
                  required
                />
                <TextField
                  fullWidth
                  size="small"
                  label="Xác nhận mật khẩu mới"
                  type="password"
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="font-bold text-xs py-2.5 px-6 rounded-xl"
                >
                  Cập nhật mật khẩu
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Modal Thêm địa chỉ mới */}
        <Dialog open={isAddressModalOpen} onClose={() => setIsAddressModalOpen(false)} maxWidth="sm" fullWidth>
          <form onSubmit={handleCreateAddress}>
            <DialogTitle className="font-bold text-base text-slate-800 border-b pb-3">
              Thêm địa chỉ nhận hàng mới
            </DialogTitle>
            <DialogContent className="pt-4 space-y-3">
              <div className="grid grid-cols-2 gap-3 pt-2">
                <TextField
                  fullWidth
                  size="small"
                  label="Họ và tên người nhận"
                  required
                  value={newAddr.name}
                  onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                />
                <TextField
                  fullWidth
                  size="small"
                  label="Số điện thoại"
                  required
                  value={newAddr.phone}
                  onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <TextField
                  fullWidth
                  size="small"
                  label="Tỉnh / Thành phố"
                  required
                  value={newAddr.city}
                  onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                />
                <TextField
                  fullWidth
                  size="small"
                  label="Quận / Huyện"
                  required
                  value={newAddr.district}
                  onChange={(e) => setNewAddr({ ...newAddr, district: e.target.value })}
                />
                <TextField
                  fullWidth
                  size="small"
                  label="Phường / Xã"
                  required
                  value={newAddr.ward}
                  onChange={(e) => setNewAddr({ ...newAddr, ward: e.target.value })}
                />
              </div>

              <TextField
                fullWidth
                size="small"
                label="Địa chỉ cụ thể (Số nhà, đường...)"
                required
                value={newAddr.street}
                onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
              />
            </DialogContent>
            <DialogActions className="p-4 border-t">
              <Button onClick={() => setIsAddressModalOpen(false)}>Hủy bỏ</Button>
              <Button type="submit" variant="contained" color="primary">
                Lưu địa chỉ
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </div>
  );
};

export default MyAccount;
