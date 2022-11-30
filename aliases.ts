import { resolve } from 'path';

const r = (p: string) => resolve(__dirname, p);

const alias: Record<string, string> = {
    '~': r('.'),
    '~/': r('./'),
    '~~': r('.'),
    '~~/': r('./'),
    '@@': r('.'),
    '@@/': r('./'),
};

export default alias;