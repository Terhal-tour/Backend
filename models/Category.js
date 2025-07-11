import mongoose from "mongoose";
const CategorySchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        }
    }, {
    timestamps: true
}
);

const Category = mongoose.model("Category", CategorySchema);
export default Category;