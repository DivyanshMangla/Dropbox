import { Schema, model, Document } from 'mongoose';

// Defining the interface for the mongoose model
export interface IFile extends Document {
  originalName: string;
  fileName: string;
  size: number;
  mimetype: string;
  uploadDate: Date;
}

// FileSchema in which data will be stored in mongoDB
const fileSchema = new Schema<IFile>({
  originalName: { type: String, required: true },
  fileName: { type: String, required: true },
  size: { type: Number, required: true },
  mimetype: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
});

// exporting an object of the defined schema
export default model<IFile>('File', fileSchema);