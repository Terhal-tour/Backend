import Admin from "../models/Admin.js";
import bcrypt from 'bcryptjs';

export const getAdminsService = async () => {
  return await Admin.find();
};
export const addAdminService = async (data) => {
  const { name, email, password, isSuper } = data;

  const exists = await Admin.findOne({ email });
  if (exists) throw new Error("Email already exists");

  const admin = new Admin({ name, email, password, isSuper });
  return await admin.save();
};


export const updateAdminService = async (id, data) => {
  const admin = await Admin.findById(id);
  if (!admin) {
    throw new Error('Admin not found');
  }

  if ('isSuper' in data) {
    delete data.isSuper;
  }

  const isSameName = data.name === admin.name;
  const isSameEmail = data.email === admin.email;
  const isSamePassword = data.password
    ? await admin.comparePassword(data.password)
    : true;

  if (isSameName && isSameEmail && isSamePassword) {
    return false; 
  }

  console.log("changed name:", !isSameName);
  console.log("changed email:", !isSameEmail);
  console.log("changed password:", !isSamePassword);

  // 🔒 فقط الحقول المسموحة
  const allowedFields = ['name', 'email', 'password'];
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([key]) => allowedFields.includes(key))
  );

  // ✅ إذا كان الباسورد موجود، سيتم تشفيره في middleware تلقائياً
  const updatedAdmin = await Admin.findByIdAndUpdate(id, filteredData, {
    new: true,
    runValidators: true,
  });

  return updatedAdmin;
};


export const deleteAdminService = async (id) => {
  const admin = await Admin.findById(id);
  if (!admin) {
    throw new Error("Admin not found");
  }
  if (admin.isSuper) {
    throw new Error("Cannot delete a super admin");
  }
  return await Admin.findByIdAndDelete(id);
};
