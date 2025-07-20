import Admin from '../models/Admin.js';
import {
  addAdminService,
  updateAdminService,
  deleteAdminService,
  getAdminsService
} from '../services/adminService.js';

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await getAdminsService();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addAdmin = async (req, res) => {
  try {
    const adminId = req.user.id;
    const admin = await Admin.findById(adminId);

    if (!admin?.isSuper) {
      return res.status(401).json({ message: 'Only super admin can create admin' });
    }

    const newAdmin = await addAdminService(req.body);
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const adminId = req.user.id;
    const admin = await Admin.findById(adminId);

    if (!admin?.isSuper) {
      return res.status(401).json({ message: 'Only super admin can update admin' });
    }
    const updated = await updateAdminService(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Admin not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const adminId = req.user.id;
    const admin = await Admin.findById(adminId);

    if (!admin?.isSuper) {
      return res.status(401).json({ message: 'Only super admin can delete admin' });
    }
    const deleted = await deleteAdminService(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Admin not found' });
    res.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
