export const USERS_SEGMENT = 'users';
export const USERS_PATH = `/${USERS_SEGMENT}`;

export const USER_CREATE_SEGMENT = 'new';
export const USER_CREATE_PATH = `${USERS_PATH}/${USER_CREATE_SEGMENT}`;

export const userPath = (id: number): (string | number)[] => [USERS_PATH, id];
