import 'core-js/proposals/reflect-metadata';
import 'zone.js/dist/zone';
require('../manifest.webapp');

import * as process from 'process';
(window as any).process = process;
import { Buffer } from 'buffer';
(window as any).Buffer = Buffer;
