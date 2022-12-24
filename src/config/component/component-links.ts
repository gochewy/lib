import { z } from 'zod';
import componentLinksSchema from './component-links-schema';

type ComponentLinks = z.TypeOf<typeof componentLinksSchema>;

export default ComponentLinks;
