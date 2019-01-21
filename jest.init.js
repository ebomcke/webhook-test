const dotenv = require('dotenv');
dotenv.config();

jest.mock('./src/contexts/Firebase');
jest.mock('./src/contexts/Navigation');
jest.mock('./src/contexts/Account');
jest.mock('./src/contexts/Endpoints');
jest.mock('./src/contexts/Webhooks');
jest.mock('./src/components/base/JsonEditor');