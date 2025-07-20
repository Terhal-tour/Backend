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
}

export const addAdmin = async (req, res) => {
  try {
    const newAdmin = await addAdminService(req.body);
    console.log(newAdmin);

    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const updated = await updateAdminService(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Admin not found' });
    res.status(201).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const deleted = await deleteAdminService(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Admin not found' });
    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
