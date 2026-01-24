
import mongoose from 'mongoose';

const StartupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this startup.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for this startup.'],
  },
  market: {
    type: String,
    required: [true, 'Please provide the market sector.'],
  },
  team: {
    type: String,
    required: [true, 'Please provide details about the team.'],
  },
  revenue: {
    type: String,
    required: [true, 'Please provide revenue details.'],
  },
  funding: {
    type: String,
    required: [true, 'Please provide funding details.'],
  },
  embedding: {
    type: [Number],
    required: false,
    index: true, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Startup || mongoose.model('Startup', StartupSchema);
