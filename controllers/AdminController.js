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
      return res.status(400).json({ message: 'Only super admin can create admin' });
    }

    const newAdmin = await addAdminService(req.body);
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const adminId = req.user.id;
    const admin = await Admin.findById(adminId);

    if (!admin?.isSuper) {
      return res.status(400).json({ message: 'Only super admin can update admin' });
    }
    const updated = await updateAdminService(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Admin not found' });
    res.status(201).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const adminId = req.user.id;
    const admin = await Admin.findById(adminId);

    if (!admin?.isSuper) {
      return res.status(400).json({ message: 'Only super admin can delete admin' });
    }
    const deleted = await deleteAdminService(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Admin not found' });
    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};


export const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select('-password'); // Don’t send hashed password!
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json({ admin });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



export const updateAdmin = async (req, res) => {
  try {
    const updated = await updateAdminService(req.params.id, req.body);

    if (!updated) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Don’t leak the hashed password — only send safe fields
    res.json({
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      isSuper: updated.isSuper,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt
    });

  } catch (error) {
    console.error("Error updating admin:", error);
    res.status(500).json({ message: error.message });
  }
};
