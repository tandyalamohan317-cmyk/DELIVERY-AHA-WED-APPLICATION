import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  MapPin,
  Plus,
  Trash2,
  Edit2,
  Home,
  Briefcase,
  CheckCircle2,
  ArrowLeft,
  X
} from 'lucide-react';
import { useLocation } from '../context/LocationContext';
import { useToast } from '../context/ToastContext';
import {
  getStoredAddresses,
  addStoredAddress,
  updateStoredAddress,
  deleteStoredAddress
} from '../data/storage';

const AddressesPage = () => {
  const navigate = useNavigate();
  const { selectedCity, selectedArea } = useLocation();
  const { showToast } = useToast();

  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);

  const [formData, setFormData] = useState({
    title: 'Home',
    fullName: 'Arjun Verma',
    phone: '+91 98765 43210',
    flatNo: '',
    street: '',
    area: selectedArea || 'Banjara Hills',
    city: selectedCity?.name || 'Hyderabad',
    pincode: '500034',
    isDefault: false
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    setAddresses(getStoredAddresses());
  }, []);

  const openAddModal = () => {
    setEditingAddressId(null);
    setFormData({
      title: 'Home',
      fullName: 'Arjun Verma',
      phone: '+91 98765 43210',
      flatNo: '',
      street: '',
      area: selectedArea || 'Banjara Hills',
      city: selectedCity?.name || 'Hyderabad',
      pincode: '500034',
      isDefault: addresses.length === 0
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (addr) => {
    setEditingAddressId(addr.id);
    setFormData({ ...addr });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.flatNo.trim()) errs.flatNo = 'Flat/Door number is required';
    if (!formData.street.trim()) errs.street = 'Street or landmark is required';
    if (!formData.area.trim()) errs.area = 'Area is required';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingAddressId) {
      updateStoredAddress(editingAddressId, formData);
      showToast('Address updated successfully!', 'success');
    } else {
      addStoredAddress(formData);
      showToast('New delivery address added!', 'success');
    }

    setAddresses(getStoredAddresses());
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    deleteStoredAddress(id);
    setAddresses(getStoredAddresses());
    showToast('Address removed', 'info');
  };

  const handleSetDefault = (id) => {
    updateStoredAddress(id, { isDefault: true });
    setAddresses(getStoredAddresses());
    showToast('Default delivery address updated!', 'success');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link to="/profile" className="text-xs text-white/50 hover:text-white flex items-center gap-1 mb-2 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Profile
          </Link>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-royal">
            Saved Delivery Addresses
          </h1>
          <p className="text-xs sm:text-sm text-white/60">
            Manage your residences, corporate offices, and family delivery points.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="self-start sm:self-auto px-5 py-2.5 rounded-2xl btn-royal-gold text-xs font-bold shadow-lg shadow-amber-500/20 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Address</span>
        </button>
      </div>

      {/* Address Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`p-5 rounded-3xl glass-panel border transition-all duration-300 space-y-4 relative flex flex-col justify-between ${
              addr.isDefault ? 'border-amber-400/60 shadow-gold-glow bg-amber-400/[0.05]' : 'border-white/10 hover:border-white/30'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
                    {addr.title === 'Home' ? <Home className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
                  </div>
                  <h3 className="font-bold text-sm text-white">{addr.title}</h3>
                </div>

                {addr.isDefault ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Default
                  </span>
                ) : (
                  <button
                    onClick={() => handleSetDefault(addr.id)}
                    className="text-[11px] text-white/40 hover:text-amber-300 transition-colors"
                  >
                    Set as default
                  </button>
                )}
              </div>

              <div className="space-y-1 text-xs text-white/70 pt-3">
                <p className="font-semibold text-white">{addr.fullName} • {addr.phone}</p>
                <p>{addr.flatNo}, {addr.street}</p>
                <p className="text-amber-300/90 font-medium">{addr.area}, {addr.city} - {addr.pincode}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
              <button
                onClick={() => openEditModal(addr)}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center gap-1 transition-all"
              >
                <Edit2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => handleDelete(addr.id)}
                className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold flex items-center gap-1 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Add or Edit Address */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-md w-full glass-panel-gold p-6 sm:p-8 rounded-3xl border border-amber-400/40 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-bold text-base text-white font-royal">
                {editingAddressId ? 'Edit Delivery Address' : 'Add New Address'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-white/70 block mb-1">Tag As</label>
                  <select
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#13082a] text-white text-xs border border-white/15"
                  >
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-white/70 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                  />
                  {formErrors.fullName && <p className="text-[10px] text-rose-400">{formErrors.fullName}</p>}
                </div>

                <div className="col-span-2">
                  <label className="text-[11px] text-white/70 block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                  />
                  {formErrors.phone && <p className="text-[10px] text-rose-400">{formErrors.phone}</p>}
                </div>

                <div className="col-span-2">
                  <label className="text-[11px] text-white/70 block mb-1">Flat / House / Suite *</label>
                  <input
                    type="text"
                    value={formData.flatNo}
                    placeholder="e.g. Flat 402, Royal Palms"
                    onChange={(e) => setFormData({ ...formData, flatNo: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                  />
                  {formErrors.flatNo && <p className="text-[10px] text-rose-400">{formErrors.flatNo}</p>}
                </div>

                <div className="col-span-2">
                  <label className="text-[11px] text-white/70 block mb-1">Street / Landmark *</label>
                  <input
                    type="text"
                    value={formData.street}
                    placeholder="e.g. Road No 12, Banjara Hills"
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                  />
                  {formErrors.street && <p className="text-[10px] text-rose-400">{formErrors.street}</p>}
                </div>

                <div>
                  <label className="text-[11px] text-white/70 block mb-1">Area *</label>
                  <input
                    type="text"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-white/70 block mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    readOnly
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs opacity-75 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl btn-royal-gold text-xs font-bold shadow"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressesPage;
