export interface IUser {
    name: { type: String, required: [true, 'Why no Name?'] },
    surname: { type: String, required: [true, 'Why no Surname?'] },
    nick?: {type:String},//avatar:String!
    email: {type:String, required: [true, 'Why no E-mail?']}, 
    password: {type:String, required: [true, 'Why no Pass?']},
    role: {type:String, required: [true, 'Why no Role?'], enum: ['admin', 'user'] },
    image?: {type:String},
    cel:{ type: Number, min: [4, 'Must be at least 4, got {VALUE}'],
      max: [100000, 'Must be at greater cien mil, got {VALUE}'] },
  }

  