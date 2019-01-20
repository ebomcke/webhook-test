const dotenv = require('dotenv');
dotenv.config();

jest.mock('./src/contexts/Firebase');
jest.mock('./src/contexts/Navigation');
jest.mock('./src/contexts/Account');
jest.mock('./src/components/base/JsonEditor');