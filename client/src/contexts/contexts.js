import { createContext } from 'react';

export const UserContext = createContext(null);

export const UserLoggedIn = createContext(false);

export const ProfileToggle = createContext(false);

export const SettingToggle = createContext(false);

export const CreateRoomToggle = createContext(false);

export const RoomToggle = createContext(false);

export const Messages = createContext(null);