import { model, models, Schema } from "mongoose"

const workoutSchema = new Schema(
  {
    date: { type: String, required: true },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["근력", "유산소", "스트레칭"],
    },
    detail: { type: String, required: true },
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
    sets: { type: Number, min: 1 },
    distance: { type: Number, min: 0.1 },
    note: { type: String, trim: true },
  },
  { timestamps: true },
)

const Workout = models.Workout || model("Workout", workoutSchema)

export default Workout
