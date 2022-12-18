import { z } from 'zod';
import projectConfigSchema from './project-config-schema';

type ProjectConfig = z.TypeOf<typeof projectConfigSchema>;

export default ProjectConfig;
