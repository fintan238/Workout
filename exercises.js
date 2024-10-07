const bodyParts = ['Any Body Part', 'Core', 'Arms', 'Back', 'Chest', 'Legs', 'Shoulders', 'Other', 'Full Body', 'Cardio'];
const categories = ['Any Category', 'Barbell', 'Dumbbell', 'Machine', 'Other', 'Cardio', 'Duration', 'Weighted Bodyweight', 'Assisted Bodyweight'];

const exercises = [
    { name: 'Bench Press', bodyPart: 'Chest', category: 'Barbell' },
    { name: 'Bicep Curl', bodyPart: 'Arms', category: 'Dumbbell' },
    { name: 'Deadlift', bodyPart: 'Back', category: 'Barbell' },
    { name: 'Lat Pulldown', bodyPart: 'Back', category: 'Machine' },
    { name: 'Leg Press', bodyPart: 'Legs', category: 'Machine' },
    { name: 'Overhead Press', bodyPart: 'Shoulders', category: 'Barbell' },
    { name: 'Pull-Up', bodyPart: 'Back', category: 'Bodyweight' },
    { name: 'Push-Up', bodyPart: 'Chest', category: 'Bodyweight' },
    { name: 'Row', bodyPart: 'Back', category: 'Dumbbell' },
    { name: 'Running', bodyPart: 'Cardio', category: 'Cardio' },
    { name: 'Shoulder Press', bodyPart: 'Shoulders', category: 'Dumbbell' },
    { name: 'Sit-Up', bodyPart: 'Core', category: 'Bodyweight' },
    { name: 'Squat', bodyPart: 'Legs', category: 'Barbell' },
    { name: 'Tricep Dip', bodyPart: 'Arms', category: 'Bodyweight' },
    { name: 'Tricep Extension', bodyPart: 'Arms', category: 'Dumbbell' },
    { name: 'Walking', bodyPart: 'Cardio', category: 'Cardio' },
    { name: 'Leg Curl', bodyPart: 'Legs', category: 'Machine' },
    { name: 'Leg Extension', bodyPart: 'Legs', category: 'Machine' },
    { name: 'Chest Fly', bodyPart: 'Chest', category: 'Dumbbell' },
    { name: 'Calf Raise', bodyPart: 'Legs', category: 'Bodyweight' },
    { name: 'Crunch', bodyPart: 'Core', category: 'Bodyweight' },
    { name: 'Plank', bodyPart: 'Core', category: 'Bodyweight' },
    { name: 'Lateral Raise', bodyPart: 'Shoulders', category: 'Dumbbell' },
    { name: 'Front Raise', bodyPart: 'Shoulders', category: 'Dumbbell' },
    { name: 'Hammer Curl', bodyPart: 'Arms', category: 'Dumbbell' },
    { name: 'Incline Bench Press', bodyPart: 'Chest', category: 'Barbell' },
    { name: 'Decline Bench Press', bodyPart: 'Chest', category: 'Barbell' },
    { name: 'Cable Row', bodyPart: 'Back', category: 'Machine' },
    { name: 'Cable Crossover', bodyPart: 'Chest', category: 'Machine' },
    { name: 'Leg Raise', bodyPart: 'Core', category: 'Bodyweight' },
  ].sort((a, b) => a.name.localeCompare(b.name));

  export { bodyParts, categories, exercises };