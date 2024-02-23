export enum ROUTE_CONSTANTS {
  LOGIN_PAGE = '/login',
  REGISTRATION_PAGE = '/registration',
  MAIN_PAGE = '/main',
  ROOT = '/',
}

export enum API_CONSTANTS {
  LOGIN = 'backend/login.php',
  REGISTER = 'backend/register.php',
  FILM_FORM_FIRST_STEP = 'backend/filmform.php',
  FILM_FORM_SECOND_STEP = 'backend/filmform2.php',
  GET_TIME_BY_PARAMS = 'backend/filmformset.php',
  CALCULATE_TEMPERATURE = 'backend/todigitaltruth.php',
}

export enum STORAGE_CONSTANTS {
  AUTH_TOKEN = 'authToken',
  THEME = 'theme',
}

export enum OTHER_CONSTANTS {
  START_TIME = '00:00:00',
}

export const SELECT_PROCESS_OPTIONS = [
  'film developer',
  'developer',
  'fix bath',
  'stop bath',
  'washing',
  'drying',
  'stabilised',
  'exposure',
  'other process',
];
