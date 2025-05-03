type Room = {
  id: number;
  title: string;
  description: string;
  location: string;
  pricePerNight: number;
  maxGuests: number;
  bathrooms: number;
  createdAt: Date;
  updatedAt: Date;
};

type RoomWithPhotos = Room & {
  roomPhotos: {
    id: number;
    photoUrl: string;
  }[];
};

type User = {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: 'host' | 'guest' | 'admin';
  validationCode?: string;
  isValidated?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type { User, Room, RoomWithPhotos };
